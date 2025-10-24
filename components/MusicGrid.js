import { FiPlay, FiPause, FiHeart, FiMoreHorizontal } from 'react-icons/fi';
import { useMusic } from '../contexts/MusicContext';

export default function MusicGrid({ songs }) {
  const { playSong, currentSong, isPlaying } = useMusic();

  const handlePlaySong = (song, index) => {
    playSong(song, songs, index);
  };

  return (
    <div className="music-grid">
      {songs.map((song, index) => (
        <div 
          key={song.id} 
          className={`song-card ${currentSong?.id === song.id ? 'active' : ''}`}
          onClick={() => handlePlaySong(song, index)}
        >
          <div className="song-image">
            <img src={song.thumbnail} alt={song.title} />
            <div className="song-overlay">
              <button 
                className="play-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlaySong(song, index);
                }}
              >
                {currentSong?.id === song.id && isPlaying ? <FiPause /> : <FiPlay />}
              </button>
            </div>
          </div>
          
          <div className="song-info">
            <h3 className="song-title">{song.title}</h3>
            <div className="song-artist">
              <span className="artist-name">{song.artist}</span>
            </div>
            <div className="song-meta">
              <span>{song.plays.toLocaleString()} plays</span>
              <span>•</span>
              <span>{song.duration}</span>
            </div>
          </div>
          
          <div className="song-actions">
            <button 
              className="action-btn"
              onClick={(e) => e.stopPropagation()}
            >
              <FiHeart />
            </button>
            <button 
              className="action-btn"
              onClick={(e) => e.stopPropagation()}
            >
              <FiMoreHorizontal />
            </button>
          </div>
        </div>
      ))}

      <style jsx>{`
        .music-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }
        
        .song-card {
          background: #181818;
          border-radius: 8px;
          padding: 16px;
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
        }
        
        .song-card:hover {
          background: #282828;
          transform: translateY(-5px);
        }
        
        .song-card.active {
          background: #282828;
          border: 1px solid #1db954;
        }
        
        .song-image {
          position: relative;
          margin-bottom: 16px;
        }
        
        .song-image img {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 4px;
          object-fit: cover;
        }
        
        .song-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
          border-radius: 4px;
        }
        
        .song-card:hover .song-overlay {
          opacity: 1;
        }
        
        .song-card.active .song-overlay {
          opacity: 1;
        }
        
        .play-btn {
          background: #1db954;
          border: none;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: black;
          cursor: pointer;
          transform: scale(0.8);
          transition: transform 0.2s;
        }
        
        .song-card:hover .play-btn,
        .song-card.active .play-btn {
          transform: scale(1);
        }
        
        .song-info {
          margin-bottom: 12px;
        }
        
        .song-title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .song-artist {
          color: #aaa;
          font-size: 14px;
          margin-bottom: 8px;
        }
        
        .song-meta {
          display: flex;
          gap: 8px;
          color: #666;
          font-size: 12px;
        }
        
        .song-actions {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }
        
        .action-btn {
          background: none;
          border: none;
          color: #aaa;
          cursor: pointer;
          padding: 4px;
          transition: color 0.2s;
        }
        
        .action-btn:hover {
          color: white;
        }
      `}</style>
    </div>
  );
}
