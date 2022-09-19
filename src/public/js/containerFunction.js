$(document).mouseup(function(e){
	const container = $('.for-users');

	if (!container.is(e.target) && container.has(e.target).length === 0) {
		container.hide();
	}
});

$(document).ready(function(){
	$('#logoIcon').on('click', function(e){
		$('.for-users').css('display', 'flex');
	});
});
