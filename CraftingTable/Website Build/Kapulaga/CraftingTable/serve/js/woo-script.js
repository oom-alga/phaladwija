
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
window.onload = function () {
    $('#wool-paralax').woolParalax();
    $('#wool-paralax-me').woolParalax();
}