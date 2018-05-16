$(function(){
	//右侧留言
	$('.liu_touch a').mouseover(function(){
		$(this).addClass('hover');
		$('.liu_box').show();
	});
	$('.liu_touch a').mouseleave(function(){
		$(this).removeClass('hover');
		$('.liu_box').hide();
	});
});