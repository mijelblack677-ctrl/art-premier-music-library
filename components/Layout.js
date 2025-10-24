import { useState } from 'react';
import { FiHome, FiCompass, FiMusic, FiHeart, FiMenu, FiSearch, FiX } from 'react-icons/fi';
import { useSearch } from '../contexts/SearchContext';
import AudioPlayer from './AudioPlayer';
import { musicLibrary } from '../data/music-library';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { searchQuery, setSearchQuery, searchMusic, clearSearch } = useSearch();

  const handleSearch = (e) => {
    e.preventDefault();
    searchMusic(searchQuery);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Real-time search as user types
    if (value.length > 2) {
      searchMusic(value);
    } else if (value.length === 0) {
      clearSearch();
    }
  };

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
          <form onSubmit={handleSearch} className="search-bar">
            <input 
              type="text" 
              placeholder="Search songs, artists, albums..." 
              value={searchQuery}
              onChange={handleInputChange}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="clear-btn"
                onClick={clearSearch}
              >
                <FiX />
              </button>
            )}
            <button type="submit" className="search-btn">
              <FiSearch />
            </button>
          </form>
        </div>
        
        <div className="header-right">
          <button className="upload-btn">Upload</button>
          <div className="user-avatar">U</div>
        </div>
      </header>

      {/* Search Results Dropdown */}
      <SearchDropdown />

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
      <AudioPlayer currentSong={musicLibrary.songs[0]} />

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
          position: relative;
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
          align-items: center;
          background: #121212;
          border: 1px solid #303030;
          border-radius: 20px;
          overflow: hidden;
        }
        
        .search-bar input {
          flex: 1;
          padding: 8px 16px;
          background: transparent;
          border: none;
          color: white;
          outline: none;
        }
        
        .clear-btn, .search-btn {
          background: none;
          border: none;
          color: #aaa;
          cursor: pointer;
          padding: 8px 12px;
          display: flex;
          align-items: center;
        }
        
        .clear-btn:hover, .search-btn:hover {
          color: white;
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
          border-right: 1px solid #272727;
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
      `}</style>
    </div>
  );
}

// Search Dropdown Component
function SearchDropdown() {
  const { searchResults, searchQuery, clearSearch } = useSearch();

  if (!searchResults || !searchQuery) return null;

  const { songs, artists, playlists } = searchResults;

  return (
    <div className="search-dropdown">
      <div className="search-results">
        {/* Songs Results */}
        {songs.length > 0 && (
          <div className="result-section">
            <h3>Songs</h3>
            {songs.slice(0, 5).map(song => (
              <div key={song.id} className="result-item">
                <img src={song.thumbnail} alt={song.title} />
                <div className="result-info">
                  <div className="result-title">{song.title}</div>
                  <div className="result-subtitle">{song.artist} • {song.album}</div>
                </div>
                <div className="result-duration">{song.duration}</div>
              </div>
            ))}
          </div>
        )}

        {/* Artists Results */}
        {artists.length > 0 && (
          <div className="result-section">
            <h3>Artists</h3>
            {artists.slice(0, 3).map(artist => (
              <div key={artist.id} className="result-item">
                <img src={artist.avatar} alt={artist.name} className="artist-avatar" />
                <div className="result-info">
                  <div className="result-title">{artist.name}</div>
                  <div className="result-subtitle">Artist • {artist.subscribers}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Playlists Results */}
        {playlists.length > 0 && (
          <div className="result-section">
            <h3>Playlists</h3>
            {playlists.slice(0, 3).map(playlist => (
              <div key={playlist.id} className="result-item">
                <img src={playlist.thumbnail} alt={playlist.title} />
                <div className="result-info">
                  <div className="result-title">{playlist.title}</div>
                  <div className="result-subtitle">Playlist • {playlist.songs.length} songs</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {songs.length === 0 && artists.length === 0 && playlists.length === 0 && (
          <div className="no-results">
            No results found for "{searchQuery}"
          </div>
        )}

        {/* View All Results */}
        {(songs.length > 0 || artists.length > 0 || playlists.length > 0) && (
          <div className="view-all">
            <button onClick={() => window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`}>
              View all results
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .search-dropdown {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 640px;
          max-height: 400px;
          background: #282828;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          z-index: 1000;
          overflow-y: auto;
        }
        
        .search-results {
          padding: 16px;
        }
        
        .result-section {
          margin-bottom: 20px;
        }
        
        .result-section h3 {
          color: #aaa;
          font-size: 14px;
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        
        .result-item {
          display: flex;
          align-items: center;
          padding: 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .result-item:hover {
          background: #3a3a3a;
        }
        
        .result-item img {
          width: 40px;
          height: 40px;
          border-radius: 4px;
          margin-right: 12px;
        }
        
        .artist-avatar {
          border-radius: 50% !important;
        }
        
        .result-info {
          flex: 1;
        }
        
        .result-title {
          font-weight: 500;
          margin-bottom: 2px;
        }
        
        .result-subtitle {
          color: #aaa;
          font-size: 12px;
        }
        
        .result-duration {
          color: #aaa;
          font-size: 12px;
        }
        
        .no-results {
          padding: 20px;
          text-align: center;
          color: #aaa;
        }
        
        .view-all {
          border-top: 1px solid #3a3a3a;
          padding-top: 12px;
          text-align: center;
        }
        
        .view-all button {
          background: none;
          border: none;
          color: #aaa;
          cursor: pointer;
          font-size: 14px;
        }
        
        .view-all button:hover {
          color: white;
        }
      `}</style>
    </div>
  );
}
