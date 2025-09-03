import React, { useState, useRef, useEffect } from 'react';
import { sendPrompt } from '../services/api';
import { useChat } from '../context/ChatContext';
import '../styles/shared.css';
import '../styles/ErrorRectifier.css';

const ErrorRectifier = () => {
  const { chatHistories, addMessage, isLoading, setIsLoading, error, setError } = useChat();
  const [prompt, setPrompt] = useState('');
  const chatEndRef = useRef(null);
  const [copiedFullResponseIndex, setCopiedFullResponseIndex] = useState(null);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistories['error-rectifier']]);

  const parseResponseContent = (content) => {
    const parts = [];
    const regex = /```(\w*)\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const [fullMatch, language, code] = match;
      const textBefore = content.substring(lastIndex, match.index);

      if (textBefore) {
        textBefore.split('\n').forEach(line => {
          if(line.trim()) {
             parts.push({ type: 'text', content: line.trim() });
          }
        });
      }

      parts.push({ type: 'code', language: language || '', content: code.trim() });
      lastIndex = regex.lastIndex;
    }

    const textAfter = content.substring(lastIndex);
    if (textAfter) {
       textAfter.split('\n').forEach(line => {
          if(line.trim()) {
             parts.push({ type: 'text', content: line.trim() });
          }
       });
    }

    return parts;
  };

  const handleCopyFullResponse = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFullResponseIndex(index);
      setTimeout(() => setCopiedFullResponseIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy full response:', err);
    }
  };

  const handleCopyCode = async (text, messageIndex, partIndex) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCodeIndex({ messageIndex, partIndex });
      setTimeout(() => setCopiedCodeIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const currentPrompt = prompt.trim();
    setPrompt('');
    setIsLoading(true);
    setError(null);

    addMessage('error-rectifier', { type: 'prompt', content: currentPrompt });

    try {
      const result = await sendPrompt(currentPrompt, 'error-rectifier');
      addMessage('error-rectifier', { type: 'response', content: result });
    } catch (err) {
      setError('Failed to get response. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="error-rectifier-container">
      <h1 className="main-content-title">Error Rectifier</h1>

      <div className="chat-container">
        <div className="chat-history">
          {chatHistories['error-rectifier'].map((message, messageIndex) => (
            <div key={messageIndex} className="chat-message">
              {message.type === 'prompt' ? (
                <div className="message-prompt">{message.content}</div>
              ) : (
                <div className="message-response-wrapper">
                  <div className="message-response">
                    {parseResponseContent(message.content).map((part, partIndex) => (
                      part.type === 'text' ? (
                        <p key={partIndex}>{part.content}</p>
                      ) : (
                        <div key={partIndex} className="code-block-with-copy">
                          <pre><code className={`language-${part.language}`}>{part.content}</code></pre>
                          <button 
                            className="copy-code-button"
                            onClick={() => handleCopyCode(part.content, messageIndex, partIndex)}
                            title="Copy code to clipboard"
                          >
                            {copiedCodeIndex?.messageIndex === messageIndex && copiedCodeIndex?.partIndex === partIndex ? 'Copied!' : (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            )}
                          </button>
                        </div>
                      )
                    ))}
                  </div>
                  <button 
                    className="copy-button"
                    onClick={() => handleCopyFullResponse(message.content, messageIndex)}
                    title="Copy full response to clipboard"
                  >
                    {copiedFullResponseIndex === messageIndex ? 'Copied!' : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="prompt-form">
          <div className="prompt-input-area">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your error or code to debug..."
              className="prompt-input"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="send-button"
              disabled={isLoading || !prompt.trim()}
            >
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ErrorRectifier; 