import React, { useState, useEffect } from "react";
import MediaCard from "../components/MediaCard";
import { getPopularMovies, getPopularTVShows } from "../services/api";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch both movies and TV shows in parallel
        const [moviesData, tvData] = await Promise.all([
          getPopularMovies(),
          getPopularTVShows(),
        ]);

        setMovies(moviesData.results || []);
        setTVShows(tvData.results || []);
        setError(null);
      } catch (err) {
        setError("Failed to load content. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty array means this runs once when component mounts

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <section style={styles.section}>
        <h2 style={styles.heading}>Popular Movies</h2>
        <div style={styles.grid}>
          {movies.slice(0, 12).map((movie) => (
            <MediaCard key={movie.id} media={movie} mediaType="movie" />
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>Popular TV Shows</h2>
        <div style={styles.grid}>
          {tvShows.slice(0, 12).map((show) => (
            <MediaCard key={show.id} media={show} mediaType="tv" />
          ))}
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  section: {
    marginBottom: "40px",
  },
  heading: {
    color: "#2826baff",
    fontSize: "24px",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  },
  loading: {
    color: "#fff",
    textAlign: "center",
    padding: "40px",
    fontSize: "20px",
  },
  error: {
    color: "#e50914",
    textAlign: "center",
    padding: "40px",
    fontSize: "18px",
  },
};

export default HomePage;
