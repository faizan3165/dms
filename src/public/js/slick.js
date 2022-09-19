$(document).ready(function(){
	$('.my-slick-slide').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		focusOnSelect: true,
		prevArrow: '<i class="fa-solid fa-chevron-left arrow-left"></i>',
		nextArrow: '<i class="fa-solid fa-chevron-right arrow-right"></i>'
	});
	
    $('.handbook-slide').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		focusOnSelect: true,
		prevArrow: '<i class="fa-solid fa-chevron-left arrow-left"></i>',
		nextArrow: '<i class="fa-solid fa-chevron-right arrow-right"></i>'
	});
});
