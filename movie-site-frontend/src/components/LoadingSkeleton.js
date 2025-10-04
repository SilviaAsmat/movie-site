import React from "react";

const LoadingSkeleton = ({ count = 12 }) => {
  // Create array of specified length to map over
  const skeletons = Array.from({ length: count });

  return (
    <div style={styles.grid}>
      {skeletons.map((_, index) => (
        <div key={index} style={styles.card}>
          <div style={styles.poster}></div>
          <div style={styles.info}>
            <div style={styles.title}></div>
            <div style={styles.meta}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #2a2a2a",
  },
  poster: {
    width: "100%",
    paddingBottom: "150%",
    backgroundColor: "#2a2a2a",
    animation: "pulse 1.5s ease-in-out infinite",
  },
  info: {
    padding: "12px",
  },
  title: {
    height: "16px",
    backgroundColor: "#2a2a2a",
    borderRadius: "4px",
    marginBottom: "8px",
    animation: "pulse 1.5s ease-in-out infinite",
  },
  meta: {
    height: "12px",
    width: "60%",
    backgroundColor: "#2a2a2a",
    borderRadius: "4px",
    animation: "pulse 1.5s ease-in-out infinite",
  },
};

export default LoadingSkeleton;
