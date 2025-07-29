(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  const navbar = document.querySelector(".navbar-scroll");
  let lastScrollY = window.scrollY;
  const tolerance = 5;
  let ticking = false;

  function handleScroll() {
    const currentScroll = window.scrollY;

    // Agregar sombra si hay scroll
    if (currentScroll > 10) {
      navbar.classList.add("shadow");
    } else {
      navbar.classList.remove("shadow");
    }

    // Mostrar u ocultar según la dirección del scroll
    if (Math.abs(currentScroll - lastScrollY) <= tolerance) {
      ticking = false;
      return;
    }

    if (currentScroll > lastScrollY && currentScroll > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollY = currentScroll;
    ticking = false;
  }

  // Detectar el scroll y aplicar la función handleScroll
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });

  // Collapse Navbar
  const navbarCollapse = document.getElementById("navbarNav");

  document.addEventListener("click", function (event) {
    const isClickInside = navbarCollapse.contains(event.target);
    const isToggler = event.target.closest(".navbar-toggler");

    if (
      !isClickInside &&
      !isToggler &&
      navbarCollapse.classList.contains("show")
    ) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  });

  // Typed Initiate
  if ($(".typed-text-output").length == 1) {
    var typed_strings = $(".typed-text").text();
    var typed = new Typed(".typed-text-output", {
      strings: typed_strings.split(", "),
      typeSpeed: 100,
      backSpeed: 20,
      smartBackspace: false,
      loop: true,
    });
  }

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Skills
  $(".skill").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" }
  );

  // Portfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });
  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("active");
    $(this).addClass("active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    items: 1,
    dots: true,
    loop: true,
  });

  document
    .getElementById("contact-form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          form.reset();
          new bootstrap.Modal(document.getElementById("successModal")).show();
        } else {
          new bootstrap.Modal(document.getElementById("errorModal")).show();
        }
      } catch (error) {
        new bootstrap.Modal(document.getElementById("errorModal")).show();
      }
    });
})(jQuery);
