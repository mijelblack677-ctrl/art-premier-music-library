import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MusicGrid from '../components/MusicGrid';
import { musicLibrary } from '../data/music-library';

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (q) {
      performSearch(q);
    }
  }, [q]);

  const performSearch = (query) => {
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

    setResults({ songs, artists, playlists });
  };

  if (!q) {
    return (
      <Layout>
        <div className="search-page">
          <div className="no-query">
            <h1>Search Music</h1>
            <p>Enter a search term to find songs, artists, and playlists</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!results) {
    return (
      <Layout>
        <div className="search-page">
          <div className="loading">Searching...</div>
        </div>
      </Layout>
    );
  }

  const { songs, artists, playlists } = results;

  return (
    <Layout>
      <div className="search-page">
        <div className="search-header">
          <h1>Search Results for "{q}"</h1>
          <div className="results-count">
            Found {songs.length} songs, {artists.length} artists, {playlists.length} playlists
          </div>
        </div>

        {/* Top Results */}
        <section className="section">
          <h2 className="section-title">Top Results</h2>
          <div className="top-results">
            {songs.slice(0, 1).map(song => (
              <div key={song.id} className="top-result song-result">
                <img src={song.thumbnail} alt={song.title} />
                <div className="result-details">
                  <h3>{song.title}</h3>
                  <p>Song • {song.artist}</p>
                  <button className="play-btn">Play</button>
                </div>
              </div>
            ))}
            
            {artists.slice(0, 1).map(artist => (
              <div key={artist.id} className="top-result artist-result">
                <img src={artist.avatar} alt={artist.name} />
                <div className="result-details">
                  <h3>{artist.name}</h3>
                  <p>Artist • {artist.subscribers}</p>
                  <button className="follow-btn">Follow</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Songs */}
        {songs.length > 0 && (
          <section className="section">
            <h2 className="section-title">Songs</h2>
            <MusicGrid songs={songs} />
          </section>
        )}

        {/* Artists */}
        {artists.length > 0 && (
          <section className="section">
            <h2 className="section-title">Artists</h2>
            <div className="artists-grid">
              {artists.map(artist => (
                <div key={artist.id} className="artist-card">
                  <img src={artist.avatar} alt={artist.name} />
                  <h3>{artist.name}</h3>
                  <p>{artist.subscribers} subscribers</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Playlists */}
        {playlists.length > 0 && (
          <section className="section">
            <h2 className="section-title">Playlists</h2>
            <div className="playlists-grid">
              {playlists.map(playlist => (
                <div key={playlist.id} className="playlist-card">
                  <img src={playlist.thumbnail} alt={playlist.title} />
                  <h3>{playlist.title}</h3>
                  <p>{playlist.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {songs.length === 0 && artists.length === 0 && playlists.length === 0 && (
          <div className="no-results">
            <h2>No results found for "{q}"</h2>
            <p>Try different keywords or check the spelling</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .search-page {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .search-header {
          margin-bottom: 40px;
        }
        
        .search-header h1 {
          font-size: 32px;
          margin-bottom: 8px;
        }
        
        .results-count {
          color: #aaa;
        }
        
        .top-results {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .top-result {
          background: #181818;
          border-radius: 8px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: background 0.3s;
          cursor: pointer;
        }
        
        .top-result:hover {
          background: #272727;
        }
        
        .top-result img {
          width: 120px;
          height: 120px;
          border-radius: 8px;
        }
        
        .artist-result img {
          border-radius: 50%;
        }
        
        .result-details h3 {
          font-size: 24px;
          margin-bottom: 8px;
        }
        
        .result-details p {
          color: #aaa;
          margin-bottom: 16px;
        }
        
        .play-btn, .follow-btn {
          padding: 8px 24px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          font-weight: bold;
        }
        
        .play-btn {
          background: #1db954;
          color: white;
        }
        
        .follow-btn {
          background: transparent;
          color: white;
          border: 1px solid #aaa;
        }
        
        .artists-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        
        .artist-card {
          text-align: center;
          background: #181818;
          padding: 20px;
          border-radius: 8px;
          transition: background 0.3s;
          cursor: pointer;
        }
        
        .artist-card:hover {
          background: #272727;
        }
        
        .artist-card img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          margin-bottom: 16px;
        }
        
        .artist-card h3 {
          margin-bottom: 8px;
        }
        
        .artist-card p {
          color: #aaa;
        }
        
        .no-query, .loading, .no-results {
          text-align: center;
          padding: 60px 20px;
        }
        
        .no-results h2 {
          margin-bottom: 16px;
        }
      `}</style>
    </Layout>
  );
}
