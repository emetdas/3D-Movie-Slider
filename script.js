document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("images.json");
    const movies = await response.json();
    const swiperWrapper = document.getElementById("swiper-wrapper");
    movies.forEach((movie) => {
      const Slide = document.createElement("div");
      Slide.classList.add("swiper-slide");
      Slide.innerHTML = `<img src="${movie.url}" alt="${movie.title}" />`;
      swiperWrapper.appendChild(Slide);
    });

    // Initialize Swiper
    const swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      slidesPerView: "auto",
      loop: true,
      centeredSlides: true,
      centeredSlidesBounds: true,
      updateOnWindowResize: true,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.79,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        // dynamicBullets: true,
      },
    });
    // Add click functionality
    swiper.slides.forEach((slide) => {
      slide.onclick = () => {
        swiper.slideToLoop(slide.dataset.swiperSlideIndex);
        swiper.update();
      };
    });
    // Handle issue with the last slide click
    swiper.on("slideChangeTransitionEnd", () => {
      if (swiper.isEnd) {
        swiper.loopFix();
        swiper.update();
      }
    });
  } catch (error) {
    console.error("Error fetching images", error);
  }
});
