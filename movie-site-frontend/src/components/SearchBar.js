import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search movies and TV shows..." }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent page reload
    if (query.trim()) {  // Only search if query isn't empty
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        🔍 Search
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    gap: '10px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #333',
    borderRadius: '4px',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    outline: 'none',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#e50914',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  }
};

export default SearchBar;