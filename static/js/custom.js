$(function(){
	$(".col-sm-9>.breadcrumb").each(function(key,value){
		if($(value).next().attr('id') === 'content' && $(value).next().children().first().is('article')){
			$(value).parent().css({
				"box-shadow":"0 0 10px 0 rgba(0,0,0,.2)",
			});
		}
	});
	$('article').find('table').wrap("<div class='table-responsive'></div>");
	$('article').find('table').addClass('table table-bordered table-hover');


	// 生成文章内容目录
	function articleIndex() {
		var $article = $('#content>article>.entry-content');
		var $header = $article.find('h1, h2, h3,h4');
		if($header.length > 0){
			var _html = '<div class="panel panel-info widget-outline" style="max-width: 300px;"><div class="panel-heading" id="hideOutline"><a data-toggle="collapse" href="#collapseDir">目录结构</a></div><div id="collapseDir" class="panel-body panel-collapse collapse"><ul id="articleIndex" style="padding-left: 10px;"></ul></div></div>';
			$('body').prepend(_html);
			var _tagLevel = 1;                  // 最初的level
			var _$wrap = $('#articleIndex');    // 最初的wrap
			$header.each(function(index) {
				if($(this).text().trim() === '') {     // 空的title
					return;
				}
				//$(this).attr('id', 'articleHeader' + index);      // 加id
				//var this_id = 'articleHeader' + index;
				var this_id = $(this).attr('id');
				var _tl = parseInt($(this)[0].tagName.slice(1));  // 当前的tagLevel
				var _$li = null;
				if(index === 0 || _tl === _tagLevel) {  // 第一个或者是与上一个相同
					_$li = $('<li><a href="#'+ this_id +'">' + $(this).text() + '</a></li>');
					_$wrap.append(_$li);
				} else if(_tl > _tagLevel) {  // 当前的大于上次的
					_$li = $('<ul><li><a href="#' + this_id + '">' + $(this).text() + '</a></li></ul>');
					_$wrap.append(_$li);
					_$wrap = _$li;
				} else if(_tl < _tagLevel) {    // 当前的小于上次的
					_$li = $('<li><a href="#' + this_id + '">' + $(this).text() + '</a></li>');
					if(_tl === 1) {
						$('#articleIndex').append(_$li);
						_$wrap = $('#articleIndex');
					} else {
						_$wrap.parent('ul').append(_$li);
						_$wrap = _$wrap.parent('ul');
					}
				}
				_tagLevel = _tl;
			});
			$("#sidebar").css("margin-top","50px");
			$(".widget-outline").css({
				"position":"fixed",
				"top":"60px",
				"left":$("#sidebar>aside").offset().left,
				"width":$("#sidebar>aside").width(),
				"z-index":99999
			});
		}
	}
	articleIndex();
});