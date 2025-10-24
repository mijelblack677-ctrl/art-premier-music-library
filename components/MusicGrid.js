import { FiPlay, FiHeart, FiMoreHorizontal } from 'react-icons/fi';

export default function MusicGrid({ songs }) {
  return (
    <div className="music-grid">
      {songs.map(song => (
        <div key={song.id} className="song-card">
          <div className="song-image">
            <img src={song.thumbnail} alt={song.title} />
            <div className="song-overlay">
              <button className="play-btn">
                <FiPlay />
              </button>
            </div>
          </div>
          
          <div className="song-info">
            <h3 className="song-title">{song.title}</h3>
            <div className="song-artist">
              <span className="artist-name">{song.artist}</span>
              {song.verified && <span className="verified">✓</span>}
            </div>
            <div className="song-meta">
              <span>{song.plays.toLocaleString()} plays</span>
              <span>•</span>
              <span>{song.duration}</span>
            </div>
          </div>
          
          <div className="song-actions">
            <button className="action-btn">
              <FiHeart />
            </button>
            <button className="action-btn">
              <FiMoreHorizontal />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
