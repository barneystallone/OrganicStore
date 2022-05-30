/*  ---------------------------------------------------
	Template Name: Ogani
	Description:  Ogani eCommerce  HTML Template
	Author: Colorlib
	Author URI: https://colorlib.com
	Version: 1.0
	Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function($) {

	/*------------------
		Preloader
	--------------------*/
	$(window).on('load', function() {
		$(".loader").fadeOut();
		$("#preloder").delay(200).fadeOut("slow");

		/*------------------
			Gallery filter
		--------------------*/
		$('.featured__controls li').on('click', function() {
			$('.featured__controls li').removeClass('active');
			$(this).addClass('active');
		});
		if ($('.featured__filter').length > 0) {
			var containerEl = document.querySelector('.featured__filter');
			var mixer = mixitup(containerEl);
		}
	});

	/*------------------
		Background Set
	--------------------*/
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});

	//Humberger Menu
	$(".humberger__open").on('click', function() {
		$(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
		$(".humberger__menu__overlay").addClass("active");
		$("body").addClass("over_hid");
	});

	$(".humberger__menu__overlay").on('click', function() {
		$(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
		$(".humberger__menu__overlay").removeClass("active");
		$("body").removeClass("over_hid");
	});

	/*------------------
		Navigation
	--------------------*/
	$(".mobile-menu").slicknav({
		prependTo: '#mobile-menu-wrap',
		allowParentLinks: true
	});

	/*-----------------------
		Categories Slider
	------------------------*/
	$(".categories__slider").owlCarousel({
		loop: true,
		margin: 0,
		items: 4,
		dots: false,
		nav: true,
		navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		smartSpeed: 1200,
		autoHeight: false,
		autoplay: true,
		responsive: {

			0: {
				items: 1,
			},

			480: {
				items: 2,
			},

			768: {
				items: 3,
			},

			992: {
				items: 4,
			}
		}
	});


	$('.hero__categories__all').on('click', function() {
		$('.hero__categories ul').slideToggle(400);
	});

	/*--------------------------
		Latest Product Slider
	----------------------------*/
	$(".latest-product__slider").owlCarousel({
		loop: true,
		margin: 0,
		items: 1,
		dots: false,
		nav: true,
		navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
		smartSpeed: 1200,
		autoHeight: false,
		autoplay: true
	});

	/*-----------------------------
		Product Discount Slider
	-------------------------------*/
	$(".product__discount__slider").owlCarousel({
		loop: true,
		margin: 0,
		items: 3,
		dots: true,
		smartSpeed: 1200,
		autoHeight: false,
		autoplay: true,
		responsive: {

			320: {
				items: 1,
			},

			480: {
				items: 2,
			},

			768: {
				items: 2,
			},

			992: {
				items: 3,
			}
		}
	});

	/*---------------------------------
		Product Details Pic Slider
	----------------------------------*/
	$(".product__details__pic__slider").owlCarousel({
		loop: true,
		margin: 20,
		items: 4,
		dots: true,
		smartSpeed: 1200,
		autoHeight: false,
		autoplay: true
	});

	/*-----------------------
		Price Range Slider
	------------------------ */
	var rangeSlider = $(".price-range"),
		minamount = $("#minamount"),
		maxamount = $("#maxamount"),
		minPrice = rangeSlider.data('min'),
		maxPrice = rangeSlider.data('max');
	rangeSlider.slider({
		range: true,
		min: minPrice,
		max: maxPrice,
		values: [minPrice, maxPrice],
		slide: function(event, ui) {
			minamount.val('$' + ui.values[0]);
			maxamount.val('$' + ui.values[1]);
		}
	});
	minamount.val('$' + rangeSlider.slider("values", 0));
	maxamount.val('$' + rangeSlider.slider("values", 1));

	/*--------------------------
		Select
	----------------------------*/
	// $("select").niceSelect();

	/*------------------
		Single Product
	--------------------*/
	$('.product__details__pic__slider img').on('click', function() {

		var imgurl = $(this).data('imgbigurl');
		var bigImg = $('.product__details__pic__item--large').attr('src');
		if (imgurl != bigImg) {
			$('.product__details__pic__item--large').attr({
				src: imgurl
			});
		}
	});

	/*-------------------
		Quantity change
	--------------------- */
	var proQty = $('.pro-qty');
	proQty.prepend('<span class="dec qtybtn">-</span>');
	proQty.append('<span class="inc qtybtn">+</span>');
	proQty.on('click', '.qtybtn', function() {
		var $button = $(this);
		var oldValue = $button.parent().find('input').val();
		if ($button.hasClass('inc')) {
			var newVal = parseFloat(oldValue) + 1;
		} else {
			// Don't allow decrementing below zero
			if (oldValue > 0) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 0;
			}
		}
		$button.parent().find('input').val(newVal);
	});


})(jQuery);

const container = document.querySelector(".container_login"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
    //   checkout = document.querySelector(".checkout-link");
      login = document.querySelector(".login-link");

    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", ()=>{
            pwFields.forEach(pwField =>{
                if(pwField.type ==="password"){
                    pwField.type = "text";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                    })
                }else{
                    pwField.type = "password";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye", "uil-eye-slash");
                    })
                }
            }) 
        })
    })

    signUp.addEventListener("click", (e)=>{
		e.preventDefault();
        container.classList.add("active");
    });
    login.addEventListener("click", (e)=>{
		e.preventDefault();
        container.classList.remove("active");
    });
    // checkout.addEventListener("click", ( )=>{
    //     container.classList.toggle("active2");
    // });
    document.querySelectorAll(".checkout-link").forEach(e=>{
        e.addEventListener("click", (evt)=>{
			evt.preventDefault();
            container.classList.toggle("active2");
        });
    })

// const modalToggle = () => {
// 	const modal = document.querySelector(".modal");
// 	if(modal.classList.contains("active")){
// 		modal.style.opacity = 0;
// 		setTimeout(()=>{
// 			modal.classList.toggle("active");
// 		},500)
// 	}
// 	else{
// 		modal.style.opacity = 1;
// 		modal.classList.toggle("active");
// 	}
// }

// document.querySelectorAll('.header__top__right__auth').forEach(e=>{
// 	e.addEventListener('click',evt=>{
// 		evt.preventDefault();
// 		if(e.classList.contains('logout')==false) {
// 			modalToggle();
// 		}
// 	})
// })