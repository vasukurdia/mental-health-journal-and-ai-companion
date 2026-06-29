import { useState, useEffect } from 'react';

const MOODS = [
  { value: 'very-happy', label: '😄 Very Happy' },
  { value: 'happy', label: '😊 Happy' },
  { value: 'neutral', label: '😐 Neutral' },
  { value: 'sad', label: '😔 Sad' },
  { value: 'very-sad', label: '😢 Very Sad' },
  { value: 'anxious', label: '😰 Anxious' },
  { value: 'calm', label: '😌 Calm' },
  { value: 'energetic', label: '⚡ Energetic' },
  { value: 'tired', label: '😴 Tired' }
];

const JournalForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: 'neutral',
    tags: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        content: initialData.content || '',
        mood: initialData.mood || 'neutral',
        tags: initialData.tags || [],
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-[#0F1C3F] border border-white/20 p-8 rounded-2xl shadow-xl shadow-black/40 text-white">

      <h2 className="text-2xl font-bold mb-6 text-blue-300">
        {initialData ? 'Edit Journal Entry' : 'New Journal Entry'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-7">

        <div>
          <label className="block text-sm text-gray-300 mb-2">Title</label>
          <input
            type="text"
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Give your entry a title..."
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">How are you feeling?</label>
          <div className="grid grid-cols-3 gap-3">
            {MOODS.map((mood) => (
              <button
                key={mood.value}
                type="button"
                onClick={() => setFormData({ ...formData, mood: mood.value })}
                className={`p-4 rounded-xl border transition-all duration-200 flex flex-col items-center
                  ${
                    formData.mood === mood.value
                      ? "border-blue-400 bg-blue-900/40 scale-[1.04] shadow-md shadow-blue-500/30"
                      : "border-white/20 bg-white/5 hover:border-blue-300 hover:bg-blue-900/20 hover:shadow-md hover:shadow-blue-500/20 hover:scale-[1.03]"
                  }
                `}
              >
                <span className="text-3xl">{mood.label.split(" ")[0]}</span>
                <p className="text-xs mt-1 text-gray-200">
                  {mood.label.split(" ").slice(1).join(" ")}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">What's on your mind?</label>
          <textarea
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400"
            rows="8"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write your thoughts..."
            required
          />
          <p className="text-xs text-gray-400 mt-1">{formData.content.length} / 5000 characters</p>
        </div>

        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 border border-white/30 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 hover:scale-[1.03] transition"
          >
            {initialData ? 'Update Entry' : 'Save Entry'}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-white/10 border border-white/30 text-white py-2 rounded-lg hover:bg-white/20 hover:scale-[1.03] transition"
            >
              Cancel
            </button>
          )}
        </div>

      </form>
    </div>
  );
};

export default JournalForm;
