const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;

// Log the API key to check if it's being loaded correctly

export const fetchMovies = async (searchTerm: string, page: number = 1) => {
  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${searchTerm}&page=${page}`);
    const data = await res.json();
    console.log('API response:', data);
    if (data.Response === 'False') {
      throw new Error(data.Error);
    }
    return data.Search || [];
  } catch (error) {
    console.error('Ошибка запроса к API', error);
    throw error;
  }
};

export const fetchMovieById = async (id: string) => {
  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&i=${id}`);
    const data = await res.json();
    if (data.Response === 'False') {
      throw new Error(data.Error);
    }
    return data;
  } catch (error) {
    console.error('Ошибка запроса к API по ID', error);
    throw error;
  }
};
