function createNav(){
	var newCont = $(document.createElement('ul'));
	newCont.append('<li id="menu_logout" class="after"><span></span><img/></li>')
	.append('<li class="menu_sep"></li>')
	$('#nav').empty().append(newCont);
	alert($('#nav').html());
}