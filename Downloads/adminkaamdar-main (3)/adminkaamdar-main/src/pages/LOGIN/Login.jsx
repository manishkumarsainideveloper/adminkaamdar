import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";


import { API_ROUTES } from "../../api/api";

const Login = () => {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const cleanedMobile = mobile.replace(/\D/g, "");

    if (cleanedMobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const fullMobile = `+91${cleanedMobile}`;

    try {
      setLoading(true);

      // Clear previous OTP session
      sessionStorage.removeItem("userPhone");
      sessionStorage.removeItem("otpSessionInfo");

      // Step 1: Request OTP from backend
      const response = await fetch(API_ROUTES.requestOtp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: fullMobile,
        }),
      });

      // Step 2: Read API response
      const result = await response.json();

      console.log("OTP REQUEST RESPONSE:", result);

      if (
        !response.ok ||
        result.status === false ||
        result.success === false
      ) {
        throw new Error(
          result.message || "Backend OTP request failed."
        );
      }
      console.log("result",result)

      // Step 3: Get Firebase sessionInfo
      const sessionInfo =
        result.data?.sessionInfo ||
        result.sessionInfo;

      if (!sessionInfo) {
        throw new Error(
          "sessionInfo was not received from OTP request API."
        );
      }

      const phone = result.phone
      if(!phone){
        throw new Error ("phone number not received from backend")
      }

      // Step 4: Save mobile and sessionInfo
      sessionStorage.setItem("userPhone", phone);
      sessionStorage.setItem("otpSessionInfo", sessionInfo);

      // Step 5: Navigate to OTP page
      navigate("/otp", {
        state: {
          fullMobile,
          sessionInfo,
        },
      });

    } catch (err) {
      console.error("Login/OTP error:", err);

      setError(
        err.message || "Unable to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        {/* Header */}
        <div className="auth-header">
          <img
            /*src={Logo}*/
            alt="Kaamdaar"
            className="auth-logo"
          />

          <h2>Welcome to Kaamdaar</h2>
          <p>Enter your mobile number to continue</p>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleLogin}>
          <label htmlFor="mobile">Mobile Number</label>

          <div className="input-group">
            <span className="country-code">
              <span aria-hidden="true">🇮🇳</span>
              <span>+91</span>
              <span className="country-divider"></span>
            </span>

            <input
              id="mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="Enter 10-digit number"
              value={mobile}
              onChange={(e) => {
                setMobile(
                  e.target.value.replace(/\D/g, "").slice(0, 10)
                );
                setError("");
              }}
              maxLength={10}
              required
              disabled={loading}
              aria-invalid={Boolean(error)}
            />
          </div>

          {error ? (
            <p className="auth-error" role="alert">
              {error}
            </p>
          ) : (
            <p className="auth-input-help">
              We'll send you a one-time password (OTP).
            </p>
          )}

          <div id="recaptcha-container"></div>

          {/* Footer Button */}
          <div className="auth-footer">
            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              <span>
                {loading ? "Sending OTP..." : "Continue"}
              </span>

              {!loading && (
                <span className="auth-btn-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </button>

            <p className="auth-terms">
              By continuing, you agree to our{" "}
              <a href="/terms">Terms of Service</a> and{" "}
              <a href="/privacy">Privacy Policy</a>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;