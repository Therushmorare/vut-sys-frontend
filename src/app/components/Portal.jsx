"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Login from "./auth/Login";
import Registration from "./auth/Registration";

const Header = dynamic(() => import("./Header"), { ssr: false });
const Dashboard = dynamic(() => import("./Dashboard/Dashboard"), { ssr: false });
const Profile = dynamic(() => import("./Dashboard/Profile"), { ssr: false });
const DocumentUpload = dynamic(() => import("./Documents"), { ssr: false });
const Notifications = dynamic(() => import("./Notifications"), { ssr: false });

export default function StudentPortal() {
  const [view, setView] = useState("login");
  const [currentStudent, setCurrentStudent] = useState(null);
  const [activeView, setActiveView] = useState("dashboard");
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const handleRegister = (formData) => {
    const newStudent = {
      id: `STU${String(registeredUsers.length + 1).padStart(3, "0")}`,
      studentNumber: `2025${String(registeredUsers.length + 1).padStart(4, "0")}`,
      ...formData,
      status: "Pending",
      registrationDate: new Date().toISOString(),
      documentsComplete: false,
      setaAllocation: null,
      placement: null,
      notifications: [],
    };
    setRegisteredUsers([...registeredUsers, newStudent]);
    setCurrentStudent(newStudent);
    setView("portal");
  };

  const handleLogin = (formData) => {
    const user = registeredUsers.find((u) => u.email === formData.email);
    if (user) {
      setCurrentStudent(user);
      setView("portal");
    } else {
      alert("Invalid credentials. Please register first.");
    }
  };

  const handleLogout = () => {
    setCurrentStudent(null);
    setView("login");
    setActiveView("dashboard");
  };

  if (view === "register")
    return <Registration onRegister={handleRegister} onSwitchToLogin={() => setView("login")} />;
  if (view === "login") return <Login onLogin={handleLogin} onSwitchToRegister={() => setView("register")} />;

  // Only render the portal once currentStudent exists
  if (!currentStudent) return null;

  return (
    <div className="min-h-screen">
      <Header student={currentStudent} onLogout={handleLogout} onNavigate={setActiveView} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeView === "dashboard" && <Dashboard student={currentStudent} onNavigate={setActiveView} />}
        {activeView === "profile" && <Profile student={currentStudent} />}
        {activeView === "documents" && <DocumentUpload student={currentStudent} />}
        {activeView === "notifications" && <Notifications student={currentStudent} />}
      </div>
    </div>
  );
}