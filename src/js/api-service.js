import Axios from 'axios';
const key = '125725f49ad2ae69609a1a5a9c4211d9';
const url = `https://api.themoviedb.org/3/`;
export default class NewsApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.allGenres = [];
  }
  async getTrendMovies() {
    return await Axios.get(
      `${url}trending/movie/day?api_key=${key}&query=movie&page=${this.page}`
    ).then(response => {
      //this.incrementPage();

      window.scrollTo(0, 0);
      //console.log(response.data);

      return response.data;
    });
  }

  getGenres() {
    return Axios.get(
      `${url}genre/movie/list?api_key=${key}&language=en-US`
    ).then(response => {
      return response.data.genres;
    });
  }

  async getSearchMovie() {
    return await Axios.get(
      `${url}search/movie?api_key=${key}&query=${this.searchQuery}&page=${this.page}&include_adult=false`
    ).then(response => {
      console.log(response.data);
      return response.data;
    });
  }
  async getMovieInfo(currentMovieId) {
    return await Axios.get(
      `${url}movie/${currentMovieId}?api_key=${key}&query=${this.searchQuery}&page=${this.page}&include_adult=false`
    ).then(response => {
      //console.log(response.data);
      return response.data;
    });
  }
  async searchMovie(movie) {
    return await Axios.get(
      `${url}search/movie?api_key=${key}&query=${movie}&page=${this.page}`
    ).then(response => {
      window.scrollTo(0, 0);
      return response.data;
    });
  }

  // async getAllGenres() {
  //   return await Axios.get(
  //     `${url}genre/movie/list?api_key=${key}&language=en-US`
  //   ).then(response => {
  //     console.log(response.data);
  //     this.allGenres.push(...response.data.genres);
  //     console.log(this.allGenres);
  //   });
  // }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get per_Page() {
    return this.per_page;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
