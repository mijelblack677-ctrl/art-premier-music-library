import { useState, useEffect } from 'react';
import { FiPlay, FiPause, FiVolume2, FiSkipBack, FiSkipForward, FiHeart } from 'react-icons/fi';
import { useMusic } from '../contexts/MusicContext';

export default function AudioPlayer() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    playNext,
    playPrevious,
    seekTo,
    setVolumeLevel
  } = useMusic();

  const [isLiked, setIsLiked] = useState(false);

  const handleSeek = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = (e.nativeEvent.offsetX / progressBar.offsetWidth);
    const seekTime = clickPosition * duration;
    seekTo(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolumeLevel(newVolume);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    // Here you would typically update your database
    console.log(`${currentSong?.title} ${isLiked ? 'unliked' : 'liked'}`);
  };

  if (!currentSong) {
    return (
      <div className="audio-player">
        <div className="no-song">
          <p>Select a song to play</p>
        </div>
      </div>
    );
  }

  return (
    <div className="audio-player">
      <div className="player-left">
        <div className="now-playing">
          <img src={currentSong.thumbnail} alt={currentSong.title} />
          <div className="track-info">
            <div className="track-title">{currentSong.title}</div>
            <div className="track-artist">{currentSong.artist}</div>
          </div>
          <button 
            className={`like-btn ${isLiked ? 'liked' : ''}`}
            onClick={toggleLike}
          >
            <FiHeart />
          </button>
        </div>
      </div>
      
      <div className="player-center">
        <div className="player-controls">
          <button className="control-btn" onClick={playPrevious}>
            <FiSkipBack />
          </button>
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? <FiPause /> : <FiPlay />}
          </button>
          <button className="control-btn" onClick={playNext}>
            <FiSkipForward />
          </button>
        </div>
        <div className="progress-container">
          <span className="time-current">{formatTime(currentTime)}</span>
          <div className="progress-bar" onClick={handleSeek}>
            <div 
              className="progress" 
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="time-total">{formatTime(duration)}</span>
        </div>
      </div>
      
      <div className="player-right">
        <div className="volume-control">
          <FiVolume2 />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
          <span className="volume-percent">{Math.round(volume * 100)}%</span>
        </div>
      </div>

      <style jsx>{`
        .audio-player {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
          background: #181818;
          border-top: 1px solid #272727;
          padding: 0 16px;
          gap: 20px;
        }
        
        .no-song {
          width: 100%;
          text-align: center;
          color: #aaa;
        }
        
        .player-left {
          flex: 1;
          min-width: 200px;
        }
        
        .now-playing {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .now-playing img {
          width: 56px;
          height: 56px;
          border-radius: 4px;
          object-fit: cover;
        }
        
        .track-info {
          flex: 1;
        }
        
        .track-title {
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 2px;
        }
        
        .track-artist {
          color: #aaa;
          font-size: 12px;
        }
        
        .like-btn {
          background: none;
          border: none;
          color: #aaa;
          cursor: pointer;
          padding: 8px;
          transition: color 0.2s;
        }
        
        .like-btn:hover {
          color: white;
        }
        
        .like-btn.liked {
          color: #1db954;
        }
        
        .player-center {
          flex: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          max-width: 500px;
        }
        
        .player-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .control-btn, .play-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.1s;
        }
        
        .control-btn:hover, .play-btn:hover {
          transform: scale(1.1);
        }
        
        .play-btn {
          background: white;
          color: black;
          border-radius: 50%;
          width: 32px;
          height: 32px;
        }
        
        .progress-container {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
        }
        
        .time-current, .time-total {
          color: #aaa;
          font-size: 12px;
          min-width: 40px;
        }
        
        .progress-bar {
          flex: 1;
          height: 4px;
          background: #404040;
          border-radius: 2px;
          cursor: pointer;
          position: relative;
          transition: height 0.2s;
        }
        
        .progress-bar:hover {
          height: 6px;
        }
        
        .progress {
          height: 100%;
          background: white;
          border-radius: 2px;
          transition: width 0.1s;
        }
        
        .player-right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          min-width: 150px;
        }
        
        .volume-control {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #aaa;
        }
        
        .volume-slider {
          width: 80px;
          cursor: pointer;
        }
        
        .volume-percent {
          font-size: 12px;
          min-width: 30px;
        }
      `}</style>
    </div>
  );
}
