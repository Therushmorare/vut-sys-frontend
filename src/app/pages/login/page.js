"use client";

import { useRouter } from 'next/navigation';
import Login from '../../components/auth/Login';

export default function LoginPage() {
  const router = useRouter();

  // Called when login is successful
  const handleLogin = async (formData) => {
    try {
      const response = await fetch(
        'https://d17qozs0vubb7e.cloudfront.net/api/students/login', // adjust your login endpoint
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Login failed'); // simple error handling
        return;
      }

      // SUCCESS -> redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again.');
    }
  };

  // Called when user clicks "Register here"
  const switchToRegister = () => {
    router.push('/register');
  };

  return <Login onLogin={handleLogin} onSwitchToRegister={switchToRegister} />;
}
