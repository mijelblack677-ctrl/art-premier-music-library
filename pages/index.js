import Layout from '../components/Layout';
import MusicGrid from '../components/MusicGrid';
import { musicLibrary } from '../data/music-library';

export default function Home() {
  const featuredSongs = musicLibrary.songs.slice(0, 6);
  const playlists = musicLibrary.playlists;

  return (
    <Layout>
      <div className="home-page">
        {/* Hero Banner */}
        <div className="hero-banner">
          <div className="hero-content">
            <h1>Welcome to MusicTube</h1>
            <p>Discover amazing music from talented artists worldwide</p>
          </div>
        </div>

        {/* Featured Playlists */}
        <section className="section">
          <h2 className="section-title">Featured Playlists</h2>
          <div className="playlists-grid">
            {playlists.map(playlist => (
              <div key={playlist.id} className="playlist-card">
                <img src={playlist.thumbnail} alt={playlist.title} />
                <div className="playlist-info">
                  <h3>{playlist.title}</h3>
                  <p>{playlist.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Songs */}
        <section className="section">
          <h2 className="section-title">Popular Right Now</h2>
          <MusicGrid songs={featuredSongs} />
        </section>

        {/* Artists Section */}
        <section className="section">
          <h2 className="section-title">Featured Artists</h2>
          <div className="artists-grid">
            {musicLibrary.artists.map(artist => (
              <div key={artist.id} className="artist-card">
                <img src={artist.avatar} alt={artist.name} />
                <div className="artist-info">
                  <h3>{artist.name}</h3>
                  <p>{artist.bio}</p>
                  <div className="artist-stats">
                    <span>{artist.subscribers} subscribers</span>
                    {artist.verified && <span className="verified">✓</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .home-page {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .hero-banner {
          background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
          border-radius: 12px;
          padding: 60px 40px;
          margin-bottom: 40px;
          text-align: center;
        }
        
        .hero-content h1 {
          font-size: 48px;
          margin-bottom: 16px;
          font-weight: bold;
        }
        
        .hero-content p {
          font-size: 18px;
          color: rgba(255,255,255,0.9);
        }
        
        .section {
          margin-bottom: 40px;
        }
        
        .section-title {
          font-size: 24px;
          margin-bottom: 20px;
          font-weight: bold;
        }
        
        .playlists-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        
        .playlist-card {
          background: #181818;
          border-radius: 8px;
          padding: 16px;
          transition: background 0.3s;
          cursor: pointer;
        }
        
        .playlist-card:hover {
          background: #272727;
        }
        
        .playlist-card img {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 4px;
          margin-bottom: 12px;
        }
        
        .playlist-card h3 {
          font-size: 16px;
          margin-bottom: 8px;
        }
        
        .playlist-card p {
          color: #aaa;
          font-size: 14px;
        }
        
        .artists-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        
        .artist-card {
          background: #181818;
          border-radius: 8px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: background 0.3s;
          cursor: pointer;
        }
        
        .artist-card:hover {
          background: #272727;
        }
        
        .artist-card img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
        
        .artist-info h3 {
          font-size: 18px;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .artist-info p {
          color: #aaa;
          font-size: 14px;
          margin-bottom: 8px;
        }
        
        .artist-stats {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #aaa;
        }
        
        .verified {
          color: #3ea6ff;
          font-weight: bold;
        }
      `}</style>
    </Layout>
  );
}
