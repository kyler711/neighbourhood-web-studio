// Collapses the main nav behind a Menu button on small screens.
(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");
  if (!header || !toggle || !nav) return;
  header.classList.add("nav-ready");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();

// On phones, the floating WhatsApp button stays hidden until the visitor
// scrolls past the hero, so it doesn't sit on top of the hero's own button.
(function () {
  var cta = document.querySelector(".mobile-cta");
  var hero = document.querySelector(".hero");
  if (!cta || !hero) return;
  function update() {
    cta.classList.toggle("is-hidden", hero.getBoundingClientRect().bottom > 80);
  }
  update();
  window.addEventListener("scroll", update, { passive: true });
})();
