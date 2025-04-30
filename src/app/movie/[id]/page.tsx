'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchMovieById } from '../../../lib/omdb';

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const loadMovie = async () => {
      if (typeof id === 'string') {
        const data = await fetchMovieById(id);
        setMovie(data);
        console.log('Movie data:', data);
      }
    };
    loadMovie();
  }, [id]);

  if (!movie) return <p className="p-4">Загрузка...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
      <p><strong>Год:</strong> {movie.Year}</p>
      <p><strong>Жанр:</strong> {movie.Genre}</p>
      <p><strong>Режиссёр:</strong> {movie.Director}</p>
      <p><strong>Актёры:</strong> {movie.Actors}</p>
      <p className="mt-2">{movie.Plot}</p>
      {movie.Poster !== 'N/A' && (
        <img src={movie.Poster} alt={movie.Title} className="mt-4 w-64" />
      )}
    </div>
  );
}