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

const getMoodColor = (mood) => {
  const colors = {
    'very-happy': 'bg-green-100 text-green-800',
    'happy': 'bg-green-50 text-green-700',
    'neutral': 'bg-gray-100 text-gray-800',
    'sad': 'bg-blue-100 text-blue-800',
    'very-sad': 'bg-blue-200 text-blue-900',
    'anxious': 'bg-yellow-100 text-yellow-800',
    'calm': 'bg-purple-100 text-purple-800',
    'energetic': 'bg-orange-100 text-orange-800',
    'tired': 'bg-indigo-100 text-indigo-800'
  };
  return colors[mood] || 'bg-gray-100 text-gray-800';
};

const EntryCard = ({ journal, onEdit, onDelete }) => {
  return (
    <div className="card hover:shadow-2xl transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{getMoodEmoji(journal.mood)}</span>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{journal.title}</h3>
            <p className="text-sm text-gray-500">
              {new Date(journal.createdAt).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
        
        <span className={`mood-badge ${getMoodColor(journal.mood)}`}>
          {journal.mood.replace('-', ' ')}
        </span>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">{journal.content}</p>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex gap-2">
          {journal.isPrivate && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              🔒 Private
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(journal)}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(journal._id)}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryCard;