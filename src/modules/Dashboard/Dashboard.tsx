// Dashboard.js
import { useAuth } from "../../services/Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated()) {
    // Redirect or show a login component
    navigate("/");
    return null; // You can return null while the navigation is in progress
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800"></div>
    </>
  );
}

export default Dashboard;
