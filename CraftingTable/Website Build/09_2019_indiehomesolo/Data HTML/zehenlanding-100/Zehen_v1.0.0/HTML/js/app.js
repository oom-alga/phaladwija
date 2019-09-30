/* Template Name: Zehen - Responsive Landing Page Template
   Author: Themesdesign
   Version: 1.0.0
   Created: Feb 2019
   File Description: Main JS file of the template
*/

(function ($) {

    'use strict';

    // STICKY
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 50) {
            $(".sticky").addClass("nav-sticky");
        } else {
            $(".sticky").removeClass("nav-sticky");
        }
    });

    // SmoothLink
    $('.navbar-nav a').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 50
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    // scrollspy
    $("#navbarCollapse").scrollspy({
        offset:20
    });

    // owl-carousel
    $("#owl-demo").owlCarousel({
        autoPlay: 3000,
        stopOnHover: true,
        navigation: false,
        paginationSpeed: 1000,
        goToFirstSpeed: 2000,
        singleItem: true,
        autoHeight: true,
    });

    // typid
    $(".element").each(function() {
        var $this = $(this);
        $this.typed({
            strings: $this.attr('data-elements').split(','),
            typeSpeed: 100, // typing speed
            backDelay: 3000 // pause before backspacing
        });
    });

    // video
    $(".player").mb_YTPlayer();


    // Contact
    $('#contact-form').submit(function() {
        var action = $(this).attr('action');
        $("#message").slideUp(750, function() {
            $('#message').hide();

            $('#submit')
                .before('')
                .attr('disabled', 'disabled');

            $.post(action, {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    comments: $('#comments').val(),
                },
                function(data) {
                    document.getElementById('message').innerHTML = data;
                    $('#message').slideDown('slow');
                    $('#cform img.contact-loader').fadeOut('slow', function() {
                        $(this).remove()
                    });
                    $('#submit').removeAttr('disabled');
                    if (data.match('success') != null) $('#cform').slideUp('slow');
                }
            );

        });

        return false;
    });

})(jQuery)