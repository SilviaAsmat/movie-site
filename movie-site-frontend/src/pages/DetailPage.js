import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMovieDetails,
  getTVShowDetails,
  addFavorite,
} from "../services/api";

const DetailPage = () => {
  const { mediaType, id } = useParams();
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);

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
  }, [mediaType, id]);

  const handleAddFavorite = async () => {
    try {
      setFavoriteLoading(true);
      await addFavorite(parseInt(id), mediaType);
      setIsFavorited(true);
      alert("Added to favorites!");
    } catch (err) {
      alert("Failed to add favorite. Please try again.");
      console.error(err);
    } finally {
      setFavoriteLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading details...</p>
      </div>
    );
  }

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

  // Get trailer if available
  const trailer = media.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
    <div style={styles.container}>
      {/* Backdrop */}
      {backdropPath && (
        <div
          style={{
            ...styles.backdrop,
            backgroundImage: `linear-gradient(to bottom, rgba(20,20,20,0.3) 0%, rgba(20,20,20,0.9) 70%, rgba(20,20,20,1) 100%), url(${backdropPath})`,
          }}
        />
      )}

      {/* Back button */}
      <button onClick={() => navigate(-1)} style={styles.backButton}>
        ← Back
      </button>

      {/* Main content */}
      <div style={styles.content}>
        <img src={posterPath} alt={title} style={styles.poster} />

        <div style={styles.info}>
          {/* Title and tagline */}
          <h1 style={styles.title}>{title}</h1>
          {media.tagline && <p style={styles.tagline}>"{media.tagline}"</p>}

          {/* Meta information */}
          <div style={styles.metaContainer}>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Rating</span>
              <span style={styles.metaValue}>
                ⭐ {media.vote_average?.toFixed(1)} / 10
              </span>
            </div>

            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Release</span>
              <span style={styles.metaValue}>
                {new Date(releaseDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Runtime</span>
              <span style={styles.metaValue}>
                {media.runtime || media.episode_run_time?.[0] || "N/A"} min
              </span>
            </div>

            {mediaType === "tv" && media.number_of_seasons && (
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Seasons</span>
                <span style={styles.metaValue}>{media.number_of_seasons}</span>
              </div>
            )}
          </div>

          {/* Genres */}
          <div style={styles.genres}>
            {media.genres?.map((genre) => (
              <span key={genre.id} style={styles.genre}>
                {genre.name}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div style={styles.actions}>
            <button
              onClick={handleAddFavorite}
              disabled={isFavorited || favoriteLoading}
              style={{
                ...styles.favoriteButton,
                ...(isFavorited ? styles.favoritedButton : {}),
              }}
            >
              {favoriteLoading
                ? "..."
                : isFavorited
                ? "✓ Favorited"
                : "♥ Add to Favorites"}
            </button>

            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.trailerButton}
              >
                ▶ Watch Trailer
              </a>
            )}
          </div>

          {/* Overview */}
          <div style={styles.overviewSection}>
            <h3 style={styles.subheading}>Overview</h3>
            <p style={styles.overview}>
              {media.overview || "No overview available."}
            </p>
          </div>

          {/* Additional info */}
          {media.production_companies &&
            media.production_companies.length > 0 && (
              <div style={styles.additionalInfo}>
                <h3 style={styles.subheading}>Production</h3>
                <p style={styles.companies}>
                  {media.production_companies.map((c) => c.name).join(", ")}
                </p>
              </div>
            )}
        </div>
      </div>

      {/* Cast section */}
      {media.credits?.cast && media.credits.cast.length > 0 && (
        <div style={styles.castSection}>
          <h3 style={styles.castHeading}>Cast</h3>
          <div style={styles.castGrid}>
            {media.credits.cast.slice(0, 12).map((person) => (
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
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    color: "#fff",
    paddingBottom: "60px",
  },
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "60vh",
    backgroundSize: "cover",
    backgroundPosition: "center top",
    zIndex: 0,
  },
  backButton: {
    position: "relative",
    zIndex: 2,
    margin: "20px",
    padding: "10px 20px",
    backgroundColor: "rgba(42, 42, 42, 0.9)",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    display: "flex",
    gap: "40px",
    flexWrap: "wrap",
  },
  poster: {
    width: "300px",
    minWidth: "300px",
    height: "450px",
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
  },
  info: {
    flex: 1,
    minWidth: "300px",
  },
  title: {
    fontSize: "42px",
    marginBottom: "10px",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
  },
  tagline: {
    fontSize: "18px",
    fontStyle: "italic",
    color: "#ccc",
    marginBottom: "25px",
  },
  metaContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
    marginBottom: "25px",
    padding: "20px",
    backgroundColor: "rgba(42, 42, 42, 0.6)",
    borderRadius: "8px",
    backdropFilter: "blur(10px)",
  },
  metaItem: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  metaLabel: {
    fontSize: "12px",
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  metaValue: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
  },
  genres: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },
  genre: {
    padding: "8px 16px",
    backgroundColor: "#e50914",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "500",
  },
  actions: {
    display: "flex",
    gap: "15px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  favoriteButton: {
    padding: "12px 30px",
    backgroundColor: "#e50914",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.3s",
  },
  favoritedButton: {
    backgroundColor: "#2a7d2e",
    cursor: "not-allowed",
  },
  trailerButton: {
    display: "inline-block",
    padding: "12px 30px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  overviewSection: {
    marginBottom: "30px",
  },
  subheading: {
    fontSize: "24px",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  overview: {
    fontSize: "16px",
    lineHeight: "1.8",
    color: "#ddd",
  },
  additionalInfo: {
    marginBottom: "20px",
  },
  companies: {
    fontSize: "16px",
    color: "#999",
  },
  castSection: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1200px",
    margin: "40px auto 0",
    padding: "0 20px",
  },
  castHeading: {
    fontSize: "28px",
    marginBottom: "25px",
    fontWeight: "bold",
  },
  castGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: "25px",
  },
  castMember: {
    textAlign: "center",
  },
  castImage: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
    border: "3px solid #333",
  },
  castPlaceholder: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    backgroundColor: "#333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "50px",
    margin: "0 auto 10px",
    border: "3px solid #444",
  },
  castName: {
    fontSize: "14px",
    fontWeight: "bold",
    margin: "5px 0",
  },
  castCharacter: {
    fontSize: "13px",
    color: "#999",
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
};

export default DetailPage;
