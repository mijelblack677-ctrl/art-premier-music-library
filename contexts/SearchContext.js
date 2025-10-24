import { createContext, useContext, useState, useMemo } from 'react';
import { musicLibrary } from '../data/music-library';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const searchMusic = (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    const lowerQuery = query.toLowerCase();
    
    const songs = musicLibrary.songs.filter(song => 
      song.title.toLowerCase().includes(lowerQuery) ||
      song.artist.toLowerCase().includes(lowerQuery) ||
      song.album.toLowerCase().includes(lowerQuery) ||
      song.genre.toLowerCase().includes(lowerQuery)
    );

    const artists = musicLibrary.artists.filter(artist =>
      artist.name.toLowerCase().includes(lowerQuery) ||
      artist.bio.toLowerCase().includes(lowerQuery)
    );

    const playlists = musicLibrary.playlists.filter(playlist =>
      playlist.title.toLowerCase().includes(lowerQuery) ||
      playlist.description.toLowerCase().includes(lowerQuery)
    );

    setSearchResults({
      songs,
      artists,
      playlists,
      query
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
  };

  const value = {
    searchQuery,
    setSearchQuery,
    searchResults,
    searchMusic,
    clearSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
