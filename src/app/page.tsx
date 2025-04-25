
'use client';
import { useEffect, useState } from 'react';
import { fetchMovies } from '../lib/omdb';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [darkMode, setDarkMode] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const loadDefaultMovies = async () => {
      try {
        setLoading(true);
        const movies = await fetchMovies('Avengers');
        setResults(movies);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadDefaultMovies();
  }, []);

  const handleSearch = async () => {
    setError('');
    if (!query) {
      alert("Введите название фильма!");
      return;
    }
    try {
      setLoading(true);
      const movies = await fetchMovies(query, page);
      setResults(movies);
    } catch (err: any) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen p-6`}> 
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">🎬 Movie Explorer</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 border rounded"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        <input
          type="text"
          className="border p-2 w-full rounded text-black"
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

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {loading && <p className="text-gray-500 mt-4 animate-pulse">Загрузка...</p>}

        <ul className="mt-6 space-y-4">
          {results.map((movie) => (
            <li key={movie.imdbID} className="border p-4 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{movie.Title}</h2>
                  <p>{movie.Year}</p>
                </div>
                <button onClick={() => toggleFavorite(movie.imdbID)}>
                  {favorites.includes(movie.imdbID) ? '⭐' : '☆'}
                </button>
              </div>
              {movie.Poster !== 'N/A' && (
                <img src={movie.Poster} alt={movie.Title} className="mt-2 w-32" />
              )}
            </li>
          ))}
        </ul>

        {results.length > 0 && (
          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              ◀ Предыдущая
            </button>
            <button
              className="px-4 py-2 bg-gray-600 text-white rounded"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Следующая ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
