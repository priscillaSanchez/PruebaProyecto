(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    
    if (mobileNavToggleBtn) {
      function mobileNavToogle() {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
      }
      
      mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
    
      /**
       * Hide mobile nav on same-page/hash links
       */
      document.querySelectorAll('#navmenu a').forEach(navlink => {
        navlink.addEventListener('click', () => {
          if (document.querySelector('.mobile-nav-active')) {
            mobileNavToogle();
          }
        });
      });
    
      /**
       * Toggle mobile nav dropdowns
       */
      const dropdownToggles = document.querySelectorAll('.navmenu .dropdown .toggle-dropdown');
      
      dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          // Toggle active class on the parent dropdown li
          this.closest('li.dropdown').classList.toggle('active');
          
          // Find the submenu and toggle its visibility
          const dropdownMenu = this.closest('li.dropdown').querySelector('ul');
          if (dropdownMenu) {
            dropdownMenu.classList.toggle('dropdown-active');
          }
          
          // Toggle the icon rotation if needed
          this.classList.toggle('active');
        });
      });
      
      /**
       * Close mobile nav when clicking outside
       */
      document.addEventListener('click', function(e) {
        if (document.querySelector('.mobile-nav-active') && 
            !e.target.closest('.navmenu') && 
            !e.target.closest('.mobile-nav-toggle')) {
          mobileNavToogle();
        }
      });
    }
  
    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }
  });
  /**
   * Scroll top button
  
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);
 */

  
  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Galeria de fotos
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();



//Seccion Joyeria Inicio
document.addEventListener("DOMContentLoaded", function() {
  let currentIndex = 0;

  function moveSlide(direction) {
      console.log("Botón presionado:", direction); // Verifica si se detecta el clic
      
      const gallery = document.querySelector('.gallery');
      const products = document.querySelectorAll('.product');

      if (!gallery || products.length === 0) {
          console.error("Error: No se encontraron productos o la galería");
          return;
      }

      const visibleItems = 3;
      const maxIndex = Math.max(0, products.length - visibleItems);

      console.log("Max Index:", maxIndex);

      // Actualizar índice con límites
      let newIndex = currentIndex + direction;
      if (newIndex < 0 || newIndex > maxIndex) {
          console.warn("Límite alcanzado:", newIndex);
          return; // No mover si está en el límite
      }
      currentIndex = newIndex;

      // Obtener ancho del primer producto
      const itemWidth = products[0].offsetWidth + 
                       (parseInt(window.getComputedStyle(products[0]).marginLeft) || 0) + 
                       (parseInt(window.getComputedStyle(products[0]).marginRight) || 0);

      console.log("Ancho de cada producto:", itemWidth);
      
      // Mover la galería
      gallery.style.transition = 'transform 0.3s ease';
      gallery.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

      console.log("Índice actualizado:", currentIndex, "Transform:", `translateX(-${currentIndex * itemWidth}px)`);
  }
})

  // Asignar eventos a los botones
//  const leftArrow = document.querySelector(".arrow-left");
 // const rightArrow = document.querySelector(".arrow-right");

//  if (leftArrow && rightArrow) {
//      leftArrow.addEventListener("click", () => moveSlide(-1));
  //    rightArrow.addEventListener("click", () => moveSlide(1));
//  } else {
    //  console.error("No se encontraron los botones");
//  }
//})