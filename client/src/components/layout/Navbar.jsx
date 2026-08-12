import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/journal', label: 'Journal' },
  { to: '/chat', label: 'AI Chat' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-gray-700 transition-all duration-300 
      ${isScrolled || isMenuOpen ? "bg-black/80 backdrop-blur-lg shadow-lg" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <Link to="/dashboard" className="text-2xl font-display font-bold text-gradient">
            MindEase
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">

            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gradient font-medium transition hover:text-gray-400"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-3 border-l pl-6">
              <span className="text-sm text-blue-500 truncate max-w-[10rem]">Hello, {user?.name}</span>

              <button
                onClick={handleLogout}
                className="btn-secondary text-sm text-gradient hover:text-gray-400"
              >
                Logout
              </button>
            </div>

          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="md:hidden p-2 -mr-2 text-gray-200 hover:text-white transition"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-7 h-7" />
            ) : (
              <Bars3Icon className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-black/90 backdrop-blur-lg border-t border-gray-700
        ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 border-t-0'}`}
      >
        <div className="px-4 sm:px-6 py-4 flex flex-col gap-4">

          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-gradient font-medium text-lg transition hover:text-gray-400"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <span className="text-sm text-blue-500 truncate">Hello, {user?.name}</span>

            <button
              onClick={handleLogout}
              className="btn-secondary text-sm text-gradient hover:text-gray-400"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;