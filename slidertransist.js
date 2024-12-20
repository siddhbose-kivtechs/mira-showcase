// Function to dynamically generate slides
function generateSlides(slides) {
  const sliderWrapper = document.getElementById("slider-wrapper");

  slides.forEach((slide, index) => {
    const slideElement = document.createElement("div");
    slideElement.classList.add("swiper-slide");

    let content = '';
    if (slide.type === "image") {
      content = `
        <div class="slider-inner" data-swiper-parallax="100">
          <img src="${slide.src}" alt="${slide.alt}">
          <div class="swiper-content" data-swiper-parallax="2000">
            <div class="title-area">
              <p class="tag">${slide.tag || ''}</p>
              <a href="#" class="title">${slide.title}</a>
            </div>
            <p class="disc">${slide.description || ''}</p>
            <div class="creative-btn--wrap">
              <a class="creative-slide--btn" role="button" href="#0">
                <div class="creative-btn--circle">
                  <div class="circle">
                    <div class="circle-fill"></div>
                    <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" class="circle-outline">
                      <circle cx="25" cy="25" r="23"></circle>
                    </svg>
                    <div class="circle-icon">
                      <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-arrow">
                        <path d="M0 5.65612V4.30388L8.41874 4.31842L5.05997 0.95965L5.99054 0L10.9923 4.97273L6.00508 9.96L5.07451 9.00035L8.43328 5.64158L0 5.65612Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="creative-btn--label">
                  <div class="creative-btn__text">${slide.buttonText}</div>
                  <div class="creative-btn__border"></div>
                </div>
              </a>
            </div>
          </div>
        </div>
      `;
    } else if (slide.type === "video") {
      content = `
        <div class="slider-inner" data-swiper-parallax="100">
          <video autoplay loop muted>
            <source src="${slide.src}" type="video/mp4">
          </video>
          <div class="swiper-content" data-swiper-parallax="2000">
            <div class="title-area">
              <a href="#" class="title">${slide.title}</a>
            </div>
            <p class="disc">${slide.description || ''}</p>
            <div class="creative-btn--wrap">
              <a class="creative-slide--btn" role="button" href="#0">
                <div class="creative-btn--circle">
                  <div class="circle">
                    <div class="circle-fill"></div>
                    <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" class="circle-outline">
                      <circle cx="25" cy="25" r="23"></circle>
                    </svg>
                    <div class="circle-icon">
                      <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-arrow">
                        <path d="M0 5.65612V4.30388L8.41874 4.31842L5.05997 0.95965L5.99054 0L10.9923 4.97273L6.00508 9.96L5.07451 9.00035L8.43328 5.64158L0 5.65612Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="creative-btn--label">
                  <div class="creative-btn__text">${slide.buttonText}</div>
                  <div class="creative-btn__border"></div>
                </div>
              </a>
            </div>
          </div>
        </div>
      `;
    }

    slideElement.innerHTML = content;
    sliderWrapper.appendChild(slideElement);
  });
}

// Function to update pagination range dynamically
function updatePagination(slides) {
  const sliderPaginationArea = document.querySelector(".slider-pagination-area");

  if (!sliderPaginationArea) return; // Exit if pagination area is missing

  const totalSlides = slides.length;

  // Update the range dynamically
  sliderPaginationArea.innerHTML = `
    <h5 class="slide-range one">01</h5>
    <div class="swiper-pagination swiper-pagination-progressbar swiper-pagination-horizontal"></div>
    <h5 class="slide-range three">${totalSlides.toString().padStart(2, "0")}</h5>
  `;
}

// Function to dynamically update the current slide number
function updateCurrentSlideNumber(swiper) {
  const currentSlideElement = document.querySelector(".slide-range.one");
  if (currentSlideElement) {
    const currentSlide = swiper.realIndex + 1; // Swiper's realIndex starts at 0
    currentSlideElement.textContent = currentSlide.toString().padStart(2, "0");
  }
}

// Initialize Swiper
function initializeSlider(slides) {
  generateSlides(slides);
  updatePagination(slides);

  const swiper = new Swiper('.swiper-container-h', {
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      slideChange: function () {
        updateCurrentSlideNumber(this);
      },
    },
  });

  // Initial update for the current slide number
  updateCurrentSlideNumber(swiper);
}

// Call the initialization function with the slidesConfig array
initializeSlider(slidesConfig);
