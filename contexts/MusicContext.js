import { createContext, useContext, useState, useRef, useEffect } from 'react';

const MusicContext = createContext();

export function MusicProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const audioRef = useRef(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    const updateTime = () => setCurrentTime(audioRef.current.currentTime);
    const updateDuration = () => setDuration(audioRef.current.duration);
    const handleEnded = () => playNext();

    audioRef.current.addEventListener('timeupdate', updateTime);
    audioRef.current.addEventListener('loadedmetadata', updateDuration);
    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      audioRef.current.removeEventListener('timeupdate', updateTime);
      audioRef.current.removeEventListener('loadedmetadata', updateDuration);
      audioRef.current.removeEventListener('ended', handleEnded);
    };
  }, []);

  const playSong = (song, songList = [], index = 0) => {
    if (audioRef.current) {
      audioRef.current.src = song.audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
      setCurrentSong(song);
      
      if (songList.length > 0) {
        setQueue(songList);
        setCurrentIndex(index);
      }
    }
  };

  const togglePlay = () => {
    if (!currentSong) return;

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    if (queue.length > 0) {
      const nextIndex = (currentIndex + 1) % queue.length;
      const nextSong = queue[nextIndex];
      playSong(nextSong, queue, nextIndex);
    }
  };

  const playPrevious = () => {
    if (queue.length > 0) {
      const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
      const prevSong = queue[prevIndex];
      playSong(prevSong, queue, prevIndex);
    }
  };

  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolumeLevel = (level) => {
    if (audioRef.current) {
      audioRef.current.volume = level;
      setVolume(level);
    }
  };

  const value = {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    queue,
    playSong,
    togglePlay,
    playNext,
    playPrevious,
    seekTo,
    setVolumeLevel
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
