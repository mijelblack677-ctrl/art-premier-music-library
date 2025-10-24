import { useState } from 'react';
import { FiHome, FiCompass, FiMusic, FiHeart, FiMenu, FiSearch, FiX } from 'react-icons/fi';
import { useSearch } from '../contexts/SearchContext';

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

      {/* Rest of the layout remains the same */}
      <div className="main-content">
        {/* ... sidebar and main content ... */}
      </div>

      {/* ... music player ... */}

      <style jsx>{`
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
        
        /* Add to existing styles */
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
