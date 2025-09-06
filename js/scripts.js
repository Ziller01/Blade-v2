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
  let q = document.querySelectorAll(`#${name}-i`);
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

async function copy(text = "") {
  const currentUrl = window.location.href;
  try {
    await navigator.clipboard.writeText(`${currentUrl}#${text}`);
    alert('#' + text + ' URL Copied to Clipboard.');
  } catch (err) {
    return console.error('Failed to copy URL:', err);
  }
}

// ---------------------------------------------------------------------------------------------------------

let sections = [
  {
    id: "ads",
    name: "Ads",
    links: [
      './media/ads/(1).mp4',
      './media/ads/(2).mp4',
      './media/ads/(3).mp4',
      './media/ads/(4).mp4',
      './media/ads/(5).mp4',
    ]
  },
  {
    id: "fashion",
    name: "Fashion",
    links: [
      './media/fashion/(1).mp4',
      './media/fashion/(2).mp4',
      './media/fashion/(3).mp4',
      './media/fashion/(4).mp4',
      './media/fashion/(5).mp4',
      './media/fashion/(6).mp4',
      './media/fashion/(7).mp4',
      './media/fashion/(8).mp4',
      './media/fashion/(9).mp4',
      './media/fashion/(10).mp4',
    ]
  },
  {
    id: "food",
    name: "Food",
    links: [
      './media/food/(1).mp4',
      './media/food/(2).mp4',
      './media/food/(3).mp4',
      './media/food/(4).mp4',
      './media/food/(5).mp4',
      './media/food/(6).mp4',
    ]
  },
  {
    id: "gym",
    name: "Gym",
    links: [
      './media/gym/(1).mp4',
      './media/gym/(2).mp4',
      './media/gym/(3).mp4',
      './media/gym/(4).mp4',
      './media/gym/(5).mp4',
    ]
  },
  {
    id: "street",
    name: "Street",
    links: [
      './media/street/(1).mp4',
      './media/street/(2).mp4',
      './media/street/(3).mp4',
      './media/street/(4).mp4',
      './media/street/(5).mp4',
      './media/street/(6).mp4',
    ]
  },
]
window.addEventListener('load', () => {
  const main = document.getElementById('main');
  sections.forEach(section => {
    main.innerHTML += `
      <section id="${section.id}" class="w-full p-5 pt-0 scroll-mt-20 container mx-auto relative flex flex-col justify-center items-center gap-5">
        <header class="w-full flex justify-start items-center">
          <h2 onclick="copy('${section.id}')" class="relative font-bold text-2xl lg:text-4xl text-brand-primary tracking-wide text-center uppercase transition-all duration-300 hover:scale-105 cursor-pointer">
            <i class="bi bi-hash text-brand-text-secondary text-3xl font-normal transition-all duration-300"></i>
            ${section.name}
          </h2>
        </header>
        <article class="w-full flex flex-col justify-center items-center">
          <ul class="w-full max-md:flex max-md:overflow-x-scroll grid grid-cols-2 lg:grid-cols-4 gap-5">
            ${section.links.map((link, i) => {
              return `
                <li id="${(i + 1) > 4 && section.id + '-i'}" class="${(i + 1) > 4 && 'md:hidden '} w-[70vw] flex-none md:w-full rounded-lg border border-brand-border hover:border-brand-primary shadow-brand-primary/40 hover:shadow-all-sm hover:scale-105 duration-100 ">
                  <video class="w-full rounded-lg object-cover lazy-video" crossorigin="anonymous" controls poster="./media/shorts_img.png">
                    <source src="${link}" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </li>
              `
    }).join('')}
          </ul>
          <button id="${section.id}-btn" class="cursor-pointer font-light text-center max-md:hidden ${section.links.length < 5 && 'hidden'} rounded-full mt-5 px-3 py-1 text-brand-text-secondary hover:text-brand-text-primary/80 hover:shadow-all-sm shadow-white duration-200" onclick="toggleShow('${section.id}')">Show more</button>
          <button id="${section.id}-btn" class="cursor-pointer font-light text-center max-md:hidden rounded-full mt-5 px-3 py-1 text-brand-text-secondary hover:text-brand-text-primary/80 hover:shadow-all-sm shadow-white duration-200 hidden" onclick="toggleShow('${section.id}')">Show less</button>
        </article>
      </section>
    `
  })
})

// ---------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const lazyVideos = document.querySelectorAll("video.lazy-video");

  const videoObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Find the source element within the video tag
        const videoSource = entry.target.querySelector("source");
        const videoURL = videoSource.getAttribute("data-src");

        if (videoURL) {
          // Set the source and load the video
          videoSource.src = videoURL;
          entry.target.load();
        }

        // Stop observing the video
        observer.unobserve(entry.target);
      }
    });
  });

  // Start observing all videos with the lazy-video class
  lazyVideos.forEach(function (video) {
    videoObserver.observe(video);
  });
});