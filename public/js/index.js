const hamBurger = document.querySelector("#hamSelect");
const nav = document.querySelector(".mobile-nav");
const navLinks = document.querySelectorAll(".mobile-nav-link");
hamBurger.addEventListener("click", function() {
  nav.classList.toggle("try");
  navLinks.forEach(navLink => {
    navLink.classList.toggle("try2");
  });
});
