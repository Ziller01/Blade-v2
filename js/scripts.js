AOS.init();

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
                  <li class="w-[70vw] flex-none md:w-full rounded-2xl border border-brand-border hover:border-brand-primary/50 shadow-brand-primary/40 hover:shadow-all-sm duration-100 ">
                      <video class="w-full rounded-2xl lazy-video" crossorigin="anonymous" controls>
                          <source src="${link}" type="video/mp4" />
                          Your browser does not support the video tag.
                      </video>
                  </li>
              `
  }).join('')}
      </ul>
  `
  solveVideoImg()
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
  reviewsData.forEach(review => { reviews.innerHTML += `<img src='${review}' alt='review' class="w-full object-cover rounded-lg" />` })

  //? >>======================================================<<

})

function solveVideoImg() {
  const videos = document.querySelectorAll("video");
  videos.forEach(video => {
    video.addEventListener("loadeddata", function () {
      video.currentTime = 0.2;
      video.addEventListener("seeked", function () {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataURL = canvas.toDataURL("image/jpeg");
        video.poster = imageDataURL;        
      }, { once: true }); // Use { once: true } to remove the listener after it runs once
    });
  })
}

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