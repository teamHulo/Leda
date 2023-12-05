
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
  function renderUpsellGet () {
    const request = new XMLHttpRequest();
    request.addEventListener("load", renderUpsell);
    request.open('GET', `?sections=cart-drawer`, true); //'?sections=cart-drawer', true);///?sections=cart-drawer,
    request.send();
  }

  function renderUpsell(){
    
    const fresh = document.createElement('div');
    let objCarts = JSON.parse(this.responseText);
    fresh.innerHTML = objCarts["cart-drawer"];
    
    let container = document.querySelector('.cart__drawer');
    let cartUpsell = container.querySelector('.cart__upsell-block');
    let cartUpsellRender = fresh.querySelector('.cart__upsell-block').innerHTML;
    let cartTotalPriceRender = fresh.querySelector('[data-cart-final]').innerHTML;
    let cartPrice = container.querySelector('[data-cart-final]');
    cartUpsell.innerHTML = cartUpsellRender;
    cartPrice.innerHTML = cartTotalPriceRender;
  }


  function handleResponse() {
      const fresh = document.createElement('div');
      fresh.innerHTML = this.responseText;
      let container = document.querySelector('.cart__drawer');
      let cartItems = container.querySelector('.cart__items');
      let cartUpsell = container.querySelector('.cart__upsell-block');
      let cartBottomUpsellRender = container.querySelector('.cart__upsell-block');
      let cartItemsRender = fresh.querySelector('.cart__items').innerHTML;
      cartItems.innerHTML = cartItemsRender;
      renderUpsellGet();
      
  }
  function updateProductGroup(arr){
    data = { updates: {} };
    
    $.each(arr, function(index, value) {
      $('.cart__items__row').each(function(){
        let dataID = $(this).attr('data-product-id');
        if(value == dataID){
          let lineNumber = $(this).attr('data-line');
          let lineQuantity = +$(this).attr('data-quantity') - 1;
          data.updates[lineNumber] = lineQuantity;
          
        }
      });

    });
    console.error(data);
    $.ajax({
      type: 'POST',
      url: '/cart/update.js',
      data: data,
      dataType: 'json',
      success: function() { 
        const request = new XMLHttpRequest();
        request.addEventListener("load", handleResponse);
        request.open('GET', `${window.theme.routes.root_url}?section_id=api-cart-items`, true); //'?sections=cart-drawer', true);///?sections=cart-drawer,
        request.send();
      }
    });
  }


  $(document).on('click', '.my_add-upgrade', function(e){
        e.preventDefault();
        let productGroup = [];
        let products = $('.product__groups input');

        products.each(function(){
          
          productGroup.push($(this).val()); // Use $(this).val() instead of this.val()
        });

       
        
        let id = $(this).closest('form').find('.first-variant').val();
          formData = {
            id: id,
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
            updateProductGroup(productGroup);
          
          
            return response.json();
          })
          .catch((error) => {
            console.error("Error:", error);
          })
          .finally(function () {
           
          });
  });
  function changeCart() {
    const fresh = document.createElement('div');
      fresh.innerHTML = this.responseText;
      let container = document.querySelector('.cart__drawer');
      let cartItems = document.querySelector('[data-line-items]');
      console.error(cartItems);
      let cartItemsLength = fresh.querySelectorAll('[data-item]').length;
      console.error(cartItemsLength);
      let cartItemsRender = fresh.querySelector('[data-api-content]').innerHTML;
      
      cartItems.innerHTML = cartItemsRender;
      if(cartItemsLength == 0){
        
        $('[data-cart-empty]').removeClass('cart--hidden');
        $('[data-cart-form]').addClass('cart--hidden');
        $('.drawer__bottom').addClass('cart--hidden');
      }else{
      
      }
    
    
  }

  function ajaxChangeCart(id, quantity){
    window
    .fetch(`${window.theme.routes.cart}/change.js`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: id,
        quantity: quantity,
      }),
    })
    .then(this.handleErrors)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      const request = new XMLHttpRequest();
      request.addEventListener("load", changeCart);
      request.open('GET', `${window.theme.routes.root_url}?section_id=api-cart-items`, true); //'?sections=cart-drawer', true);///?sections=cart-drawer,
      request.send();
    })
    .catch((e) => {
      
    });
  }




  $(document).on('click','.my-cart-remove', function(e){
    e.preventDefault();
    let lineNumber = $(this).attr('data-remove-key');
    let lineQuantity = 0;
    ajaxChangeCart(lineNumber,lineQuantity );
  });


  $(document).on('click','.quantity__button--my-minus', function(){
    let quantityValue = +$(this).closest('.cart__items__quantity').find('.quantity__my-input').val() - 1;
    let quantityID = $(this).closest('.cart__items__quantity').find('.quantity__my-input').attr('data-update-cart');
    console.error(quantityValue, quantityID);
    ajaxChangeCart(quantityID ,quantityValue);

  });
  $(document).on('click','.quantity__button--my-plus', function(){
    let quantityValue = +$(this).closest('.cart__items__quantity').find('.quantity__my-input').val() + 1;
    let quantityID = $(this).closest('.cart__items__quantity').find('.quantity__my-input').attr('data-update-cart');
    console.error(quantityValue, quantityID);
    ajaxChangeCart(quantityID ,quantityValue);

  });
  $(document).on('change','.quantity__my-input', function(){
    let quantityValue = +$(this).val();
    let quantityID = $(this).attr('data-update-cart');
    console.error(quantityID ,quantityValue);
    ajaxChangeCart(quantityID ,quantityValue);

  });



}); 




$(() => {
  $('.my_add-btn').click(function(e){
    e.preventDefault();
   
    
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





