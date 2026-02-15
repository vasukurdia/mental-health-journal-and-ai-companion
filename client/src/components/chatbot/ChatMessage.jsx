import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`p-4 rounded-lg max-w-[70%] ${
        isUser 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 text-gray-900'
      }`}>
        {isUser ? (
          // User message - plain text
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          // AI message - with markdown
          <div className="markdown-content">
            <ReactMarkdown
              components={{
                p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                em: ({node, ...props}) => <em className="italic" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc ml-5 my-2 space-y-1" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal ml-5 my-2 space-y-1" {...props} />,
                li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-2" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-lg font-bold mb-2" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-base font-bold mb-1" {...props} />,
                code: ({node, inline, ...props}) => 
                  inline 
                    ? <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                    : <code className="block bg-gray-200 p-3 rounded my-2 text-sm font-mono overflow-x-auto" {...props} />,
                blockquote: ({node, ...props}) => 
                  <blockquote className="border-l-4 border-gray-400 pl-4 italic my-2" {...props} />,
                a: ({node, ...props}) => 
                  <a className="text-blue-600 underline hover:text-blue-800" {...props} target="_blank" rel="noopener noreferrer" />
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
        
        <p className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {isUser ? 'You' : 'AI Assistant'}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;