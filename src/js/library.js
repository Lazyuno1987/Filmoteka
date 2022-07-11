import themeChanger from './theme';
import { renderMovies, renderMoviesQueue } from './render-movies';
const root = document.querySelector('#root');

const rootQueue = document.querySelector('#root-queue');
const watched = document.querySelector('.lib-watched-btn');
watched.addEventListener('click', onBtnWatchedShow);
const queue = document.querySelector('.lib-queue-btn');
queue.addEventListener('click', onBtnShowQueue);
const swicher = document.querySelector('.theme-switch__toggle');

let watchedFilms = [];
let queFilms = [];
swicher.addEventListener('change', themeChanger);

function onBtnWatchedShow() {
  onWatchedBtnClick();

  if (
    root.classList.contains('root-height') &&
    rootQueue.classList.contains('root-show')
  ) {
    root.classList.remove('root-height');
    root.classList.add('root-show');
    rootQueue.classList.remove('root-show');
    rootQueue.classList.add('root-height');
  }
}

function onBtnShowQueue() {
  onQueueBtnClick();

  if (
    root.classList.contains('root-show') &&
    rootQueue.classList.contains('root-height')
  ) {
    root.classList.remove('root-show');
    root.classList.add('root-height');
    rootQueue.classList.remove('root-height');
    rootQueue.classList.add('root-show');
  }
}

function onWatchedBtnClick() {
  queue.classList.remove('active');
  watched.classList.add('active');
}

function onQueueBtnClick() {
  watched.classList.remove('active');
  queue.classList.add('active');
}

export default function addWatchedFilmToLocaleStorage(filmData) {
  const btnWatched = document.querySelector('.card-btn-watched');

  const btnQueue = document.querySelector('.card-btn-que');
  btnQueue.addEventListener('click', onBtnQue);

  btnWatched.addEventListener('click', onBtnWatchedClick);

  function onBtnWatchedClick(e) {
    try {
      watchedFilms = [...JSON.parse(localStorage.getItem('watchedMovies'))];
    } catch (error) {
      watchedFilms = [];
    }

    for (const film of watchedFilms) {
      if (filmData.id === film.id) {
        const filteredFilm = watchedFilms.filter(
          film => film.id !== filmData.id
        );
        watchedFilms = [...filteredFilm];

        localStorage.setItem('watched', JSON.stringify(watchedFilms));
        return;
      }
    }
    watchedFilms.push(filmData);
    localStorage.setItem('watched', JSON.stringify(watchedFilms));
  }

  function onBtnQue(e) {
    try {
      queFilms = [...JSON.parse(localStorage.getItem('queuedMovies'))];
    } catch (error) {
      queFilms = [];
    }
    for (const film of queFilms) {
      if (filmData.id === film.id) {
        const filteredFilm = queFilms.filter(film => film.id !== filmData.id);
        queFilms = [...filteredFilm];
        localStorage.setItem('queue', JSON.stringify(queFilms));
        return;
      }
    }
    queFilms.push(filmData);
    localStorage.setItem('queue', JSON.stringify(queFilms));
  }
}

renderMovies(root);
renderMoviesQueue(rootQueue);
