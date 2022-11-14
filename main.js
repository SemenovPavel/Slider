let images = [
    {
      url: "https://images4.alphacoders.com/697/thumb-1920-697532.jpg",
      title: "Фото 1",
    },
    {
      url: "https://fikiwiki.com/uploads/posts/2022-02/1644870888_16-fikiwiki-com-p-pcheli-krasivie-kartinki-21.jpg",
      title: "Фото 2",
    },
    {
      url: "https://fikiwiki.com/uploads/posts/2022-02/1644870802_10-fikiwiki-com-p-pcheli-krasivie-kartinki-12.jpg",
      title: "Фото 3",
    },
    {
      url: "https://storage.yandexcloud.net/postnews-static/upload/60c38259304b260012e12c99-1920x.jpeg",
      title: "Фото 4",
    },
    {
      url: "https://s27107.pcdn.co/wp-content/uploads/2018/02/bee-2237218_1920.jpg",
      title: "Фото 5",
    },
    {
      url: "https://chudo-prirody.com/uploads/posts/2021-08/1628283349_22-p-pchela-foto-22.jpg",
      title: "Фото 6",
    },
    {
      url: "https://s1.1zoom.ru/b5050/665/Bees_Closeup_596998_1920x1200.jpg",
      title: "Фото 7",
    },
    {
      url: "https://fikiwiki.com/uploads/posts/2022-02/1644870818_20-fikiwiki-com-p-pcheli-krasivie-kartinki-25.jpg",
      title: "Фото 8",
    },
  ];
  
  function initSlider(options) {
    if (!images || !images.length) return;
  
    options = options || {
      dots: true,
      title: false,
      autoplay: false,
      interval: 4000,
    };
  
    let sliderImages = document.querySelector(".slider__images");
    let sliderArrows = document.querySelector(".slider__arrows");
    let sliderDots = document.querySelector(".slider__dots");
  
    initImages();
    initArrows();
  
    if (options.dots) {
      initDots();
    }
  
    if (options.title) {
      initTitle();
    }
  
    if (options.autoplay) {
      initAuto();
    }
  
    function initImages() {
      images.forEach((image, index) => {
        let imageElem = `<img src="${image.url}" class="image n${index} ${
          index === 0 ? "active" : ""
        }" data-index="${index}">`;
        sliderImages.innerHTML += imageElem;
      });
    }
  
    function initArrows() {
      sliderArrows.querySelectorAll(".slider__arrow").forEach((arrow) => {
        arrow.addEventListener("click", function () {
          let curNumber = +sliderImages.querySelector(".active").dataset.index;
          console.log(curNumber);
          let nextNumber;
          if (arrow.classList.contains("left")) {
            nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
          } else {
            nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
          }
          moveSlider(nextNumber);
        });
      });
    }
  
    function initDots() {
      images.forEach((image, index) => {
        let dot = `<div class="slider__dots-item n${index} ${
          index === 0 ? "active" : ""
        }" data-index="${index}"></div>`;
        sliderDots.innerHTML += dot;
      });
      sliderDots.querySelectorAll(".slider__dots-item").forEach((dot) => {
        dot.addEventListener("click", function () {
          moveSlider(this.dataset.index);
        });
      });
    }
  
    function moveSlider(num) {
      sliderImages.querySelector(".active").classList.remove("active");
      sliderImages.querySelector(".n" + num).classList.add("active");
      if (options.dots) {
        sliderDots.querySelector(".active").classList.remove("active");
        sliderDots.querySelector(".n" + num).classList.add("active");
      }
      if (options.title) {
        changeTitle(num);
      }
    }
  
    function initTitle() {
      let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;
      sliderImages.innerHTML += cropTitle(titleDiv, 50);
    }
  
    function changeTitle(num) {
      if (!images[num].title) return;
      let sliderTitle = sliderImages.querySelector(".slider__images-title");
      sliderTitle.innerText = cropTitle(images[num].title, 50);
    }
  
    function cropTitle(title, size) {
      if (title.length <= size) {
        return title;
      } else {
        return title.substr(0, size) + "...";
      }
    }
  
    function initAuto() {
      const ID = setInterval(() => {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
        moveSlider(nextNumber);
      }, options.interval);
    }
  }
  
  let sliderOptions = {
    dots: true,
    title: true,
    autoplay: true,
    interval: 5000,
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    initSlider(sliderOptions);
  });