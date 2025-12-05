"use client";

import { useRouter } from "next/navigation";
import Login from "../../components/auth/Login";

const LoginPage = () => {
  const router = useRouter();

  // Handles what happens after login
  const handleLogin = (formData) => {
    // Example: call your API here
    // For now, just simulate success and navigate
    console.log("Logging in with:", formData);
    router.push("/dashboard");
  };

  // Switch to register page
  const handleSwitchToRegister = () => {
    router.push("/register");
  };

  return (
    <Login
      onLogin={handleLogin}
      onSwitchToRegister={handleSwitchToRegister}
    />
  );
};

export default LoginPage;