/* =====================================================================
   WEDDING PLANNER PRO — script.js
   ADMIN: edit ONLY the CONFIG block below.
   - CHECKOUT_URL updates every "Buy" button on the page.
   - PRICE / OLD_PRICE / SAVE update every price shown on the page.
   ===================================================================== */
var CONFIG = {
  CHECKOUT_URL: "#pricing",   // e.g. "https://rzp.io/rzp/XXXXXXX"
  PRICE: "₹999",
  OLD_PRICE: "₹4,999",
  SAVE: "₹4,000"
};

(function () {
  "use strict";

  // 1. Apply CONFIG (links + prices)
  document.querySelectorAll("[data-checkout]").forEach(function (a) { a.href = CONFIG.CHECKOUT_URL; });
  document.querySelectorAll("[data-price]").forEach(function (el) { el.textContent = CONFIG.PRICE; });
  document.querySelectorAll("[data-old-price]").forEach(function (el) { el.textContent = CONFIG.OLD_PRICE; });
  document.querySelectorAll("[data-save]").forEach(function (el) { el.textContent = CONFIG.SAVE; });

  // 2. Header shadow + sticky buy bar on scroll
  var header = document.getElementById("siteHeader");
  var bar = document.getElementById("stickyBar");
  var hero = document.querySelector(".hero");
  var pricing = document.getElementById("pricing");
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 8);
    if (bar && hero) {
      var pastHero = y > hero.offsetHeight - 80;
      var atPricing = false;
      if (pricing) {
        var r = pricing.getBoundingClientRect();
        atPricing = r.top < window.innerHeight && r.bottom > 0;
      }
      bar.classList.toggle("show", pastHero && !atPricing);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 3. Scroll-reveal animations
  var animated = document.querySelectorAll("[data-animate]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    animated.forEach(function (el) { io.observe(el); });
  } else {
    animated.forEach(function (el) { el.classList.add("in-view"); });
  }

  // 4. 3D tilt on hero image (desktop mouse only)
  var tilt = document.getElementById("heroTilt");
  if (tilt && window.matchMedia("(pointer:fine)").matches) {
    tilt.addEventListener("mousemove", function (e) {
      var b = tilt.getBoundingClientRect();
      var x = (e.clientX - b.left) / b.width - 0.5;
      var y = (e.clientY - b.top) / b.height - 0.5;
      tilt.style.transform = "perspective(1000px) rotateX(" + (y * -12) + "deg) rotateY(" + (x * 12) + "deg) scale(1.02)";
    });
    tilt.addEventListener("mouseleave", function () {
      tilt.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
  }

  // 5. Floating hearts in hero (decorative)
  var hearts = document.querySelector(".hero-hearts");
  if (hearts && !window.matchMedia("(prefers-reduced-motion:reduce)").matches) {
    for (var i = 0; i < 10; i++) {
      var s = document.createElement("span");
      s.textContent = i % 3 === 0 ? "✦" : "♥";
      s.style.left = (Math.random() * 100) + "%";
      s.style.fontSize = (10 + Math.random() * 14) + "px";
      s.style.animationDuration = (10 + Math.random() * 10) + "s";
      s.style.animationDelay = (Math.random() * 10) + "s";
      hearts.appendChild(s);
    }
  }

  // 6. Only one FAQ open at a time
  var faqs = document.querySelectorAll("details.faq");
  faqs.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (d.open) faqs.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  // 7. Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length > 1) {
        var t = document.querySelector(id);
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
      }
    });
  });
})();