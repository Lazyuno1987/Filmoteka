// Close Esc and click TEAM modal

import { refs, closeTeamModal, teamModalClassEdit } from './modal-team';

const teamModal = document.querySelector('.our__team-modal');

refs.modal.addEventListener('click', closeTeamModal);
teamModal.addEventListener('click', clickOnModal);
document.addEventListener('keydown', onEscTeamModal);

function onEscTeamModal(e) {
  if (e.key !== 'Escape') {
    return;
  }
  e.preventDefault();
  teamModalClassEdit();
}

// Close Esc and click MOVIE modal

import { backdrop, onCloseModal } from './modal';
const modalMovie = document.querySelector('.modal');
backdrop.addEventListener('click', onCloseClick);
modalMovie.addEventListener('click', clickOnModal);
document.addEventListener('keydown', onEsc);

function clickOnModal(e) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  return false;
}

function onCloseClick(e) {
  e.preventDefault();
  onCloseModal();
}

function onEsc(e) {
  if (e.key !== 'Escape') {
    return;
  }
  e.preventDefault();
  onCloseModal();
}
