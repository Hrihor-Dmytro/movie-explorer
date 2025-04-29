'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { fetchMovieById } from '../../lib/omdb';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const pathname = usePathname();

  const removeFromFavorites = (id: string) => {
    const updated = favorites.filter((favId) => favId !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
    setMovies((prev) => prev.filter((movie) => movie.imdbID !== id));
  };

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">⭐ Избранные фильмы</h1>
        <div className="flex gap-4 items-center">
          <Link
            href="/"
            className={`hover:underline ${pathname === '/' ? 'font-bold underline' : 'text-blue-500'}`}
          >
            Главная
          </Link>
          <Link
            href="/favorites"
            className={`hover:underline ${pathname === '/favorites' ? 'font-bold underline' : 'text-blue-500'}`}
          >
            Избранные ⭐
          </Link>
        </div>
      </div>

      <ul className="space-y-4">
        {movies.map((movie) => (
          <li key={movie.imdbID} className="border p-4 rounded">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{movie.Title}</h2>
              <p>{movie.Year}</p>
            </div>
            <button
              onClick={() => removeFromFavorites(movie.imdbID)}
              className="ml-4 px-2 py-1 bg-red-600 text-white rounded"
            >
              Удалить
            </button>
          </div>
          {movie.Poster !== 'N/A' && (
            <img src={movie.Poster} alt={movie.Title} className="mt-2 w-32" />
          )}
        </li>
        ))}
      </ul>
    </div>
  );
}