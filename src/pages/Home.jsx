import { useEffect, useState } from "react";

import "../App.css";

import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import MoodSearch from "../components/MoodSearch";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

import { getPopularMovies, searchMovies } from "../services/tmdb";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchMovies(1);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setIsSearching(false);
      setPage(1);
      fetchMovies(1);
    } else {
      autoSearch();
    }
  }, [debouncedSearch]);

  useEffect(() => {
    function handleScroll() {
      if (isSearching) return;

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        setPage((prev) => prev + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSearching]);

  useEffect(() => {
    if (page === 1 || isSearching) return;

    fetchMovies(page);
  }, [page]);

  async function fetchMovies(pageNumber = 1) {
    setLoading(true);
    setError("");

    try {
      const data = await getPopularMovies(pageNumber);

      if (pageNumber === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
    } catch (err) {
      setError("Unable to load movies.");
    } finally {
      setLoading(false);
    }
  }

  async function autoSearch() {
    setLoading(true);
    setError("");
    setIsSearching(true);

    try {
      const data = await searchMovies(debouncedSearch);

      setMovies(data.results);
    } catch (err) {
      setError("Unable to search movies.");
    } finally {
      setLoading(false);
    }
  }
async function handleMoodSearch(movieTitle) {
  console.log("Movie from Gemini:", movieTitle);

  setLoading(true);
  setError("");
  setIsSearching(true);

  try {
    const cleanTitle = movieTitle.trim();

    const data = await searchMovies(cleanTitle);

    console.log("TMDB Response:", data);

    setMovies(data.results);
    setSearchText(cleanTitle);
  } catch (err) {
    console.error("TMDB Error:", err);
    setError(err.message || "Unknown Error");
  } finally {
    setLoading(false);
  }
}

  function toggleFavorite(movie) {
    const exists = favorites.some((item) => item.id === movie.id);

    if (exists) {
      setFavorites(favorites.filter((item) => item.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  }

  return (
    <div className="app">
      <h1 className="title">Netflix Movie Explorer</h1>

      <Link to="/favorites" className="nav-button">
        ❤️ Favorites
      </Link>

      <SearchBar searchText={searchText} setSearchText={setSearchText} />

      <MoodSearch onMovieFound={handleMoodSearch} />

      {loading && page === 1 ? (
        <Loader text="Loading Movies..." />
      ) : error ? (
        <h2 className="error">{error}</h2>
      ) : (
        <>
          <div className="movies">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          {loading && page > 1 && <Loader text="Loading More Movies..." />}
        </>
      )}
    </div>
  );
}

export default Home;
