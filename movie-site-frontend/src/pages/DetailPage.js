import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getTVShowDetails } from "../services/api";

const DetailPage = () => {
  const { mediaType, id } = useParams(); // Get URL parameters
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);

        // Call appropriate function based on media type
        const data =
          mediaType === "movie"
            ? await getMovieDetails(id)
            : await getTVShowDetails(id);

        setMedia(data);
        setError(null);
      } catch (err) {
        setError("Failed to load details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [mediaType, id]); // Re-fetch if URL changes

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;
  if (!media) return <div style={styles.error}>Not found</div>;

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const BACKDROP_URL = "https://image.tmdb.org/t/p/original";

  const title = media.title || media.name;
  const releaseDate = media.release_date || media.first_air_date;
  const posterPath = media.poster_path
    ? `${IMAGE_BASE_URL}${media.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";
  const backdropPath = media.backdrop_path
    ? `${BACKDROP_URL}${media.backdrop_path}`
    : null;

  return (
    <div style={styles.container}>
      {backdropPath && (
        <div
          style={{
            ...styles.backdrop,
            backgroundImage: `url(${backdropPath})`,
          }}
        />
      )}

      <div style={styles.content}>
        <img src={posterPath} alt={title} style={styles.poster} />

        <div style={styles.info}>
          <h1 style={styles.title}>{title}</h1>

          <p style={styles.tagline}>{media.tagline}</p>

          <div style={styles.meta}>
            <span>⭐ {media.vote_average?.toFixed(1)} / 10</span>
            <span>📅 {releaseDate}</span>
            <span>
              ⏱️ {media.runtime || media.episode_run_time?.[0] || "N/A"} min
            </span>
          </div>

          <div style={styles.genres}>
            {media.genres?.map((genre) => (
              <span key={genre.id} style={styles.genre}>
                {genre.name}
              </span>
            ))}
          </div>

          <h3 style={styles.subheading}>Overview</h3>
          <p style={styles.overview}>{media.overview}</p>

          {media.credits?.cast && (
            <>
              <h3 style={styles.subheading}>Cast</h3>
              <div style={styles.cast}>
                {media.credits.cast.slice(0, 10).map((person) => (
                  <div key={person.id} style={styles.castMember}>
                    {person.profile_path ? (
                      <img
                        src={`${IMAGE_BASE_URL}${person.profile_path}`}
                        alt={person.name}
                        style={styles.castImage}
                      />
                    ) : (
                      <div style={styles.castPlaceholder}>👤</div>
                    )}
                    <p style={styles.castName}>{person.name}</p>
                    <p style={styles.castCharacter}>{person.character}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    color: "#fff",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "400px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.3,
    zIndex: 0,
  },
  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    display: "flex",
    gap: "40px",
  },
  poster: {
    width: "300px",
    height: "450px",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: "36px",
    marginBottom: "10px",
  },
  tagline: {
    fontSize: "18px",
    fontStyle: "italic",
    color: "#999",
    marginBottom: "20px",
  },
  meta: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    fontSize: "16px",
  },
  genres: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  genre: {
    padding: "6px 12px",
    backgroundColor: "#e50914",
    borderRadius: "20px",
    fontSize: "14px",
  },
  subheading: {
    fontSize: "24px",
    marginBottom: "15px",
  },
  overview: {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "30px",
  },
  cast: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "20px",
  },
  castMember: {
    textAlign: "center",
  },
  castImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "8px",
  },
  castPlaceholder: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
    margin: "0 auto 8px",
  },
  castName: {
    fontSize: "14px",
    fontWeight: "bold",
    margin: "4px 0",
  },
  castCharacter: {
    fontSize: "12px",
    color: "#999",
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

export default DetailPage;
