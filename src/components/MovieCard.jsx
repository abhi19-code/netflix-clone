function MovieCard({ movie, favorites, toggleFavorite }) {
  const image = movie.poster_path
    ? import.meta.env.VITE_IMAGE_URL + movie.poster_path
    : "https://via.placeholder.com/500x750?text=No+Image";

  const isFavorite = favorites.some(
    (item) => item.id === movie.id
  );

  return (
    <div className="card">
      <img
        src={image}
        alt={movie.title}
      />

      <div className="card-info">
        <h3>{movie.title}</h3>

        <p>⭐ {movie.vote_average.toFixed(1)}</p>

        <p>{movie.release_date?.slice(0, 4) || "N/A"}</p>

        <button
          className="favorite-btn"
          onClick={() => toggleFavorite(movie)}
        >
          {isFavorite ? "❤️ Remove" : "🤍 Favorite"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;