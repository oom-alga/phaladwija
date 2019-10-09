AOS.init();


$(function() {

    "use strict";

    // ----- STICKY ----- //
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 50) {
            $(".navbar-sticky").addClass("small");
        } else {
            $(".navbar-sticky").removeClass("small");
        }
    });

    // ----- SMOOTH LINK ----- //
    $('.navigation-menu a,.mouse_down a').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 0
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });


    // ----- CAROUSEL ----- //
    $("#owl-demo").owlCarousel({
        autoPlay: 3000,
        stopOnHover: true,
        navigation: false,
        paginationSpeed: 1000,
        goToFirstSpeed: 2000,
        singleItem: true,
        autoHeight: true,
    });
    $("#owl-demo-3").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        items: 2,
        itemsDesktop: [1199, 2],
        itemstablet: [768, 1],
        itemsDesktopSmall: [768, 1]
    });
    $("#owl-demo-4").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        items: 1,
        itemsDesktop: [1199, 2],
        itemstablet: [768, 1],
        itemsDesktopSmall: [768, 1],
        stopOnHover: true,
        navigation: true,
        navigationText: ["<i class='mdi mdi-menu-left'></i>", "<i class='mdi mdi-menu-right'></i>"]
    });


    // ----- MAGNIFICPOPUP ----- //
    $('.mfp-image').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-fade',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        }
    });

    // ----- TYPED ----- //
    $(".element").each(function() {
        var $this = $(this);
        $this.typed({
            strings: $this.attr('data-elements').split(','),
            typeSpeed: 100, // typing speed
            backDelay: 3000 // pause before backspacing
        });
    });

    // ----- SCROLLSPY ----- //
    $("#navigation").scrollspy({
        offset: 50
    });

    // ----- TOGGLE SCROLLTOP ----- //
    $('.navbar-toggle').on('click', function(event) {
        $(this).toggleClass('open');
        $('#navigation').slideToggle(400);
    });


    // ----- VIDEO MAGNIFICPOPUP ----- //
    $('.video-play-icon, .video-play-icon-trigger').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
});