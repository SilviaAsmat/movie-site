import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          🎬 MovieDB
        </Link>

        <div style={styles.links}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
          <Link to="/movies" style={styles.link}>
            Movies
          </Link>
          <Link to="/tv" style={styles.link}>
            TV Shows
          </Link>
          <Link to="/search" style={styles.link}>
            Search
          </Link>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: "#141414",
    padding: "1rem 0",
    borderBottom: "2px solid #e50914",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#e50914",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    gap: "2rem",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    transition: "color 0.3s",
  },
};

export default Navbar;
