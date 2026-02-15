const JournalEntry = ({ journal }) => {
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

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{getMoodEmoji(journal.mood)}</span>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{journal.title}</h2>
          <p className="text-sm text-gray-500">
            {new Date(journal.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="prose max-w-none">
        <p className="text-gray-700 whitespace-pre-wrap">{journal.content}</p>
      </div>
    </div>
  );
};

export default JournalEntry;