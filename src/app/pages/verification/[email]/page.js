"use client";

import { useRouter } from "next/navigation";
import Verification from "../../../components/auth/Verification";

const VerificationPage = ({ params }) => {
  const router = useRouter();
  const { email } = params; // assuming email comes from route params

  // Called when the user submits the OTP
  const handleVerify = (otpCode) => {
    console.log("Verifying OTP:", otpCode, "for", email);

    // Example: call your verification API
    // fetch('/api/auth/verify', { method: 'POST', body: JSON.stringify({ email, otpCode }) })

    // Simulate success and navigate
    router.push("/dashboard");
  };

  // Called when the user requests to resend the OTP
  const handleResend = () => {
    console.log("Resend OTP for", email);

    // Example: call your resend API
    // fetch(`/api/auth/resend?email=${email}`, { method: 'POST' })
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