"use client";

import { useState } from "react";
import { COLORS } from "../../../constants/colors";
import { useRouter } from "next/navigation";

const VerificationPage = ({ params }) => {
  const { email } = params; // email comes from the route
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (token.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://d17qozs0vubb7e.cloudfront.net/api/students/verify-token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, token }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Verification failed");
      } else {
        // SUCCESS -> redirect to login
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    // Optional: call your API to resend token
    alert("Resend token functionality not implemented yet");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: COLORS.bgLight }}
    >
      <div
        className="w-full max-w-md rounded-lg shadow-lg p-8"
        style={{ backgroundColor: COLORS.bgWhite }}
      >
        <h1
          className="text-3xl font-bold mb-4 text-center"
          style={{ color: COLORS.primary }}
        >
          Email Verification
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Enter the 6-digit code sent to <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-center text-xl tracking-widest"
            maxLength={6}
            placeholder="Enter 6-digit code"
            style={{ borderColor: error ? COLORS.danger : COLORS.border }}
          />
          {error && (
            <p className="text-sm mt-1 text-center" style={{ color: COLORS.danger }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: COLORS.primary }}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Didn't receive a code?{" "}
            <button
              onClick={handleResend}
              className="font-semibold hover:underline"
              style={{ color: COLORS.primary }}
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
