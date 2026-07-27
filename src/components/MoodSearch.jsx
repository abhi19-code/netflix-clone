import { useState } from "react";
import { getMovieRecommendation } from "../services/gemini";

function MoodSearch({ onMovieFound }) {
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (mood.trim() === "") {
      alert("Please enter your mood.");
      return;
    }

    try {
      setLoading(true);

      const movieTitle = await getMovieRecommendation(mood);

      console.log("Gemini returned:", movieTitle);

      onMovieFound(movieTitle);

      setMood("");
    } catch (error) {
      console.error(error);
      alert("Unable to get AI recommendation.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mood-box">
      <h2>AI Mood Search</h2>

      <p className="mood-text">Describe the movie you want to watch.</p>

      <textarea
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        placeholder="Example: Funny action movie"
      />

      <button onClick={handleSearch}>Find Movie</button>

      {loading && <p>Thinking...</p>}
    </div>
  );
}

export default MoodSearch;
