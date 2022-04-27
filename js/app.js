
//navegar para a seção de acordo com o menu

$('.menu-nav a[href^="#"]').click(function(e){
  //identifica o evento click
	e.preventDefault();
  //server para preveni o compartamento default do link
	var id = $(this).attr('href');
  //o atributo id recebe o valor referente ao link
	var	menuHeight = $('.menu').innerHeight();
  //retorna  a altura do menu
	var	targetOffset = $(id).offset().top;
  //seta o deslocamento necessário
	$('html, body').animate({
		scrollTop: targetOffset - menuHeight
	}, 500);
});
