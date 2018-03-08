/**
 * 登录JS
 */

$(window).resize(function() {
	$('#loginDiv').css({
		position : 'absolute',
		left : ($(window).width() - $('#loginDiv').outerWidth()) / 2,
		top : ($(window).height() - $('#loginDiv').outerHeight())/ 2 + $(document).scrollTop()
	});
});
// 初始化函数
$(window).resize();

