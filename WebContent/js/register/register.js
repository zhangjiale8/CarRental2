/**
 * 注册JS
 */

/*
 当调整浏览器窗口的大小时，发生 resize 事件。
resize() 方法触发 resize 事件，或规定当发生 resize 事件时运行的函数。
*/
/*alert("zzz");
$(window).resize(function() {
	$('#registerDiv').css({
		
		position : 'absolute',
		left : ($(window).width() - $('#registerDiv').outerWidth()) / 2,
		top : ($(window).height() - $('#registerDiv').outerHeight())/ 2 + $(document).scrollTop()

	});
});
// 初始化函数
$(window).resize();*/


function submitRegisterForm(){
	var password = $('#register input[name="password"]').val();
	var repassword = $('#register input[name="repassword"]').val();
	if(password!=repassword){
		$.messager.alert({
			title:'错误提示',
			msg:"两次输入密码不一致",
			icon:"error"
		});
	}else{
		$('#register').form('submit',{
			url:'../register.ctrl',
			
			onSubmit:function(param){
			console.log(param);
            return $(this).form('enableValidation').form('validate');
			},
			
			success: function(data){	
			//	alert("success");
				data = $.parseJSON(data);  
				var object = data.object;
				var error = data.error;
				if(! (typeof(error) == "undefined")){
				//	$('#register').form('clear');
					$.messager.alert({
						title:'错误提示',
						msg:error,
						icon:"error"
					});
				}else if(object==1) {
					$.messager.alert({
						title:'信息提示',
						msg:"注册成功",
						icon:"ok"
					});
					$('#register').form('clear');
					setTimeout(function(){
						window.location.href="../consumerLogin.jsp";
					},3000);
					
				}
			}
		});
	}
}

function clearForm() {
	$('#register').form('clear');
}