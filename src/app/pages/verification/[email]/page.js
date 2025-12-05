"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { COLORS } from "../../../constants/colors";
import Verification from "../../../components/auth/Verification";

const VerificationPage = ({ params }) => {
  const { email } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleVerify = async (token) => {
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
        alert(data.message || "Verification failed");
      } else {
        router.push("/login"); // success
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    // Optional: call your API to resend token
    alert("Resend token functionality not implemented yet");
  };

  return (
    <Verification
      email={email}
      onVerify={handleVerify}
      onResend={handleResend}
    />
  );
};

export default VerificationPage;
