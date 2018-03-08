/**
 * http://usejsdoc.org/
 */
$.ajaxSetup({
	error : function(XMLHttpRequest, textStatus, errorThrown) {
		if (XMLHttpRequest.status == 403) {
			alert('您没有权限访问此资源或进行此操作');
			return false;
		}
	},
	complete : function(XMLHttpRequest, textStatus) {
		//console.log("textStatus --> " + textStatus);
		if (XMLHttpRequest.status == 444) {
			window.location.href="index.html"
		}
	}
});
function logout(){
	$.ajax({ // 获取用户信息
		type: "get",
		contentType: "application/json",
		url : "logout.ctrl",
		async : false,
		dataType : "json",
		success : function(data) {
			if(data && data.object == "ok"){
				window.location.href="login.html";
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
		}
	});
}