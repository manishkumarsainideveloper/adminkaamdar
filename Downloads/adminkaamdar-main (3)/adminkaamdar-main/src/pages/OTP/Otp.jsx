import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OTP.css";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 44;

// Backend API URLs
const VERIFY_OTP_API =
  "http://192.168.1.26:4000/api/v1/auth/otp/verify";

const REQUEST_OTP_API =
  "http://192.168.1.26:4000/api/v1/auth/otp/request";

const OTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);

  // Get mobile number from Login page or sessionStorage
  const fullMobile =
    location.state?.fullMobile ||
    sessionStorage.getItem("userPhone") ||
    "";

  // Get sessionInfo from OTP request API
  const sessionInfo =
    location.state?.sessionInfo ||
    sessionStorage.getItem("otpSessionInfo") ||
    "";

    // console.log("fullMobile", fullMobile)

  // Separate country code and 10-digit mobile number
  const parsedPhone = fullMobile.match(/^(\+\d{1,3})(\d{10})$/);
      console.log("parsedPhone", parsedPhone)


  const draft =
    location.state?.draft ||
    (parsedPhone
      ? {
          country_code: parsedPhone[1],
          mobile: parsedPhone[2],
        }
      :null );

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [seconds, setSeconds] = useState(RESEND_SECONDS);

  // Countdown timer
  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setTimeout(() => {
      setSeconds((current) => current - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  // Focus first OTP input
  useEffect(() => {
    if (draft?.mobile) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  // Check mobile number and sessionInfo
  useEffect(() => {
    if (!draft?.mobile || !draft?.country_code) {
      setError("Mobile number not found. Please return to login.");
    } else if (!sessionInfo) {
      setError("OTP session not found. Please login again.");
    }
  }, []);

  // Handle OTP input
  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    setOtp((current) => {
      const next = [...current];
      next[index] = digit;
      return next;
    });

    setError("");
    setMessage("");

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Backspace and arrow navigation
  const handleKeyDown = (index, event) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (
      event.key === "ArrowRight" &&
      index < OTP_LENGTH - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Paste complete OTP
  const handlePaste = (event) => {
    event.preventDefault();

    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pastedDigits) return;

    setOtp(
      Array.from(
        { length: OTP_LENGTH },
        (_, index) => pastedDigits[index] || ""
      )
    );

    setError("");
    setMessage("");

    const nextIndex = Math.min(
      pastedDigits.length,
      OTP_LENGTH - 1
    );

    inputRefs.current[nextIndex]?.focus();
  };

  // Verify OTP through backend API
  const handleVerify = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!draft?.mobile || !draft?.country_code) {
      setError("Mobile number not found. Please login again.");
      return;
    }

    const currentSessionInfo =
      sessionStorage.getItem("otpSessionInfo") || sessionInfo;

    if (!currentSessionInfo) {
      setError("OTP session expired. Please login again.");
      return;
    }

    const otpValue = otp.join("");

    if (otpValue.length !== OTP_LENGTH) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const phone = `${draft.country_code}${draft.mobile}`;

      // Verify OTP API
      // credentials: include allows browser to receive HttpOnly cookie
      const response = await fetch(VERIFY_OTP_API, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phone,
          sessionInfo: currentSessionInfo,
          code: otpValue,
          platform: "WEB",
        }),
      });

      const result = await response.json();

      console.log("OTP VERIFY RESPONSE:", result);

      if (
        !response.ok ||
        (result.status !== true && result.success !== true)
      ) {
        throw new Error(
          result.message || "OTP verification failed."
        );
      }

      const data = result.data;
      console.log( "Data", data);

      if (!data?.accessToken) {
        throw new Error(
          "Access token was not received from backend."
        );
      }

      // Save access token only.
      // Refresh token is stored in HttpOnly cookie by backend.
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userPhone", phone);

      if (data.user) {
        const customerData = {
          ...data.user,
          customerProfile: data.customerProfile || {},
          addresses: Array.isArray(data.addresses)
            ? data.addresses
            : [],
          defaultAddress: data.defaultAddress || null,
        };

        localStorage.setItem(
          "customer",
          JSON.stringify(customerData)
        );

        // Save latest backend addresses for Profile and Details pages
        localStorage.setItem(
          `kaamdaar_saved_addresses_${phone.replace(/\D/g, "")}`,
          JSON.stringify(customerData.addresses)
        );
      }

      // Notify Navbar about successful login
      window.dispatchEvent(
        new Event("kaamdaar-auth-change")
      );

      // Remove temporary OTP session
      sessionStorage.removeItem("otpSessionInfo");
      sessionStorage.removeItem("userPhone");

      const nextStep = data.next_step;

      // Existing user
      if (nextStep === "ADMIN_DASHBOARD") {
        navigate("/", {
          replace: true,
          state: {
            verifiedPhone: data.user?.mobile || phone,
          },
        });
      }

      // New user
      else if (
        nextStep === "ADMIN_DASHBOARD" ||
        data.isNewUser === true
      ) {
        const registrationDraft = {
          country_code: draft.country_code,
          mobile: draft.mobile,
          fullMobile: phone,
        };

        navigate("/", {
          replace: true,
          state: {
            draft: registrationDraft,
            verifiedPhone: phone,
            previewMode: false,
          },
        });
      } else {
        throw new Error(
          "Unexpected next_step received from backend."
        );
      }
    } catch (err) {
      console.error("OTP verification failed:", err);

      setError(
        err.message || "Unable to verify OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP through backend request API
  const handleResend = async () => {
    if (seconds > 0 || resending || loading) return;

    if (!draft?.mobile || !draft?.country_code) {
      setError("Mobile number not found. Please login again.");
      return;
    }

    try {
      setError("");
      setMessage("");
      setResending(true);

      const phone = `${draft.country_code}${draft.mobile}`;

      const response = await fetch(REQUEST_OTP_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phone,
        }),
      });

      const result = await response.json();

      if (
        !response.ok ||
        result.status === false ||
        result.success === false
      ) {
        throw new Error(
          result.message || "Unable to resend OTP."
        );
      }

      // Get new sessionInfo from resend response
      const newSessionInfo =
        result.data?.sessionInfo ||
        result.sessionInfo;

      if (!newSessionInfo) {
        throw new Error(
          "New sessionInfo was not received from backend."
        );
      }

      sessionStorage.setItem(
        "otpSessionInfo",
        newSessionInfo
      );

      setOtp(Array(OTP_LENGTH).fill(""));
      setSeconds(RESEND_SECONDS);
      setMessage("A new OTP has been sent.");

      inputRefs.current[0]?.focus();
    } catch (err) {
      console.error("Resend OTP failed:", err);

      setError(
        err.message || "Unable to resend OTP. Please try again."
      );
    } finally {
      setResending(false);
    }
  };

  // Mask mobile number
  const maskedMobile = draft?.mobile
    ? `${draft.country_code} ${draft.mobile.replace(
        /^(\d{2})\d+(\d{2})$/,
        "$1••••••$2"
      )}`
    : "Unknown number";

  const formattedTime = `00:${String(seconds).padStart(2, "0")}`;

  const hasSessionInfo = Boolean(
    sessionStorage.getItem("otpSessionInfo") || sessionInfo
  );

  return (
    <div className="auth-wrapper">
      <div className="otp-card">
        <div className="otp-blue-header">
          <div className="logo-box">
            <img
             /* src={Logo}*/
              alt="Kaamdaar Logo"
              className="otp-logo"
            />
          </div>
        </div>

        <div className="otp-body">
          <h2>Verify OTP</h2>

          <p className="otp-subtext">
            We have sent a 6-digit OTP to
            <br />
            <strong>{maskedMobile}</strong>
          </p>

          <form onSubmit={handleVerify}>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={
                    index === 0 ? "one-time-code" : "off"
                  }
                  aria-label={`OTP digit ${index + 1}`}
                  maxLength={1}
                  value={digit}
                  onChange={(event) =>
                    handleChange(index, event.target.value)
                  }
                  onKeyDown={(event) =>
                    handleKeyDown(index, event)
                  }
                  onPaste={handlePaste}
                  onFocus={(event) => event.target.select()}
                  disabled={loading || !draft?.mobile}
                  required
                />
              ))}
            </div>

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            {message && (
              <p className="auth-input-help" role="status">
                {message}
              </p>
            )}

            <p className="resend-text">
              {seconds > 0 ? (
                <>
                  Resend OTP in <strong>{formattedTime}</strong>
                </>
              ) : (
                <>
                  Didn't receive the OTP?{" "}
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resending || loading}
                  >
                    {resending ? "Resending..." : "Resend OTP"}
                  </button>
                </>
              )}
            </p>

            <div id="recaptcha-container"></div>

            <div className="otp-footer">
              <button
                type="submit"
                className="auth-btn"
                disabled={
                  loading ||
                  !draft?.mobile ||
                  !hasSessionInfo
                }
              >
                {loading ? "Verifying..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTP;