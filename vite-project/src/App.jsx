import { useState } from "react";
import Navbar from "./components/Navbar";
import PublicStatusPage from "./pages/PublicStatusPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [view, setView] = useState("public"); 
  // public | login | admin

  const handleLoginSuccess = () => {
    setView("admin");
  };

  const handleLogout = () => {
    setView("public");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        isAdmin={view === "admin"}
        onLoginClick={() => setView("login")}
        onLogout={handleLogout}
      />

      {view === "public" && <PublicStatusPage />}
      {view === "login" && (
        <AdminLogin onLogin={handleLoginSuccess} />
      )}
      {view === "admin" && <AdminDashboard />}
    </div>
  );
}

export default App;
