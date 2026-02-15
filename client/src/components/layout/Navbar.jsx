import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/dashboard" className="text-2xl font-display font-bold text-gradient">
            MindfulJournal
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="text-gradient hover:text-primary-600 font-medium transition">
              Dashboard
            </Link>
            <Link to="/journal" className="text-gradient hover:text-primary-600 font-medium transition">
              Journal
            </Link>
            <Link to="/chat" className="text-gradient hover:text-primary-600 font-medium transition">
              AI Chat
            </Link>
            
            <div className="flex items-center gap-3 border-l pl-6">
              <span className="text-sm text-blue-700">Hello, {user?.name}</span>
              <button onClick={handleLogout} className="btn-secondary text-sm text-gradient">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;