/**
 * 退出
 */
function logout(){
	$.ajax({ // 获取用户信息
		type: "get",
		contentType: "application/json",
		url : "Managerlogout.ctrl",
		async : false,
		dataType : "json",
		success : function(data) {
			if(data && data.object == "ok"){
				window.location.href="managerLogin.jsp";
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
	url : "getManagerLoginUserName.ctrl",
	async : false,
	dataType : "json",
	success : function(data) {
		//alert(data.object.username);
		console.log(data.object);
		$("#getManagerLoginUserNameID").text(data.object.m_username);
	},
	error : function(XMLHttpRequest, textStatus, errorThrown) {
		console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
	}
});