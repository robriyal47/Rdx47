const header = document.querySelector("[data-header]");
const form = document.querySelector(".lead-form");
const formNote = document.querySelector("[data-form-note]");
const navLinks = [...document.querySelectorAll(".nav-links a[href^='#']")];
const planCards = [...document.querySelectorAll("[data-plan-card]")];
const heroSlides = [...document.querySelectorAll(".hero-image")];
const heroDots = [...document.querySelectorAll("[data-hero-dot]")];
const instructorSlides = [...document.querySelectorAll(".instructor-carousel img")];
const instructorDots = [...document.querySelectorAll("[data-instructor-dot]")];
let activeHeroSlide = 0;
let heroTimer;
let activeInstructorSlide = 0;
let instructorTimer;

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const showHeroSlide = (index) => {
  activeHeroSlide = index;
  heroSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === index);
  });
  heroDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === index);
  });
};

const startHeroCarousel = () => {
  window.clearInterval(heroTimer);
  heroTimer = window.setInterval(() => {
    showHeroSlide((activeHeroSlide + 1) % heroSlides.length);
  }, 5200);
};

heroDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showHeroSlide(Number(dot.dataset.heroDot));
    startHeroCarousel();
  });
});

if (heroSlides.length > 1) {
  startHeroCarousel();
}

const showInstructorSlide = (index) => {
  activeInstructorSlide = index;
  instructorSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === index);
  });
  instructorDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === index);
  });
};

const startInstructorCarousel = () => {
  window.clearInterval(instructorTimer);
  instructorTimer = window.setInterval(() => {
    showInstructorSlide((activeInstructorSlide + 1) % instructorSlides.length);
  }, 4800);
};

instructorDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showInstructorSlide(Number(dot.dataset.instructorDot));
    startInstructorCarousel();
  });
});

if (instructorSlides.length > 1) {
  startInstructorCarousel();
}

const setActiveNav = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      setActiveNav(visible.target.id);
    }
  },
  {
    rootMargin: "-120px 0px -55% 0px",
    threshold: [0.12, 0.28, 0.5]
  }
);

navLinks.forEach((link) => {
  const section = document.querySelector(link.getAttribute("href"));
  if (section) {
    sectionObserver.observe(section);
  }

  link.addEventListener("click", () => {
    setActiveNav(link.getAttribute("href").slice(1));
  });
});

const selectPlan = (selectedCard) => {
  planCards.forEach((card) => {
    card.classList.toggle("is-selected", card === selectedCard);
  });
};

planCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      return;
    }
    selectPlan(card);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectPlan(card);
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formNote.textContent = "Thanks. Your trial class request has been received.";
  formNote.classList.add("success");
  form.reset();
});
