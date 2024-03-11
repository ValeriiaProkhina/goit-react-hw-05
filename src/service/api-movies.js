import axios from "axios";
// const API_KEY = "b4e150b9d9ef57c9c27a837d6ba9f8e1";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGUxNTBiOWQ5ZWY1N2M5YzI3YTgzN2Q2YmE5ZjhlMSIsInN1YiI6IjY1ZThhNTNhY2FhYjZkMDE4NTk2OWNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PUKYB7auE3cKct4BM97w8tHgTjP1oX-goBHi90BYhdc";
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${API_TOKEN}`;

export async function getSearchMovies(query, page = 1) {
  const { data } = await axios.get("/search/movie", {
    params: {
      query,
      page,
    },
  });
  return data;
}
export async function getTrendingMovies() {
  const { data } = await axios.get("/trending/movie/day");
  return data;
}
export async function getMovieById(movie_id) {
  const { data } = await axios.get(`/movie/${movie_id}`);
  return data;
}

export async function getMovieCredits(movie_id) {
  const { data } = await axios.get(`/movie/${movie_id}/credits`);
  return data;
}
export async function getReviewsMovie(movie_id) {
  const { data } = await axios.get(`/movie/${movie_id}/reviews`);
  return data;
}
