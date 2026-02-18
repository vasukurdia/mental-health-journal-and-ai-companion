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
    'very-happy': 'bg-green-900/40 text-green-300 border-green-400/40',
    'happy': 'bg-green-800/40 text-green-300 border-green-400/40',
    'neutral': 'bg-white/10 text-gray-200 border-white/20',
    'sad': 'bg-blue-900/40 text-blue-300 border-blue-400/40',
    'very-sad': 'bg-blue-950/40 text-blue-300 border-blue-400/40',
    'anxious': 'bg-yellow-900/40 text-yellow-300 border-yellow-400/40',
    'calm': 'bg-purple-900/40 text-purple-300 border-purple-400/40',
    'energetic': 'bg-orange-900/40 text-orange-300 border-orange-400/40',
    'tired': 'bg-indigo-900/40 text-indigo-300 border-indigo-400/40'
  };
  return colors[mood] || 'bg-white/10 text-gray-200 border-white/20';
};


const EntryCard = ({ journal, onEdit, onDelete }) => {
  return (
    <div className="bg-[#0F1C3F] border border-white/20 p-6 rounded-2xl shadow-lg shadow-black/40 
      text-white transition-all duration-300 hover:shadow-blue-500/30 hover:-translate-y-1">

      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{getMoodEmoji(journal.mood)}</span>

          <div>
            <h3 className="text-xl font-semibold text-blue-100 tracking-wide">
              {journal.title}
            </h3>
            <p className="text-xs text-gray-400">
              {new Date(journal.createdAt).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-xl text-xs font-semibold border backdrop-blur-sm ${getMoodColor(journal.mood)}`}>
          {journal.mood.replace('-', ' ')}
        </span>
      </div>

      <p className="text-gray-200/90 mb-6 leading-relaxed line-clamp-3">
        {journal.content}
      </p>

      <div className="flex justify-between items-center pt-4 border-t border-white/10">

        {journal.isPrivate && (
          <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-lg flex items-center gap-1">
            🔒 <span className="opacity-80">Private</span>
          </span>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => onEdit(journal)}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition duration-200 hover:scale-[1.05]"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(journal._id)}
            className="text-red-400 hover:text-red-300 text-sm font-medium transition duration-200 hover:scale-[1.05]"
          >
            Delete
          </button>
        </div>

      </div>

    </div>
  );
};

export default EntryCard;
