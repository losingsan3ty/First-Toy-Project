" use strict";
//slider
const js = function () {
  //general selectors
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav__link");
  const linkContainer = document.querySelector(".nav__links");
  const slider = document.querySelector(".slider");
  const slide = document.querySelectorAll(".slide");
  const btnRight = document.querySelector(".btn--right");
  const btnLeft = document.querySelector(".btn--left");
  const dots = document.querySelector(".dots");
  const logo = document.querySelector(".logo");
  const hero = document.querySelector(".hero");
  const targetImg = document.querySelectorAll("img[data-src]");
  const sections = document.querySelectorAll(".section");
  const btnMain = document.querySelector(".btn-main");
  const aboutSection = document.getElementById("section--1");
  const tabContainer = document.querySelector(".tab-container");
  const stories = document.querySelectorAll(".story");
  const tabs = document.querySelectorAll(".tab");
  const btnContact = document.querySelector(".contact");
  const login = document.querySelector(".login");
  const blur = document.querySelector(".blur");
  const closeBtn = document.querySelector(".close-modal");
  //modal
  const openModal = (e) => {
    login.classList.remove("modal-hidden");
    blur.classList.add("cover");
  };
  const closeModal = (e) => {
    if (!e.key) {
      login.classList.add("modal-hidden");
      blur.classList.remove("cover");
    }
    if (e.key === "Escape") {
      login.classList.add("modal-hidden");
      blur.classList.remove("cover");
    }
  };
  blur.addEventListener("click", closeModal);
  window.addEventListener("keydown", closeModal);
  closeBtn.addEventListener("click", closeModal);
  btnContact.addEventListener("click", openModal);
  //Tab container
  tabContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".tab");
    if (!clicked) return;
    stories.forEach((story) => story.classList.remove("story-active"));
    tabs.forEach((tab) => tab.classList.remove("tab-active"));
    clicked.classList.add("tab-active");
    const id = clicked.dataset.tab;
    document.getElementById(`story-${id}`).classList.add("story-active");
  });
  //nav sticky
  const section1observe = (e, observer) => {
    const [first] = e;
    if (first.isIntersecting) {
      nav.classList.remove("nav-sticky");
      navLinks.forEach((link) => link.classList.remove("nav-link-sticky"));
    } else {
      nav.classList.add("nav-sticky");
      navLinks.forEach((link) => link.classList.add("nav-link-sticky"));
    }
  };
  const sticky = new IntersectionObserver(section1observe, {
    root: null,
    threshold: 0.2,
    rootMargin: "-25%",
  });
  sticky.observe(hero);
  //lazy images
  const observeImg = function (e, observe) {
    const [entry] = e;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", function (e) {
      entry.target.classList.remove("img-filter");
    });
    observe.unobserve(entry.target);
  };
  const imgObserver = new IntersectionObserver(observeImg, {
    root: null,
    threshold: 0.1,
    rootMargin: "50%",
  });
  targetImg.forEach((img) => imgObserver.observe(img));
  //nav
  const opacity = function (e, opacity) {
    if (e.target.classList.contains("nav__link")) {
      logo.style.opacity = this;
      navLinks.forEach((m) => {
        if (m !== e.target) m.style.opacity = this;
      });
    }
  };
  nav.addEventListener("mouseover", opacity.bind(0.2));
  nav.addEventListener("mouseout", opacity.bind(1));
  //slider
  let currSlide = 0;
  const goToSlide = (curr = 0) => {
    slide.forEach((m, i) => {
      m.style.transform = `translateX(${100 * (i - curr)}%)`;
    });
  };
  goToSlide();
  const slideRight = () => {
    if (currSlide === slide.length - 1) currSlide = 0;
    else currSlide++;
    goToSlide(currSlide);
    activeDot(currSlide);
  };
  const slideLeft = () => {
    if (currSlide === 0) currSlide = slide.length - 1;
    else currSlide--;
    goToSlide(currSlide);
    activeDot(currSlide);
  };
  const createDots = () => {
    slide.forEach((m, i) => {
      dots.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  createDots(0);
  const dot = document.querySelectorAll(".dots__dot");

  const activeDot = (curr) => {
    dot.forEach((m) => m.classList.remove("dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${curr}"]`)
      .classList.add("dot--active");
  };
  activeDot(0);
  //section hidden
  const observerControl = {
    root: null,
    threshold: 0.1,
    rootMargin: -2 + "%",
  };
  const observeSection = (e, observer) => {
    const [one] = e;
    if (!one.isIntersecting) return;
    one.target.classList.remove("section--hidden");
    observer.unobserve(one.target);
  };
  const sectionObserver = new IntersectionObserver(
    observeSection,
    observerControl
  );
  sections.forEach((mov) => sectionObserver.observe(mov));
  //smooth scrolling
  btnMain.addEventListener("click", function (e) {
    e.preventDefault();
    aboutSection.scrollIntoView({ behavior: "smooth" });
  });
  linkContainer.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("nav__link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });
  //event listeners
  btnRight.addEventListener("click", slideRight);
  btnLeft.addEventListener("click", slideLeft);
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") slideRight();
    if (e.key === "ArrowLeft") slideLeft();
  });
  dots.addEventListener("click", function (e) {
    if (!e.target) return;
    const active = e.target.dataset.slide;
    goToSlide(active);
    activeDot(active);
  });
};
js();
