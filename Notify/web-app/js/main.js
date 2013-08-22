$(document).ready(function(){
	
	var height = $('#header').outerHeight() + 50;
	$('body').css('marginTop',height + 'px');
	
	$('.main_container_title').click(function(){
		var $this = $(this);
		var content = $this.siblings('.content');
		var img = $this.find('img');
		var source = img.attr('src');
		if (content.is(':visible')){
			img.attr('src',source.replace('_collapse','_expand'));
			content.slideUp(300);
		}else{
			img.attr('src',source.replace('_expand','_collapse'));
			content.slideDown(300);
		}
	});
	
	$('.object_table tr').live('click',function(){
		$(this).children('td:first')[0].onclick();
		$('#detailed_view').show();
		var container = $('#detailView');
		var img = container.siblings('.main_container_title').find('img');
		var source = img.attr('src');
		img.attr('src',source.replace('_expand','_collapse'));
		container.slideDown(300);
		return false;
	});
	
	$('.menu_table img').click(function(){
		var $this = $(this);
		var parent = $this.parents('.content').siblings('.main_container_title');
		parent.trigger('click');
		$('#detailView').empty();
		$('#current_action').show();
		
		var container = $('#detailView');
		var img = container.siblings('.main_container_title').find('img');
		var source = img.attr('src');
		img.attr('src',source.replace('_expand','_collapse'));
		container.hide();
		$('#detailed_view').hide();
			
		setTimeout(function(){
			var container = $('#listView');
			var img = container.siblings('.main_container_title').find('img');
			var source = img.attr('src');
			var p = container.siblings('.main_container_title').find('p');
			p.text("Current Action: " + $this.attr('id'));
			img.attr('src',source.replace('_expand','_collapse'));
			container.slideDown(300);
		},400);
	});
	
	$('#main_menu').show().children('.main_container_title').trigger('click');
	$('#admin_toolbox').show();
});