const API_KEY = '989c90c59500ad26e3fa4e26d53d2bd3';
const BASE_URL = 'https://api.themoviedb.org/3';
// const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query="&page=1`;
// const TREND_URL = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=1`;
// const MOVIE_URL = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;

export default class ApiService {
  constructor() {
    this.totalPages;
    this.totalResults;

    this.url = '';
    this.searchQuery = '';
    this.page = 1;

    this.searchMovies = `${BASE_URL}/search/movie`;
    this.trendMovies = `${BASE_URL}/trending/movie/day`;
    // this.movie = `${BASE_URL}/movie/${movieId}`;
  }

  async fetch(searchQuery) {
    if (searchQuery && searchQuery !== '') {
      this.url = `${this.searchMovies}?api_key=${API_KEY}&query=${this.searchQuery}&page=${this.page}`;
    } else {
      this.url = `${this.trendMovies}?api_key=${API_KEY}&page=${this.page}`;
    }

    try {
      const response = await fetch(this.url);
      const data = await response.json(); // Получаем объект c полем results: [{}, {}, ..., {}]

      //   const movieIdArr = await data.results.map(el => el.id); // Спросить за ключевое слово

      this.totalPages = data.total_pages;
      this.totalResults = data.total_results;

      this.page = data.page;

      this.url = '';

      return data.results;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchMovieById(movieId) {
    this.url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`; // Получаем объект movie

    try {
      const response = await fetch(this.url);
      const movie = await response.json();

      this.url = '';

      return movie;
    } catch (error) {
      console.log(error);
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get results() {
    return this.totalResults;
  }

  get pageNum() {
    return this.page;
  }

  set pageNum(newPage) {
    this.page = newPage;
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }
}