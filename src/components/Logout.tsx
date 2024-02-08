import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/Contexts/AuthContext';
import toast from 'react-hot-toast';

const Logout = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    logoutUser();
    toast.success('logged out');
    navigate('/sign-in');
  };

  return (
    <button className="logout-btn p-2 ml-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md" onClick={logout}>
      Logout
    </button>
  );
};

export default Logout;
