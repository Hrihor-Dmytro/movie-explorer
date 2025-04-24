import React, { useState } from 'react';
import { fetchMovies } from '../lib/omdb';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    const movies = await fetchMovies(query);
    setResults(movies);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎬 Movie Explorer</h1>
      <input
        type="text"
        className="border p-2 w-full rounded"
        placeholder="Название фильма..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleSearch}
      >
        Найти
      </button>

      <ul className="mt-6 space-y-4">
        {results.map((movie) => (
          <li key={movie.imdbID} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{movie.Title}</h2>
            <p>{movie.Year}</p>
            {movie.Poster !== 'N/A' && (
              <img src={movie.Poster} alt={movie.Title} className="mt-2 w-32" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
