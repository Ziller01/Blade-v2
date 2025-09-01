const htmlElement = document.documentElement;

function toggleDarkMode() {
  if (htmlElement.classList.contains('dark')) {
    htmlElement.classList.remove('dark');
    // localStorage.theme = 'light';
  } else {
    htmlElement.classList.add('dark');
    // localStorage.theme = 'dark';
  }
}