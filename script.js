document.addEventListener('DOMContentLoaded', function() {
    // Animated progress bars
    $(".animated-progress span").each(function () {
      $(this).animate(
        {
          width: $(this).attr("data-progress") + "%",
        },
        1000
      );
      $(this).text($(this).attr("data-progress") + "%");
    });
  
    // Dynamic text typing effect
    const dynamicText = document.getElementById("changing-text");
    const words = ["Web Developer", "Full-stack Developer", "Web Designer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
  
    const typeEffect = () => {
      const currentWord = words[wordIndex];
      const currentChar = currentWord.substring(0, charIndex);
      dynamicText.textContent = currentChar;
      dynamicText.classList.add("stop-blinking");
  
      if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 50);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 40);
      } else {
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking");
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1200);
      }
    }
  
    typeEffect();
  
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  
    // jQuery Simple Counter Plugin
    $.fn.jQuerySimpleCounter = function(options) {
      var settings = $.extend({
        start: 0,
        end: 100,
        easing: 'swing',
        duration: 400,
        complete: ''
      }, options);
  
      var thisElement = $(this);
  
      $({ count: settings.start }).animate({ count: settings.end }, {
        duration: settings.duration,
        easing: settings.easing,
        step: function() {
          var mathCount = Math.ceil(this.count);
          if (this.count >= settings.end) {
            thisElement.text(settings.end + "+");
          } else {
            thisElement.text(mathCount);
          }
        },
        complete: settings.complete
      });
    };
  
    // Counter initialization
    $(document).ready(function() {
      $('#number1').jQuerySimpleCounter({ end: 12, duration: 3000 });
      $('#number2').jQuerySimpleCounter({ end: 100, duration: 3000 });
      $('#number3').jQuerySimpleCounter({ end: 2, duration: 2000 });
      $('#number4').jQuerySimpleCounter({ end: 1000, duration: 2500 });
    });
  
    // Portfolio details slider
    const swiper = new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        768: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      }
    });
  
  // contact form validation
  (function () {
    "use strict";
  
    let forms = document.querySelectorAll('.php-email-form');
  
    forms.forEach(function (e) {
      e.addEventListener('submit', function (event) {
        event.preventDefault();
  
        let thisForm = this;
  
        let action = thisForm.getAttribute('action');
        let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
  
        if (!action) {
          displayError(thisForm, 'The form action property is not set!');
          return;
        }
        thisForm.querySelector('.loading').classList.add('d-block');
        thisForm.querySelector('.error-message').classList.remove('d-block');
        thisForm.querySelector('.sent-message').classList.remove('d-block');
  
        let formData = new FormData(thisForm);
  
        if (recaptcha) {
          if (typeof grecaptcha !== "undefined") {
            grecaptcha.ready(function () {
              try {
                grecaptcha.execute(recaptcha, { action: 'php_email_form_submit' })
                  .then(token => {
                    formData.set('recaptcha-response', token);
                    php_email_form_submit(thisForm, action, formData);
                  })
              } catch (error) {
                displayError(thisForm, error);
              }
            });
          } else {
            displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
          }
        } else {
          php_email_form_submit(thisForm, action, formData);
        }
      });
    });
  
    function php_email_form_submit(thisForm, action, formData) {
      fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error(`${response.status} ${response.statusText} ${response.url}`);
          }
        })
        .then(data => {
          // Hide loading message
          thisForm.querySelector('.loading').classList.remove('d-block');
          
          if (data.trim() == 'OK') {
            // Clear any existing error messages
            thisForm.querySelector('.error-message').classList.remove('d-block');
            // Show success message
            thisForm.querySelector('.sent-message').classList.add('d-block');
          } else {
            throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action);
          }
        })
        .catch((error) => {
          // Hide loading message
          thisForm.querySelector('.loading').classList.remove('d-block');
          displayError(thisForm, error);
        });
    }
  
    function displayError(thisForm, error) {
      thisForm.querySelector('.sent-message').classList.add('d-block');
      thisForm.querySelector('.error-message').innerHTML = error;
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.reset();

    }
  
  })();
  
});