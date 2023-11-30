  class CustomTab extends HTMLElement {
    constructor() {
          super();
        
          this.toggleClass = this.toggleClass.bind(this);
          this.addEventListener('click', this.toggleClass );
    }


    toggleClass() {
      this.classList.toggle("active");
    }
  }
  customElements.define("custom-tab", CustomTab);

$(() => {
  $('.my_add-btn').click(function(e){
    e.preventDefault();
    console.log(1);
    let variant = $(this).closest(".product-btn").find(".first-variant").val();
      formData = {
        id: variant,
        quantity: 1,
      };
  
      fetch(window.Shopify.routes.root + "cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(function () {
          
        });
  });
});




$(() => {
    $('.header-desctop-lang-head').click(function(){

      if( $('.header-desctop-lang-content').hasClass('active')){
        $('.header-desctop-lang-content').removeClass('active');
      }else{
        $('.header-desctop-lang-content').addClass('active');
      }
      
    });

let selectedLanguage = Shopify.locale;
$('.lang').val(selectedLanguage);
console.log(selectedLanguage);
/*let countryCode = customer.country_code;

console.log(countryCode);*/
/*$('.lang').change(function(){
   let langVal = $(this).val();
   $('.lang').val(langVal);
});*/

  
/*$('.multiselect-btn').click((e) => {
    e.preventDefault();
    let currentUrl = window.location.href;
    let lang = $('#lang').val();
    let url = new URL(currentUrl);
    console.log(lang);
    // Регулярное выражение для поиска существующего языкового префикса в форме /xx
    let regex = /\/[a-z]{2}(?=\/|$)/i;

    if (lang === 'en') {
        currentUrl = currentUrl.replace(regex, '');
    } else if (regex.test(currentUrl)) {
        currentUrl = currentUrl.replace(regex, '/' + lang);
    } else {
        url.pathname = '/' + lang + url.pathname;
        currentUrl = url.href;
    }


     let currency = $('#currency').val();
     console.log(currency);
     $.ajax({
        type: 'POST',
        url: '/localization',//'/cart/update.js', // URL для обновления корзины
        data: {
            country_code: currency,
        },
        success: function(data) {
              console.log(data);
            //window.location.href = currentUrl;
        }
    });
   
});*/




$(document).mouseup( function(e){ // событие клика по веб-документу
	var div = $( ".header-desctop-lang-wrap" ); // тут указываем ID элемента
		if ( !div.is(e.target) // если клик был не по нашему блоку
		    && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
			$('.header-desctop-lang-content').removeClass('active');
		}
});
    const swiper = new Swiper('.swiper-testimonial', {
    loop: false,
    slidesPerView: 4,
    spaceBetween: 40,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    breakpoints: {
      10: {
        slidesPerView: 1,
        spaceBetween: 12
      },
      // when window width is >= 320px
      320: {
        slidesPerView: 1.2,
        spaceBetween: 12,
            scrollbar: {
              el: '.swiper-scrollbar',
            },
      },
      // when window width is >= 480px
      600: {
        slidesPerView: 2.2,
        spaceBetween: 20
      },
      // when window width is >= 640px
      768: {
        slidesPerView: 2.5,
        
      },
      1023: {
        slidesPerView: 3,
        spaceBetween: 40
      },
      1600:{
         slidesPerView: 4,
          spaceBetween: 40
      }
      
    }

  });
});

$(() => {
    const swiper = new Swiper('.insta-swiper', {
    loop: false,
    slidesPerView: 3,
    spaceBetween: 40,
    scrollbar: {
              el: '.swiper-scrollbar',
    },
    breakpoints: {
      10: {
        slidesPerView: 1,
        spaceBetween: 12
      },
      // when window width is >= 320px
      320: {
        slidesPerView: 1.2,
        spaceBetween: 12,
            scrollbar: {
              el: '.swiper-scrollbar',
            },
      },
      // when window width is >= 480px
      600: {
        slidesPerView: 2.2,
        spaceBetween: 20
      },
      // when window width is >= 640px
      768: {
        slidesPerView: 2.5,
        
      },
      1023: {
        slidesPerView: 3,
        spaceBetween: 40
      }
      
    }

  });
});

$(() => {
    const swiper = new Swiper('.how-use-swiper', {
    loop: false,
    slidesPerView: 3,
    spaceBetween: 40,
    scrollbar: {
              el: '.swiper-scrollbar',
    },
    breakpoints: {
      10: {
        slidesPerView: 1,
        spaceBetween: 12
      },
      // when window width is >= 320px
      320: {
        slidesPerView: 1.2,
        spaceBetween: 12,
            scrollbar: {
              el: '.swiper-scrollbar',
            },
      },
      // when window width is >= 480px
      600: {
        slidesPerView: 2.2,
        spaceBetween: 20
      },
      // when window width is >= 640px
      768: {
        slidesPerView: 2.5,
        
      },
      1023: {
        slidesPerView: 3,
        spaceBetween: 40
      }
      
    }

  });
});

$(() => {
    const swiper = new Swiper('.my-mobile-swiper-product-media', {
    loop: false,
    slidesPerView: 1.2,
    spaceBetween: 20,
    scrollbar: {
              el: '.swiper-scrollbar',
    }
  });
});



$(() => {
   const swiper = new Swiper('.swiper-testimonial2', {
    loop: false,
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    breakpoints: {
      10: {
        slidesPerView: 1,
        spaceBetween: 12
      },
      // when window width is >= 320px
      320: {
        slidesPerView: 1.2,
        spaceBetween: 12,
            scrollbar: {
              el: '.swiper-scrollbar',
            },
      },
      // when window width is >= 480px
      600: {
        slidesPerView: 2.2,
        spaceBetween: 20
      },
      // when window width is >= 640px
      768: {
        slidesPerView: 2.5,
        
      },
      1023: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      1600:{
         slidesPerView: 4,
          spaceBetween: 20
      }
      
    }

  });
});





