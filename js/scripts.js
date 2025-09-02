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


function toggleShow(name) {
  let btns = document.querySelectorAll(`#${name}-btn`);
  let q = document.querySelectorAll(`#${name}`);
  q.forEach(e => {
    e.classList.toggle('md:hidden')
  })
  btns.forEach(b => {
    b.classList.toggle('hidden')
  })
}

function toggleList() {

  let btn = document.getElementById(`nav-toggle`);
  let list = document.getElementById(`nav-list`);

  btn.classList.toggle('bi-x-lg')

  if (list.classList.contains('max-lg:translate-y-0')) {
    list.classList.remove('max-lg:translate-y-0')
  } else {
    list.classList.add('max-lg:translate-y-0')
  }

}