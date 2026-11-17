import { auth } from "../api/firebase.js";

import {
  API_ROUTES,
  postAuthJson,
} from "./api.jsx";

import {
  apiRequest,
  refreshAccessToken,
  getAccessToken,
} from "../api/api.jsx";

// Backwards-compatible exports
export {
  refreshAccessToken,
  getAccessToken,
};

// Firebase authentication continuation
export async function continueAuthentication() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error(
      "Firebase user is not authenticated. Please verify your OTP first."
    );
  }

  // Get Firebase ID token
  const idToken = await user.getIdToken();

  // Send Firebase ID token as Authorization header
  const result = await postAuthJson(
    API_ROUTES.verifyOtp,
    {},
    idToken
  );

  return result;
}

// Centralized authenticated API fetch
export const authenticatedFetch = async (url, options = {}) => {
  const result = await apiRequest(url, options);

  // Preserve Response-like contract for legacy callers
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};