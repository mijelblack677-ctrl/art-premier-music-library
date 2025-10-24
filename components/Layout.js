import { useState } from 'react';
import { FiHome, FiCompass, FiMusic, FiHeart, FiMenu } from 'react-icons/fi';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="layout">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <button 
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu />
          </button>
          <div className="logo">
            <span className="logo-icon">🎵</span>
            <span className="logo-text">MusicTube</span>
          </div>
        </div>
        
        <div className="header-center">
          <div className="search-bar">
            <input type="text" placeholder="Search music..." />
            <button className="search-btn">Search</button>
          </div>
        </div>
        
        <div className="header-right">
          <button className="upload-btn">Upload</button>
          <div className="user-avatar">U</div>
        </div>
      </header>

      <div className="main-content">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="sidebar">
            <nav className="sidebar-nav">
              <a href="/" className="nav-item active">
                <FiHome />
                <span>Home</span>
              </a>
              <a href="/explore" className="nav-item">
                <FiCompass />
                <span>Explore</span>
              </a>
              <a href="/library" className="nav-item">
                <FiMusic />
                <span>Your Library</span>
              </a>
              <a href="/liked" className="nav-item">
                <FiHeart />
                <span>Liked Songs</span>
              </a>
            </nav>
            
            <div className="playlists-section">
              <h3>Playlists</h3>
              <div className="playlist-list">
                <a href="/playlist/chill" className="playlist-item">Chill Vibes</a>
                <a href="/playlist/workout" className="playlist-item">Workout Mix</a>
                <button className="create-playlist">+ Create playlist</button>
              </div>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="content">
          {children}
        </main>
      </div>

      {/* Music Player */}
      <footer className="music-player">
        <div className="player-left">
          <div className="now-playing">
            <img src="/thumbnails/midnight-dreams.jpg" alt="Now playing" />
            <div className="track-info">
              <div className="track-title">Midnight Dreams</div>
              <div className="track-artist">Luna Star</div>
            </div>
          </div>
        </div>
        
        <div className="player-center">
          <div className="player-controls">
            <button className="control-btn">⏮</button>
            <button className="play-btn">▶</button>
            <button className="control-btn">⏭</button>
          </div>
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
        </div>
        
        <div className="player-right">
          <button className="volume-btn">🔊</button>
        </div>
      </footer>

      <style jsx>{`
        .layout {
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: #0f0f0f;
          color: white;
        }
        
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          height: 56px;
          background: #0f0f0f;
          border-bottom: 1px solid #272727;
        }
        
        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .menu-btn {
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          padding: 8px;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 20px;
          font-weight: bold;
        }
        
        .logo-icon {
          font-size: 24px;
        }
        
        .header-center {
          flex: 1;
          max-width: 640px;
          margin: 0 40px;
        }
        
        .search-bar {
          display: flex;
        }
        
        .search-bar input {
          flex: 1;
          padding: 8px 16px;
          background: #121212;
          border: 1px solid #303030;
          border-radius: 20px 0 0 20px;
          color: white;
          outline: none;
        }
        
        .search-btn {
          padding: 8px 16px;
          background: #303030;
          border: 1px solid #303030;
          border-radius: 0 20px 20px 0;
          color: white;
          cursor: pointer;
        }
        
        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .upload-btn {
          padding: 8px 16px;
          background: #ff0000;
          border: none;
          border-radius: 20px;
          color: white;
          cursor: pointer;
          font-weight: bold;
        }
        
        .user-avatar {
          width: 32px;
          height: 32px;
          background: #ff0000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        
        .main-content {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        
        .sidebar {
          width: 240px;
          background: #0f0f0f;
          padding: 12px;
          overflow-y: auto;
        }
        
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 24px;
        }
        
        .nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 10px 12px;
          border-radius: 10px;
          text-decoration: none;
          color: white;
          transition: background 0.2s;
        }
        
        .nav-item:hover, .nav-item.active {
          background: #272727;
        }
        
        .playlists-section h3 {
          padding: 8px 12px;
          color: #aaa;
          font-size: 14px;
          font-weight: normal;
        }
        
        .playlist-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .playlist-item, .create-playlist {
          padding: 8px 12px;
          border-radius: 4px;
          text-decoration: none;
          color: #aaa;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
        }
        
        .playlist-item:hover, .create-playlist:hover {
          background: #272727;
          color: white;
        }
        
        .content {
          flex: 1;
          overflow-y: auto;
          background: #0f0f0f;
          padding: 24px;
        }
        
        .music-player {
          height: 80px;
          background: #181818;
          border-top: 1px solid #272727;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
        }
        
        .now-playing {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .now-playing img {
          width: 48px;
          height: 48px;
          border-radius: 4px;
        }
        
        .track-title {
          font-weight: bold;
          font-size: 14px;
        }
        
        .track-artist {
          color: #aaa;
          font-size: 12px;
        }
        
        .player-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .control-btn, .play-btn, .volume-btn {
          background: none;
          border: none;
          color: white;
          font-size: 16px;
          cursor: pointer;
          padding: 8px;
        }
        
        .play-btn {
          background: white;
          color: black;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .progress-bar {
          width: 400px;
          height: 4px;
          background: #404040;
          border-radius: 2px;
          margin-top: 8px;
          cursor: pointer;
        }
        
        .progress {
          width: 30%;
          height: 100%;
          background: white;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
