import NewsApiServise from './api-service';
import handlerPagination from './pagination';
import debounce from 'lodash.debounce';
import themeChanger from './theme';

const newsApiServise = new NewsApiServise();
const pagination = document.querySelector('.pagination-thumb');
const movies = document.querySelector('.movies-home');
const spinner = document.querySelector('.sk-circle');
const swicher = document.querySelector('.theme-switch__toggle');
const mainInput = document.querySelector('.header-input');
const allertMovie = document.querySelector('.allert');
const errorImg = document.querySelector('.error_box');
let genre;
let currentPage = 1;
let dataRender = '';
swicher.addEventListener('change', themeChanger);
GenreWriteLocalStorage();

export default function renderTrendMovies(currentPage) {
  spinner.classList.remove('visually-hidden');
  newsApiServise.getTrendMovies(currentPage).then(response => {
    newsApiServise.resetPage();

    const totalResult = response.total_results;
    currentPage = response.page;

    const instance = handlerPagination();
    instance.setItemsPerPage(20);
    instance.setTotalItems(totalResult);

    instance.movePageTo(currentPage);

    instance.on('afterMove', event => {
      newsApiServise.page = event.page;
      currentPage = newsApiServise.page;
      renderTrendMovies(currentPage);
    });

    const markup = response.results
      .map(
        ({
          poster_path,
          original_title,
          release_date,
          genre_ids,
          vote_average,
          id,
           src = poster_path === null
          ? 'https://d2j1wkp1bavyfs.cloudfront.net/legacy/assets/mf-no-poster-available-v2.png'
          : `https://image.tmdb.org/t/p/w500${poster_path}`,
      
        }) => {
           getGenreName(genre_ids);
           dateRelise(release_date);
          return `<div class="movie-card" data-movieId=${id}>
                 <img class="movie-img" src="${src}" alt="card">
            
                 <div class="movie-info">
                     <h2 class="movie-title">${original_title}</h2>
                    <h3 class="span-title">${genre.join(
                      ',  '
                    )} | ${dataRender}</h3>
                     </div>
                 </div>`;
        }
      )
      .join('');
    movies.innerHTML = markup;
    setTimeout(() => {
      spinner.classList.add('visually-hidden');
    }, 500);
  });
}


//dateRelise(undefined)

function dateRelise(relase) {
  if (relase === undefined || relase ==='') {
    dataRender = 'N/A';
  } else {
    dataRender = relase.slice(0, 4);
  }
}

renderTrendMovies(currentPage);

function GenreWriteLocalStorage() {
  newsApiServise.getGenres().then(res => {
    localStorage.setItem('genresArray', JSON.stringify(res));
  });
}

function getGenreName(genre_ids) {
  genre = [];
  genre_ids.forEach(id => {
    JSON.parse(localStorage.getItem('genresArray')).forEach(elem => {
      if (id === elem.id) {
        genre.push(elem.name);
      }
    });
  });
  if (genre.length === 2 || genre.length === 1) {
    genre;
  }
  if (genre.length >= 3) {
    genre.splice(2, 3, 'Other');
  }
  if (genre.length === 0) {
    genre.push('N/A');
  }
}

function searchOurMovie(currentPage) {
  const ourMovie = mainInput.value;
  if (ourMovie === '') {
    errorImg.classList.add('visually-hidden');
    allertMovie.classList.add('visually-hidden');
    pagination.classList.remove('visually-hidden');
    return renderTrendMovies(currentPage);
  }

  spinner.classList.remove('visually-hidden');
  newsApiServise
    .searchMovie(ourMovie)
    .then(resp => {
      newsApiServise.resetPage();
      renderSearchMovie(resp);
      setTimeout(() => {
        spinner.classList.add('visually-hidden');
      }, 500);
      const totalResult = resp.total_results;
      currentPage = resp.page;

      const instance = handlerPagination();

      instance.setItemsPerPage(20);
      instance.setTotalItems(totalResult);
      instance.movePageTo(currentPage);
      instance.on('afterMove', event => {
        newsApiServise.page = event.page;
        currentPage = newsApiServise.page;

        searchOurMovie(currentPage);
      });
    })
    .catch(error => error);
}


function renderSearchMovie(resp) {
  const newMarkup = resp.results
    .map(
      ({
        poster_path,
        original_title,
        release_date,
        genre_ids,
        id,
        src = poster_path === null
          ? 'https://d2j1wkp1bavyfs.cloudfront.net/legacy/assets/mf-no-poster-available-v2.png'
          : `https://image.tmdb.org/t/p/w500${poster_path}`,
      }) => {
        getGenreName(genre_ids);

        dateRelise(release_date);

        return `<div class="movie-card" data-movieId=${id}>
                 <img class="movie-img" src="${src}" alt="card">
            
                 <div class="movie-info">
                     <h2 class="movie-title">${original_title}</h2>
                    <h3 class="span-title">${genre.join(
                      ',  '
                    )} |  ${dataRender}</h3>
                     </div>
                 </div>`;
      }
    )
    .join('');

  movies.innerHTML = newMarkup;
  if (resp.results.length === 0) {
    allertMovie.classList.remove('visually-hidden');
    pagination.classList.add('visually-hidden');
    errorImg.classList.remove('visually-hidden');
  } else {
    allertMovie.classList.add('visually-hidden');
    pagination.classList.remove('visually-hidden');
    errorImg.classList.add('visually-hidden');
  }
}

mainInput.addEventListener('input', debounce(searchOurMovie, 600));
