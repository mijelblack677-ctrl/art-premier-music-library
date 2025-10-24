import { useState, useRef, useEffect } from 'react';
import { FiPlay, FiPause, FiVolume2, FiSkipBack, FiSkipForward } from 'react-icons/fi';

export default function AudioPlayer({ currentSong }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentSong) {
      audio.src = currentSong.audioUrl;
      audio.load();
      
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [currentSong]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio) {
      const seekTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * duration;
      audio.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    const newVolume = parseFloat(e.target.value);
    if (audio) {
      audio.volume = newVolume;
    }
    setVolume(newVolume);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentSong) return null;

  return (
    <div className="audio-player">
      <audio ref={audioRef} />
      
      <div className="player-left">
        <div className="now-playing">
          <img src={currentSong.thumbnail} alt={currentSong.title} />
          <div className="track-info">
            <div className="track-title">{currentSong.title}</div>
            <div className="track-artist">{currentSong.artist}</div>
          </div>
        </div>
      </div>
      
      <div className="player-center">
        <div className="player-controls">
          <button className="control-btn">
            <FiSkipBack />
          </button>
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? <FiPause /> : <FiPlay />}
          </button>
          <button className="control-btn">
            <FiSkipForward />
          </button>
        </div>
        <div className="progress-container" onClick={handleSeek}>
          <span className="time-current">{formatTime(currentTime)}</span>
          <div className="progress-bar">
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
        
        .player-left {
          flex: 1;
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
        }
        
        .track-title {
          font-weight: bold;
          font-size: 14px;
        }
        
        .track-artist {
          color: #aaa;
          font-size: 12px;
        }
        
        .player-center {
          flex: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
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
          max-width: 500px;
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
        }
        
        .volume-control {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #aaa;
        }
        
        .volume-slider {
          width: 80px;
        }
      `}</style>
    </div>
  );
}
