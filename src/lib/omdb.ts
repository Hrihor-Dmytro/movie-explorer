export const fetchMovies = async (searchTerm: string) => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${searchTerm}`);
    const data = await res.json();
    return data.Search || [];
  };