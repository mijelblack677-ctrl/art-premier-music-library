import { SearchProvider } from '../contexts/SearchContext';
import { MusicProvider } from '../contexts/MusicContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <MusicProvider>
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
    </MusicProvider>
  );
}
