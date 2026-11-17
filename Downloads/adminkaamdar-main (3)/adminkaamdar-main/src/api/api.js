export const API_BASE_URL = "http://192.168.1.26:4000/api/v1";

export const REFRESH_TOKEN_URL =
  `${API_BASE_URL}/auth/token/refresh`;

export const API_ROUTES = {
  requestOtp: `${API_BASE_URL}/auth/otp/request`,
  verifyOtp: `${API_BASE_URL}/auth/continue`,
  refreshToken: REFRESH_TOKEN_URL,
};

// Prevent multiple refresh requests at the same time.
let refreshPromise = null;

// Read access token.
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// Clear local session after refresh failure.
const clearSession = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userPhone");
  localStorage.removeItem("customer");
  localStorage.removeItem("profileImage");

  window.dispatchEvent(new Event("kaamdaar-auth-change"));
  window.dispatchEvent(new Event("kaamdaar-profile-image-change"));

  // Redirect to login if the user is not already there.
  if (
    window.location.pathname !== "/login" &&
    window.location.pathname !== "/otp"
  ) {
    window.location.assign("/login");
  }
};

// Refresh access token using HttpOnly refresh-token cookie.
export async function refreshAccessToken() {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const response = await fetch(REFRESH_TOKEN_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform: "WEB",
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success !== true) {
        throw new Error(
          data.message || "Unable to refresh access token."
        );
      }

      const newAccessToken = data.data?.accessToken;

      if (!newAccessToken) {
        throw new Error("New access token was not received.");
      }

      localStorage.setItem("accessToken", newAccessToken);

      return newAccessToken;
    } catch (error) {
      console.error("Access token refresh failed:", error);

      clearSession();

      throw error;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// Centralized API request function.
export async function apiRequest(url, options = {}, retry = true) {
  const {
    auth = true,
    headers: customHeaders = {},
    ...fetchOptions
  } = options;

  const headers = {
    ...customHeaders,
  };

  // Automatically stringify JSON request bodies.
  if (
    fetchOptions.body &&
    typeof fetchOptions.body !== "string" &&
    !(typeof FormData !== "undefined" &&
      fetchOptions.body instanceof FormData)
  ) {
    headers["Content-Type"] = "application/json";
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }

  // Attach access token.
  if (auth) {
    const token = getAccessToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
    credentials: "include",
  });

  // If access token has expired, refresh and retry once.
  if (response.status === 401 && auth && retry) {
    try {
      const newToken = await refreshAccessToken();

      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${newToken}`,
      };

      return await apiRequest(
        url,
        {
          ...options,
          headers: retryHeaders,
        },
        false
      );
    } catch (error) {
      throw new Error(
        "Your session has expired. Please login again."
      );
    }
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(
      data.message ||
      data.error?.message ||
      `API request failed (${response.status})`
    );
  }

  return data;
}

// POST helper for authentication APIs.
export async function postAuthJson(url, body = {}, idToken = null) {
  return apiRequest(
    url,
    {
      method: "POST",
      body,
      auth: Boolean(idToken),
      headers: idToken
        ? { Authorization: `Bearer ${idToken}` }
        : {},
    },
    true
  );
}