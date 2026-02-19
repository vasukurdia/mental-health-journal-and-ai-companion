import { useState } from 'react';

const ChatInput = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex gap-2 pt-4 border-t border-gray-700 bg-transparent"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled}
        className="
          flex-1 
          px-4 py-2 
          bg-[#111A2B] 
          text-white 
          placeholder-gray-400 
          border border-gray-600 
          rounded-lg 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          transition
        "
      />

      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className={`
          px-6 py-2 rounded-lg font-medium transition 
          ${disabled || !message.trim()
            ? "bg-gray-700 cursor-not-allowed text-gray-400"
            : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-900/20"
          }
        `}
      >
        {disabled ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default ChatInput;
