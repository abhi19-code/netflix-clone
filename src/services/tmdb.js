const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    accept: "application/json",
  },
};

export async function getPopularMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/popular?page=${page}`,
    options
  );

  if (!response.ok) {
    throw new Error("Unable to fetch movies");
  }

  return response.json();
}

export async function searchMovies(movieName, page = 1) {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(
      movieName
    )}&page=${page}`,
    options
  );

  if (!response.ok) {
    throw new Error("Unable to search movies");
  }

  return response.json();
}