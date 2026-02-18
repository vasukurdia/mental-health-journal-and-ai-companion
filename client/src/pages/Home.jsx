import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      <nav className="shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-display font-bold text-gradient">MindEase</h1>
            <div className="flex gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn-primary">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn-secondary hover:text-gray-400 transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="btn-primary hover:text-gray-400 transition"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-display font-bold mb-6">
            <span className="text-gradient">Your Mental Wellness</span>
            <br />
            <span className="text-gray-800">Journey Starts Here</span>
          </h2>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Journal your thoughts, track your moods, and chat with an AI companion designed to support your mental health journey.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="card text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Digital Journaling</h3>
              <p className="text-gray-600">
                Express your thoughts and emotions in a safe, private space
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-4xl mb-4">😊</div>
              <h3 className="text-xl font-semibold mb-2">Mood Tracking</h3>
              <p className="text-gray-600">
                Monitor your emotional patterns and identify trends
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI Companion</h3>
              <p className="text-gray-600">
                Get support and guidance from our empathetic AI chatbot
              </p>
            </div>
          </div>
          
          {!isAuthenticated && (
            <div className="mt-12">
              <Link
                to="/register"
                className="btn-primary text-lg px-8 py-3 hover:text-gray-400 transition"
              >
                Start Your Journey Today
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
