$(function(){
	$(".col-sm-9>.breadcrumb").each(function(key,value){
		if($(value).next().attr('id') === 'content' && $(value).next().children().first().is('article')){
			$(value).parent().css({
				"box-shadow":"0 0 10px 0 rgba(0,0,0,.2)",
			});
		}
	});
	$('article').find('table').wrap("<div class='table-responsive'></div>");
	$('article').find('table').addClass('table table-bordered table-hover')
})