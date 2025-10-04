import React, { useState } from "react";
import { Link } from "react-router-dom";

const MediaCard = ({ media, mediaType }) => {
  const [isHovered, setIsHovered] = useState(false);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const posterPath = media.poster_path
    ? `${IMAGE_BASE_URL}${media.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const title = media.title || media.name;
  const releaseDate = media.release_date || media.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";

  return (
    <Link
      to={`/${mediaType}/${media.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          ...styles.card,
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: isHovered
            ? "0 8px 16px rgba(229, 9, 20, 0.4)"
            : "0 4px 6px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={styles.posterContainer}>
          <img src={posterPath} alt={title} style={styles.poster} />
          {isHovered && (
            <div style={styles.overlay}>
              <div style={styles.overlayContent}>
                <p style={styles.overlayTitle}>{title}</p>
                <p style={styles.overlayYear}>{year}</p>
                <div style={styles.overlayRating}>
                  ⭐{" "}
                  {media.vote_average ? media.vote_average.toFixed(1) : "N/A"}
                </div>
                <p style={styles.overlayText}>Click for details</p>
              </div>
            </div>
          )}
        </div>

        <div style={styles.info}>
          <h3 style={styles.title}>{title}</h3>
          <div style={styles.bottomRow}>
            <span style={styles.year}>{year}</span>
            <span style={styles.rating}>
              ⭐ {media.vote_average ? media.vote_average.toFixed(1) : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const styles = {
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: "8px",
    overflow: "hidden",
    transition: "all 0.3s ease",
    cursor: "pointer",
    border: "1px solid #2a2a2a",
  },
  posterContainer: {
    position: "relative",
    width: "100%",
    paddingBottom: "150%", // 2:3 aspect ratio for movie posters
    overflow: "hidden",
  },
  poster: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px",
    animation: "fadeIn 0.3s ease",
  },
  overlayContent: {
    textAlign: "center",
  },
  overlayTitle: {
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  overlayYear: {
    color: "#999",
    fontSize: "14px",
    marginBottom: "8px",
  },
  overlayRating: {
    color: "#ffd700",
    fontSize: "18px",
    marginBottom: "12px",
  },
  overlayText: {
    color: "#e50914",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  info: {
    padding: "12px",
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#fff",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  year: {
    fontSize: "12px",
    color: "#999",
  },
  rating: {
    fontSize: "12px",
    color: "#ffd700",
  },
};

export default MediaCard;
