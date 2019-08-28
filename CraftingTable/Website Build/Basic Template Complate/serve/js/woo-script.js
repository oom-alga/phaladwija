
// nav
$(function() {
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 1) {
            $('#header').addClass('fixed');
        } else {
            $('#header').removeClass('fixed');
        }
    });

	$('.hamburger-button').on('click', function(event){
		event.preventDefault();
		
		$(this).toggleClass('active');
        $('.overlay').toggleClass('visible');
        $('.blus').toggleClass('blur');
	});
});


// owl
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:30,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        }
    }
})