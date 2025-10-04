import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:mediaType/:id" element={<DetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
