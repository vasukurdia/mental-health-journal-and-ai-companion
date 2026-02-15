import { useState, useEffect } from 'react';

const MOODS = [
  { value: 'very-happy', label: '😄 Very Happy', color: 'bg-green-500' },
  { value: 'happy', label: '😊 Happy', color: 'bg-green-400' },
  { value: 'neutral', label: '😐 Neutral', color: 'bg-gray-400' },
  { value: 'sad', label: '😔 Sad', color: 'bg-blue-400' },
  { value: 'very-sad', label: '😢 Very Sad', color: 'bg-blue-600' },
  { value: 'anxious', label: '😰 Anxious', color: 'bg-yellow-500' },
  { value: 'calm', label: '😌 Calm', color: 'bg-purple-400' },
  { value: 'energetic', label: '⚡ Energetic', color: 'bg-orange-500' },
  { value: 'tired', label: '😴 Tired', color: 'bg-indigo-400' },
];

const JournalForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: 'neutral',
    tags: [],
    isPrivate: true
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        content: initialData.content || '',
        mood: initialData.mood || 'neutral',
        tags: initialData.tags || [],
        isPrivate: initialData.isPrivate ?? true
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-display font-bold mb-6">
        {initialData ? 'Edit Journal Entry' : 'New Journal Entry'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            className="input-field"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Give your entry a title..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How are you feeling?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {MOODS.map((mood) => (
              <button
                key={mood.value}
                type="button"
                onClick={() => setFormData({ ...formData, mood: mood.value })}
                className={`p-3 rounded-lg border-2 transition ${
                  formData.mood === mood.value
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-2xl">{mood.label.split(' ')[0]}</span>
                <p className="text-xs mt-1 font-medium">{mood.label.split(' ').slice(1).join(' ')}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's on your mind?
          </label>
          <textarea
            className="input-field"
            rows="8"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write about your thoughts, feelings, and experiences..."
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.content.length} / 5000 characters
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPrivate"
            checked={formData.isPrivate}
            onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
            className="rounded"
          />
          <label htmlFor="isPrivate" className="text-sm text-gray-700">
            Keep this entry private
          </label>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn-primary flex-1">
            {initialData ? 'Update Entry' : 'Save Entry'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default JournalForm;