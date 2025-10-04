import React, { useState, useEffect } from "react";
import MediaCard from "../components/MediaCard";
import SearchBar from "../components/SearchBar";
import { getPopularMovies, searchMovies } from "../services/api";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Load popular movies on mount
  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      setIsSearching(false);
      const data = await getPopularMovies();
      setMovies(data.results || []);
      setError(null);
    } catch (err) {
      setError("Failed to load movies.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setIsSearching(true);
      const data = await searchMovies(query);
      setMovies(data.results || []);
      setError(null);
    } catch (err) {
      setError("Search failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    fetchPopularMovies();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Movies</h1>

      <div style={styles.searchWrapper}>
        <SearchBar onSearch={handleSearch} placeholder="Search movies..." />
        {isSearching && (
          <button onClick={handleClearSearch} style={styles.clearButton}>
            ← Back to Popular
          </button>
        )}
      </div>

      {loading && (
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Loading...</p>
        </div>
      )}

      {error && <div style={styles.error}>{error}</div>}

      {!loading && (
        <>
          <p style={styles.subtitle}>
            {isSearching
              ? `Search Results (${movies.length})`
              : "Popular Movies"}
          </p>

          {movies.length > 0 ? (
            <div style={styles.grid}>
              {movies.map((movie) => (
                <MediaCard key={movie.id} media={movie} mediaType="movie" />
              ))}
            </div>
          ) : (
            <div style={styles.noResults}>
              <p>No movies found</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
  },
  heading: {
    color: "#fff",
    fontSize: "32px",
    marginBottom: "30px",
    textAlign: "center",
  },
  searchWrapper: {
    marginBottom: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
  },
  clearButton: {
    padding: "8px 20px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
  subtitle: {
    color: "#999",
    fontSize: "18px",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  },
  loading: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#fff",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid #333",
    borderTop: "4px solid #e50914",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 20px",
  },
  error: {
    color: "#e50914",
    textAlign: "center",
    padding: "40px",
    fontSize: "18px",
  },
  noResults: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#999",
    fontSize: "18px",
  },
};

export default MoviesPage;
