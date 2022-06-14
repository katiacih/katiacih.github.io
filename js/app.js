
$('.menu-nav a[href^="#"]').click(function(e){

	e.preventDefault();

	var id = $(this).attr('href');

	var	menuHeight = $('.menu').innerHeight();

	var	targetOffset = $(id).offset().top;

	$('html, body').animate({
		scrollTop: targetOffset - menuHeight
	}, 500);
});
