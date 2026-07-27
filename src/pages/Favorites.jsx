import { useState } from "react";
import { Link } from "react-router-dom";

import "../App.css";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  function toggleFavorite(movie) {
    const updatedFavorites = favorites.filter(
      (item) => item.id !== movie.id
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  }

  return (
    <div className="app">
      <h1 className="title">Favorite Movies</h1>

      <Link to="/" className="nav-button">
        ← Back to Home
      </Link>

      {favorites.length === 0 ? (
        <h2 className="loading">
          No favorite movies yet.
        </h2>
      ) : (
        <div className="movies">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;