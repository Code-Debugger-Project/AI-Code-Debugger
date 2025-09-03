import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext(null);

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [chatHistories, setChatHistories] = useState({
    'error-rectifier': [],
    'source-code': [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addMessage = (mode, message) => {
    setChatHistories(prevHistories => ({
      ...prevHistories,
      [mode]: [...prevHistories[mode], message]
    }));
  };

  const clearHistory = (mode) => {
    setChatHistories(prevHistories => ({
      ...prevHistories,
      [mode]: []
    }));
  };

  const value = {
    chatHistories,
    addMessage,
    clearHistory,
    isLoading,
    setIsLoading,
    error,
    setError,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}; 