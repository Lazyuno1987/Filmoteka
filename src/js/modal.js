import NewsApiServise from './/api-service';
import { renderMovies, renderMoviesQueue } from './render-movies';

const newsApiServise = new NewsApiServise();

let selectedMovieResponse = null;

const moviesContainer = document.querySelector('.movies-home');
const modalContainer = document.querySelector('.modal-conteiner');
export const backdrop = document.querySelector('.backdrop-movie');
const closeBtn = document.querySelector('.modal-close-btn.close');

const root = document.querySelector('#root');
const rootQueue = document.querySelector('#root-queue');

const movieLibrary = document.querySelector('.movies');
movieLibrary.addEventListener('click', onMovieClick);

if (moviesContainer) {
  moviesContainer.addEventListener('click', onMovieClick);
}
closeBtn.addEventListener('click', onCloseModal);

async function onMovieClick(event) {
  const movieCard = event.target.closest('.movie-card');
  const movieId = movieCard.dataset.movieid;

  selectedMovieResponse = await newsApiServise.getMovieInfo(movieId);

  modalContainer.innerHTML = renderMovie();

  openModal();
  const watched = document.querySelector('.card-btn-watched');
  watched.addEventListener('click', onLocalStorageWatched);
  const que = document.querySelector('.card-btn-que');
  que.addEventListener('click', onLocalStorageQue);
}

function renderMovie() {
  const queuedMovies = localStorage.getItem('queuedMovies');
  const queuedMoviesArray = JSON.parse(queuedMovies) || [];
  const isMovieQueued = queuedMoviesArray.some(
    movie => movie.id === selectedMovieResponse.id
  );

  const watchedMovies = localStorage.getItem('watchedMovies');
  const watchedMoviesArray = JSON.parse(watchedMovies) || [];
  const isMovieWatched = watchedMoviesArray.some(
    movie => movie.id === selectedMovieResponse.id
  );

  const markup = `
   <img class="modal-conteiner-img" src="${
     selectedMovieResponse.poster_path
       ? `https://image.tmdb.org/t/p/w500${selectedMovieResponse.poster_path}`
       : 'https://d2j1wkp1bavyfs.cloudfront.net/legacy/assets/mf-no-poster-available-v2.png'
   }" alt="card">
  <div class='card-container'>
          <h2 class='card-title'>${selectedMovieResponse.original_title}</h2>
          <ul class='card-list'>
            <li class='card-item'>
              Vote / Votes
              <p class='card-item-vote'>
                <span class='card-item-average'>${
                  selectedMovieResponse.vote_average
                }</span>/
                <span class='card-item-count'>${
                  selectedMovieResponse.vote_count
                }</span>
              </p>
            </li>
            <li class='card-item'>
              Popularity
              <span class='card-item-popularity'>${
                selectedMovieResponse.popularity
              }</span>
            </li>
            <li class='card-item'>
              Original Title
              <span class='card-item-original-title'>${
                selectedMovieResponse.original_title
              }</span>
            </li>
            <li class='card-item'>
              Genre
              <p class='card-item-genres'>${
                selectedMovieResponse.genres
                  .map(genre => genre.name)
                  .slice(0, 3)
                  .join(', ')
                  ? selectedMovieResponse.genres
                      .map(genre => genre.name)
                      .slice(0, 3)
                      .join(', ')
                  : 'Genre is not defined'
              }
              </p>
            </li>
          </ul>
          <p class='card-description'>About</p>
          <p class='card-text'>${
            selectedMovieResponse.overview
              ? selectedMovieResponse.overview
              : 'Unfortunately, there is no description for this movie'
          }</p>
          <div class='card-list-btn'>
            <button type='button' class='card-btn-watched' data-movieId=${
              selectedMovieResponse.id
            }>${
    isMovieWatched ? 'remove from watched' : 'add to Watched'
  }</button>
            <button type='button' class='card-btn-que' data-movieId=${
              selectedMovieResponse.id
            }>${isMovieQueued ? 'remove from queue' : 'add to queue'}</button>
          </div>
        </div>
      </div>
  `;
  return markup;
}

function openModal() {
  backdrop.classList.add('is-open');
  backdrop.classList.remove('is-hidden');
}

export function onCloseModal() {
  backdrop.classList.remove('is-open');
  backdrop.classList.add('is-hidden');
}

// добавляє фільм при кліку в LocalStrage

const buttonLabelWatchedAdd = 'add to Watched';
const buttonLabelWatchedRemove = 'remove from Watched';

const buttonLabelQueuedAdd = 'add to Queue';
const buttonLabelQueueRemove = 'remove from Queue';

function onLocalStorageWatched(event) {
  const watchedButton = event.target;

  const watchedMovies = localStorage.getItem('watchedMovies');
  const watchedMoviesArray = JSON.parse(watchedMovies) || [];
  if (watchedMoviesArray.some(movie => movie.id === selectedMovieResponse.id)) {
    const movieIndex = watchedMoviesArray.findIndex(
      movie => movie.id === selectedMovieResponse.id
    );

    watchedMoviesArray.splice(movieIndex, 1);
    watchedButton.innerText = buttonLabelWatchedAdd;
  } else {
    watchedMoviesArray.push(selectedMovieResponse);
    watchedButton.innerText = buttonLabelWatchedRemove;
  }
  localStorage.setItem('watchedMovies', JSON.stringify(watchedMoviesArray));
  if (root === null) {
    return;
  } else {
    renderMovies(root);
  }
}

function onLocalStorageQue(event) {
  const queuedButton = event.target;
  const queuedMovies = localStorage.getItem('queuedMovies');
  const queuedMoviesArray = JSON.parse(queuedMovies) || [];
  if (queuedMoviesArray.some(movie => movie.id === selectedMovieResponse.id)) {
    const movieIndex = queuedMoviesArray.findIndex(
      movie => movie.id === selectedMovieResponse.id
    );

    queuedMoviesArray.splice(movieIndex, 1);
    queuedButton.innerText = buttonLabelQueuedAdd;
  } else {
    queuedMoviesArray.push(selectedMovieResponse);
    queuedButton.innerText = buttonLabelQueueRemove;
  }
  localStorage.setItem('queuedMovies', JSON.stringify(queuedMoviesArray));

  if (rootQueue === null) {
    return;
  } else {
    renderMoviesQueue(rootQueue);
  }
}
