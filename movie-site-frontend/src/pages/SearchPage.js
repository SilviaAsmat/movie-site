import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MediaCard from '../components/MediaCard';
import { searchMovies, searchTVShows } from '../services/api';

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState('movie'); // 'movie' or 'tv'
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      
      // Search based on selected type
      const data = searchType === 'movie' 
        ? await searchMovies(query)
        : await searchTVShows(query);
      
      setResults(data.results || []);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Search Movies & TV Shows</h1>
      
      {/* Search type toggle */}
      <div style={styles.toggleContainer}>
        <button
          style={{
            ...styles.toggleButton,
            ...(searchType === 'movie' ? styles.toggleActive : {})
          }}
          onClick={() => setSearchType('movie')}
        >
          Movies
        </button>
        <button
          style={{
            ...styles.toggleButton,
            ...(searchType === 'tv' ? styles.toggleActive : {})
          }}
          onClick={() => setSearchType('tv')}
        >
          TV Shows
        </button>
      </div>

      {/* Search bar */}
      <div style={styles.searchContainer}>
        <SearchBar 
          onSearch={handleSearch}
          placeholder={`Search ${searchType === 'movie' ? 'movies' : 'TV shows'}...`}
        />
      </div>

      {/* Loading state */}
      {loading && (
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Searching...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div style={styles.error}>{error}</div>
      )}

      {/* Results */}
      {!loading && hasSearched && (
        <>
          <p style={styles.resultCount}>
            Found {results.length} {searchType === 'movie' ? 'movies' : 'TV shows'}
          </p>
          
          {results.length > 0 ? (
            <div style={styles.grid}>
              {results.map((item) => (
                <MediaCard 
                  key={item.id} 
                  media={item} 
                  mediaType={searchType} 
                />
              ))}
            </div>
          ) : (
            <div style={styles.noResults}>
              <p style={styles.noResultsText}>😕 No results found</p>
              <p style={styles.noResultsSubtext}>Try a different search term</p>
            </div>
          )}
        </>
      )}

      {/* Initial state - before search */}
      {!loading && !hasSearched && (
        <div style={styles.initialState}>
          <div style={styles.searchIcon}>🔍</div>
          <p style={styles.initialText}>Start typing to search</p>
          <p style={styles.initialSubtext}>
            Find your favorite {searchType === 'movie' ? 'movies' : 'TV shows'}
          </p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  heading: {
    color: '#fff',
    fontSize: '32px',
    textAlign: 'center',
    marginBottom: '30px',
  },
  toggleContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '30px',
  },
  toggleButton: {
    padding: '10px 30px',
    fontSize: '16px',
    backgroundColor: '#2a2a2a',
    color: '#fff',
    border: '2px solid #444',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontWeight: '500',
  },
  toggleActive: {
    backgroundColor: '#e50914',
    borderColor: '#e50914',
    fontWeight: 'bold',
  },
  searchContainer: {
    marginBottom: '40px',
  },
  loading: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#fff',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid #333',
    borderTop: '4px solid #e50914',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px',
  },
  error: {
    color: '#e50914',
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    backgroundColor: '#2a1a1a',
    borderRadius: '8px',
    margin: '20px 0',
  },
  resultCount: {
    color: '#999',
    fontSize: '16px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  },
  noResults: {
    textAlign: 'center',
    padding: '80px 20px',
  },
  noResultsText: {
    fontSize: '24px',
    color: '#fff',
    marginBottom: '10px',
  },
  noResultsSubtext: {
    fontSize: '16px',
    color: '#999',
  },
  initialState: {
    textAlign: 'center',
    padding: '100px 20px',
  },
  searchIcon: {
    fontSize: '80px',
    marginBottom: '20px',
    opacity: 0.3,
  },
  initialText: {
    fontSize: '24px',
    color: '#fff',
    marginBottom: '10px',
  },
  initialSubtext: {
    fontSize: '16px',
    color: '#999',
  }
};

export default SearchPage;