import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useChat } from '../context/ChatContext.jsx';
import ErrorRectifier from '../components/ErrorRectifier';
import SourceCode from '../components/SourceCode';
import './Home.css';

const Home = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // State for dropdown visibility
  const [isErHistoryOpen, setIsErHistoryOpen] = useState(false);
  const [isScHistoryOpen, setIsScHistoryOpen] = useState(false);

  // State for new chat popover visibility
  const [showNewChatPopover, setShowNewChatPopover] = useState(false);
  const newChatButtonRef = useRef(null); // Ref for the New Chat button
  const popoverRef = useRef(null); // Ref for the popover itself

  const { clearHistory } = useChat();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleNewChatPopover = () => {
    setShowNewChatPopover(!showNewChatPopover);
    // Close history dropdowns when opening new chat popover
    setIsErHistoryOpen(false);
    setIsScHistoryOpen(false);
  };

  const closeNewChatPopover = () => {
    setShowNewChatPopover(false);
  };

  // Effect to close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (newChatButtonRef.current && newChatButtonRef.current.contains(event.target)) {
        // Click is inside the button, do nothing
        return;
      }
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        closeNewChatPopover();
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNewChatPopover]); // Re-run effect when popover visibility changes

  const handleNewChatOptionClick = (path) => {
    // Clear history for the current mode before navigating, if on a chat page
    const currentMode = location.pathname.split('/').pop();
     if (currentMode === 'error-rectifier' || currentMode === 'source-code') {
        clearHistory(currentMode);
     }
    // Navigate to the absolute nested path
    navigate(path); // path will now be like /home/error-rectifier
    closeNewChatPopover(); // Close popover after navigation
  };

  // Toggle history dropdowns
  const toggleErHistory = () => setIsErHistoryOpen(!isErHistoryOpen);
  const toggleScHistory = () => setIsScHistoryOpen(!isScHistoryOpen);

  const renderMainContent = () => {
    return <Outlet />;
  };

  const renderSidebarNav = () => {
    const currentPath = location.pathname;
    // Check for absolute nested paths
    const isErrorRectifierActive = currentPath === '/home/error-rectifier';
    const isSourceCodeActive = currentPath === '/home/source-code';
    // New Chat button should always be visible

    return (
      <nav className="sidebar-nav">
        {/* New Chat Button - always visible now */}
        <button
          ref={newChatButtonRef} // Attach ref
          className={`nav-item new-chat-button ${showNewChatPopover ? 'active' : ''}`} // Add active class when popover is open
          onClick={toggleNewChatPopover}
        >
          <span className="nav-icon">
            <div className="plus-icon"></div>
          </span>
          New Chat
        </button>

        {/* New Chat Popover */}
        {showNewChatPopover && (
          <div className="new-chat-popover" ref={popoverRef}>
            <button 
              className="popover-item" 
              onClick={() => handleNewChatOptionClick('/home/error-rectifier')} // Absolute path
            >
              <span className="nav-icon">
                <div className="wrench-icon"></div>
              </span>
              Error Rectifier
            </button>
            <button 
              className="popover-item" 
              onClick={() => handleNewChatOptionClick('/home/source-code')} // Absolute path
            >
              <span className="nav-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </span>
              Source Code History
            </button>
          </div>
        )}

        {/* Conditional rendering based on active page for ordering */}
        {isErrorRectifierActive ? (
          // Order for Error Rectifier page: Source Code then Error Rectifier (with dropdown)
          <>
            {/* Source Code link - always visible, placed above ER when ER is active */}
             <Link to="/home/source-code" className={`nav-item ${isSourceCodeActive ? 'active' : ''}`} onClick={() => setIsScHistoryOpen(false)}> {/* Absolute path */}
              <span className="nav-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </span>
              Source Code
             </Link>

            {/* Error Rectifier item with dropdown trigger */}
            <div className="nav-item active" onClick={toggleErHistory}> {/* Active item is a div */} 
              <span className="nav-icon">
                  <div className="wrench-icon"></div>
                </span>
                Error Rectifier History
                <span className={`dropdown-arrow ${isErHistoryOpen ? 'open' : ''}`}>▼</span>
            </div>

            {/* Error Rectifier History Dropdown Content - only appears when active */}
            {isErHistoryOpen && (
               <div className="history-dropdown-content">
                <Link to="/home/error-rectifier-history" className="nav-item sub-item">
                  <span className="nav-icon">
                    <div className="history-icon"></div>
                  </span>
                  History Item 1
                </Link>
                 <Link to="/home/error-rectifier-history" className="nav-item sub-item">
                  <span className="nav-icon">
                    <div className="history-icon"></div>
                  </span>
                  History Item 2
                </Link>
               </div>
            )}
          </>
        ) : isSourceCodeActive ? (
          // Order for Source Code page: Error Rectifier then Source Code (with dropdown)
          <>
            {/* Error Rectifier link - always visible, placed above SC when SC is active */}
             <Link to="/home/error-rectifier" className={`nav-item ${isErrorRectifierActive ? 'active' : ''}`} onClick={() => setIsErHistoryOpen(false)}> {/* Absolute path */}
              <span className="nav-icon">
                  <div className="wrench-icon"></div>
                </span>
                Error Rectifier
             </Link>

            {/* Source Code item with dropdown trigger */}
            <div className="nav-item active" onClick={toggleScHistory}> {/* Active item is a div */} 
               <span className="nav-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </span>
              Source Code History
              <span className={`dropdown-arrow ${isScHistoryOpen ? 'open' : ''}`}>▼</span>
            </div>

            {/* Source Code History Dropdown Content - only appears when active */}
             {isScHistoryOpen && (
                <div className="history-dropdown-content">
                   <Link to="/home/source-code-history" className="nav-item sub-item">
                    <span className="nav-icon">
                      <div className="history-icon"></div>
                    </span>
                    History Item A
                  </Link>
                   <Link to="/home/source-code-history" className="nav-item sub-item">
                    <span className="nav-icon">
                      <div className="history-icon"></div>
                    </span>
                    History Item B
                  </Link>
                </div>
            )}
          </>
        ) : ( /* Default order when neither is active (Welcome Page) */
          <>
            {/* Error Rectifier link */} 
             <Link to="/home/error-rectifier" className="nav-item" onClick={() => setIsErHistoryOpen(false)}> {/* Absolute path */}
              <span className="nav-icon">
                  <div className="wrench-icon"></div>
                </span>
                Error Rectifier
             </Link>

            {/* Source Code link */} 
             <Link to="/home/source-code" className="nav-item" onClick={() => setIsScHistoryOpen(false)}> {/* Absolute path */}
              <span className="nav-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </span>
              Source Code
            </Link>
          </>
        )}

      </nav>
    );
  };

  return (
    <div className="container">
      <div className={`sidebar${sidebarOpen ? '' : ' collapsed'}`}>
        <div className="sidebar-header">
          <Link to="/home">
            <h1>AI Assistant</h1>
          </Link>
          <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)} title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
            {sidebarOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b9dc3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b9dc3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            )}
          </button>
        </div>
        <div className="sidebar-divider"></div>
        {renderSidebarNav()}
        <div className="sidebar-divider"></div>
        <div className="sidebar-bottom-user">
          <div className="user-info-row">
            <span className="user-display">{user?.displayName || user?.email}</span>
            <button className="logout-inline-btn" onClick={handleLogout} title="Log Out">
              Logout
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"/></svg>
            </button>
          </div>
        </div>
      </div>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;