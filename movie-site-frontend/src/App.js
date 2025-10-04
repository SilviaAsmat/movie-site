import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import TVShowsPage from "./pages/TVShowsPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tv" element={<TVShowsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/:mediaType/:id" element={<DetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
