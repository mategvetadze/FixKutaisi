document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".slide-link");
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      const slideEffect = this.dataset.slide;
      document.body.classList.add(slideEffect);
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
});
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('show');
}