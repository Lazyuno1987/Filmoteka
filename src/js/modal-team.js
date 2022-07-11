export const refs = {
  openModalBtn: document.querySelector('.footer-link'),
  closeModalBtn: document.querySelector('.close__modal'),
  modal: document.querySelector('[data-modal]'),
};

refs.openModalBtn.addEventListener('click', openTeamModal);
refs.closeModalBtn.addEventListener('click', closeTeamModal);

export function teamModalClassEdit() {
  refs.modal.classList.add('is-hidden');
  refs.modal.classList.remove('is-open');
}

function openTeamModal(e) {
  e.preventDefault();
  refs.modal.classList.add('is-open');
  refs.modal.classList.remove('is-hidden');
}

export function closeTeamModal(e) {
  e.preventDefault();
  teamModalClassEdit();
}

// export function toggleModal(e) {
//   e.preventDefault();
//   refs.modal.classList.toggle('is-hidden');
// }

// refs.openModalBtn.addEventListener('click', toggleModal);
// refs.closeModalBtn.addEventListener('click', toggleModal);
