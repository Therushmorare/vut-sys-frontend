"use client"

import { useState } from 'react';
import { GraduationCap, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { COLORS } from '../../constants/colors';

const Registration = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idNumber: '',
    password: '',
    confirmPassword: '',
    faculty: 'Engineering and Technology',
    programme: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const faculties = [
    'Engineering and Technology',
    'Business and Economics',
    'Health Sciences',
    'Humanities',
    'Natural Sciences'
  ];

  const programmes = {
    'Engineering and Technology': ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'],
    'Business and Economics': ['Business Administration', 'Economics', 'Accounting'],
    'Health Sciences': ['Nursing', 'Medicine', 'Pharmacy'],
    'Humanities': ['Psychology', 'Education', 'Social Work'],
    'Natural Sciences': ['Mathematics', 'Physics', 'Chemistry']
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.idNumber.trim()) newErrors.idNumber = 'ID number is required';
    else if (formData.idNumber.length !== 13) newErrors.idNumber = 'ID number must be 13 digits';
    if (!formData.programme) newErrors.programme = 'Programme is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Map frontend keys to backend keys
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        id_number: formData.idNumber,
        faculty: formData.faculty,
        programme: formData.programme,
        password: formData.password
      };

      const response = await fetch(
        "http://seta-management-api-env.eba-rd7cpwya.us-east-1.elasticbeanstalk.com/api/students/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        onSwitchToLogin(); // redirect to login page
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: COLORS.bgLight }}>
      <div className="w-full max-w-2xl rounded-lg shadow-lg p-8" style={{ backgroundColor: COLORS.bgWhite }}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <GraduationCap className="w-16 h-16" style={{ color: COLORS.primary }} />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.primary }}>
            Student Registration
          </h1>
          <p className="text-gray-600">Create your student portal account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ... all input fields remain exactly the same ... */}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: COLORS.primary }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="font-semibold hover:underline"
              style={{ color: COLORS.primary }}
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
