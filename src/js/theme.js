const swicher = document.querySelector('.theme-switch__toggle');
const body = document.querySelector('body');
const theme = {
  light: 'light-theme',
  dark: 'dark-theme',
};

if (!localStorage.getItem('theme')) {
  body.classList.add('light-theme');
  swicher.classList.add('theme-switch__toggle');
  localStorage.setItem('theme', theme.light);
} else {
  body.classList.add(localStorage.getItem('theme'));
}

if (body.classList.contains('dark-theme')) {
  swicher.checked = true;
}

function themeChanger() {
  if (body.classList.contains('dark-theme')) {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
    localStorage.setItem('theme', theme.light);

    //   swicher.classList.add("false");
    //   swicher.classList.remove("true");
  } else {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
    localStorage.setItem('theme', theme.dark);
    //   swicher.classList.add("true");
    //   swicher.classList.remove("false");
  }
}
export default themeChanger;
