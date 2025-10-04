const API_BASE_URL = 'http://localhost:3001/api';

// Generic fetch helper with error handling
const fetchFromAPI = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Movies API calls
export const getPopularMovies = () => {
  return fetchFromAPI('/movies/popular');
};

export const searchMovies = (query) => {
  return fetchFromAPI(`/movies/search?query=${encodeURIComponent(query)}`);
};

export const getMovieDetails = (id) => {
  return fetchFromAPI(`/movies/${id}`);
};

// TV Shows API calls
export const getPopularTVShows = () => {
  return fetchFromAPI('/tv_shows/popular');
};

export const searchTVShows = (query) => {
  return fetchFromAPI(`/tv_shows/search?query=${encodeURIComponent(query)}`);
};

export const getTVShowDetails = (id) => {
  return fetchFromAPI(`/tv_shows/${id}`);
};

// Favorites API calls
export const getFavorites = () => {
  return fetchFromAPI('/favorites');
};

export const addFavorite = async (tmdbId, mediaType, userId = 1) => {
  try {
    const response = await fetch(`${API_BASE_URL}/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        favorite: {
          tmdb_id: tmdbId,
          media_type: mediaType,
          user_id: userId  // TODO: Hardcoded for now, will fix with auth later
        }
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to add favorite');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Add Favorite Error:', error);
    throw error;
  }
};

export const removeFavorite = async (favoriteId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/favorites/${favoriteId}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove favorite');
    }
    
    return true;
  } catch (error) {
    console.error('Remove Favorite Error:', error);
    throw error;
  }
};