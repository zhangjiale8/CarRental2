/**
 * 退出
 */
function logout(){
	$.ajax({ // 获取用户信息
		type: "get",
		contentType: "application/json",
		url : "logout.ctrl",
		async : false,
		dataType : "json",
		success : function(data) {
			if(data && data.object == "ok"){
				window.location.href="index.jsp";
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
		}
	});
}

/** 获取登录用户信息 */
$.ajax({ // 获取用户信息
	type: "get",
	contentType: "application/json",
	url : "getLoginUserName.ctrl",
	async : false,
	dataType : "json",
	success : function(data) {
		$("#getLoginUserNameID").text(data.object.username);
	},
	error : function(XMLHttpRequest, textStatus, errorThrown) {
		console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
	}
});