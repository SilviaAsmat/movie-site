import React from 'react';
import { Link } from 'react-router-dom';

const MediaCard = ({ media, mediaType }) => {
  // TMDb image base URL - this is where all poster images are hosted
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  
  // Some movies/shows don't have posters
  const posterPath = media.poster_path 
    ? `${IMAGE_BASE_URL}${media.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Image';
  
  // TV shows use 'name', movies use 'title'
  const title = media.title || media.name;
  
  // Format release date nicely
  const releaseDate = media.release_date || media.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  
  return (
    <Link 
      to={`/${mediaType}/${media.id}`} 
      className="media-card"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div style={styles.card}>
        <img 
          src={posterPath} 
          alt={title}
          style={styles.poster}
        />
        <div style={styles.info}>
          <h3 style={styles.title}>{title}</h3>
          <p style={styles.year}>{year}</p>
          <div style={styles.rating}>
            ⭐ {media.vote_average ? media.vote_average.toFixed(1) : 'N/A'}
          </div>
        </div>
      </div>
    </Link>
  );
};

// Inline styles for simplicity (you can move to CSS later)
const styles = {
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  poster: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
  },
  info: {
    padding: '12px',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  year: {
    margin: '0 0 8px 0',
    fontSize: '14px',
    color: '#999',
  },
  rating: {
    fontSize: '14px',
    color: '#ffd700',
  }
};

export default MediaCard;