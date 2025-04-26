'use client';
import { useEffect, useState } from 'react';
import { fetchMovieById } from '../../lib/omdb';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [movies, setMovies] = useState<any[]>([]);

  const loadFavoriteMovies = async () => {
    try {
      const fetchedMovies = await Promise.all(
        favorites.map(async (id) => {
          const movie = await fetchMovieById(id);
          return movie;
        })
      );
      setMovies(fetchedMovies);
    } catch (error) {
      console.error('Ошибка загрузки избранных фильмов', error);
    }
  };

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    if (favorites.length) {
      loadFavoriteMovies();
    }
  }, [favorites]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">⭐ Избранные фильмы</h1>
      <ul className="space-y-4">
        {movies.map((movie) => (
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