AOS.init();

// ---------------------------------------------------------------------------------------------------------

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

const main = document.getElementById('main');
const items = document.getElementById('items');

function setVideos() {

  let hash = window.location.hash.slice(1);

  //? >>======================================================> Set Active Btn

  const btns = document.querySelectorAll('#btn');
  btns.forEach(btn => {
    if (btn.attributes.getNamedItem('href').value == `#${sections.find(f => f.id == hash)?.id || sections[0].id}`) {
      btn.classList.add('text-brand-primary')
    } else {
      btn.classList.remove('text-brand-primary')
    }
  })

  //? >>======================================================> Set Videos

  main.innerHTML = ''
  let section = sections.find(f => f.id == hash) || sections[0]
  if (!section) return
  if (!section.links?.[0]) return main.innerHTML = '404 | Videos Not Found!'
  main.innerHTML += `
        <ul class="w-full max-md:flex max-md:overflow-x-scroll grid grid-cols-2 lg:grid-cols-4 gap-5">
            ${section.links.map((link, i) => {
    return `
                    <li class="w-[70vw] flex-none md:w-full rounded-lg border border-brand-border hover:border-brand-primary/50 shadow-brand-primary/40 hover:shadow-all-sm duration-100 ">
                        <video class="w-full rounded-lg lazy-video" crossorigin="anonymous" controls poster="./media/shorts_img.png">
                            <source src="${link}" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </li>
                `
  }).join('')}
        </ul>
    `
  //? >>======================================================<<
}

window.addEventListener('hashchange', () => { setVideos() })
window.addEventListener('load', () => {

  //? >>======================================================> Load Section Items

  sections.map((m, i) => { items.innerHTML += `<a id='btn' data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" data-aos-delay="${(i + 1) * 100}" class="text-center rounded-lg hover:text-brand-primary/70 duration-100" href="#${m.id}">${document.documentElement.lang == 'ar' ? m.name_ar : m.name}</a>` })

  //? >>======================================================> Load Videos

  setVideos()

  //? >>======================================================> Load Reviews

  const reviews = document.getElementById('reviews');
  reviewsData.forEach(review => {
    reviews.innerHTML += `
        <div class="w-full p-6 rounded-lg relative bg-black text-gray-800 dark:text-gray-200">
        <div class="w-full flex flex-col">
        <span class="w-full flex justify-start items-center text-4xl text-brand-primary"><i class="bi bi-quote"></i></span>
        <p class="text-lg md:text-xl font-normal mb-6">${review.review}</p>
        </div>
        <div class="w-full flex items-center mt-4">
        <div class="flex-shrink-0 w-12 h-12 rounded-full mr-4 bg-gray-600 overflow-hidden">
        <img src="${review.autherImage}" class="w-full aspect-square object-cover" />
        </div>
        <div>
        <p class="font-bold">${review.auther}</p>
        <div class="flex justify-center items-center">
        ${[1, 2, 3, 4, 5].map((m, i) => { return `<span class="${(i + 1) <= review.stars ? "text-brand-primary" : "text-gray-400"}">&#9733;</span>` }).join("")}
        </div>
        </div>
        </div>
        </div>
      `
  })

  //? >>======================================================<<

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