import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { journalService } from '../services/journalService';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const [journals, setJournals] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [journalsData, statsData] = await Promise.all([
        journalService.getJournals(),
        journalService.getMoodStats()
      ]);
      setJournals(journalsData.data.slice(0, 5));
      setStats(statsData.data);
    } catch (error) {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const getMoodEmoji = (mood) => {
    const emojis = {
      'very-happy': '😄',
      'happy': '😊',
      'neutral': '😐',
      'sad': '😔',
      'very-sad': '😢',
      'anxious': '😰',
      'calm': '😌',
      'energetic': '⚡',
      'tired': '😴'
    };
    return emojis[mood] || '😐';
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Here's your mental wellness overview</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-linear-to-br from-primary-500 to-primary-600 text-white">
            <h3 className="text-lg font-semibold mb-2">Total Entries</h3>
            <p className="text-4xl font-bold">{journals.length || 0}</p>
          </div>
          
          <div className="card bg-linear-to-br from-secondary-500 to-secondary-600 text-white">
            <h3 className="text-lg font-semibold mb-2">This Week</h3>
            <p className="text-4xl font-bold">
              {journals.filter(j => {
                const entryDate = new Date(j.createdAt);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return entryDate >= weekAgo;
              }).length}
            </p>
          </div>
          
          <div className="card bg-linear-to-br from-accent-500 to-accent-600 text-white">
            <h3 className="text-lg font-semibold mb-2">Most Common Mood</h3>
            <p className="text-4xl font-bold">
              {stats[0] ? getMoodEmoji(stats[0]._id) : '😊'}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-display font-bold">Recent Journals</h2>
              <Link to="/journal" className="text-primary-600 hover:text-primary-700 font-medium">
                View All →
              </Link>
            </div>
            
            {journals.length > 0 ? (
              <div className="space-y-3">
                {journals.map((journal) => (
                  <div key={journal._id} className="border-l-4 border-primary-400 pl-4 py-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{getMoodEmoji(journal.mood)}</span>
                      <h3 className="font-semibold text-gray-900">{journal.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{journal.content}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(journal.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No journal entries yet. Start writing!</p>
            )}
          </div>

          <div className="card">
            <h2 className="text-2xl font-display font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/journal" className="block p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition">
                <h3 className="font-semibold text-primary-800 mb-1">✍️ New Journal Entry</h3>
                <p className="text-sm text-primary-600">Write about your day and feelings</p>
              </Link>
              
              <Link to="/chat" className="block p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition">
                <h3 className="font-semibold text-secondary-800 mb-1">💬 Chat with AI</h3>
                <p className="text-sm text-secondary-600">Talk to your AI companion</p>
              </Link>
              
              <div className="p-4 bg-accent-50 rounded-lg">
                <h3 className="font-semibold text-accent-800 mb-1">📊 Mood Statistics</h3>
                <p className="text-sm text-accent-600 mb-3">Your emotional patterns</p>
                {stats.length > 0 && (
                  <div className="space-y-2">
                    {stats.slice(0, 3).map((stat) => (
                      <div key={stat._id} className="flex items-center justify-between text-sm">
                        <span>
                          {getMoodEmoji(stat._id)} {stat._id}
                        </span>
                        <span className="font-semibold">{stat.count} times</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;