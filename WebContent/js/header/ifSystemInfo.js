//alert("ddd");
var userInfo = getLoginUserInfo();
var userId = userInfo.id;
//alert("传过来的用户id"+userId);
var Systeminfo = getSysteminfo(userId);

if(Systeminfo.length>0){
	//alert("您有"+Systeminfo.length+"条信息未读！");
	$.messager.alert({
		title:'信息提示',
		msg:"您有"+Systeminfo.length+"条信息未读！",
		icon:"ok"
	});
}

//获取当前登录用户未读的信息列表,参数userId
function getSysteminfo(userId){
	//alert("hhhh");
	var requestData = {
			userId:userId
		};
		var SysteminfoList;
		//此处调用一样的取消接口
		$.ajax({
			type : "post",
			contentType : "application/json",
			url : "warn/getSysteminfoByUserId.ctrl",
			async : false,
			dataType : "json",
			data :JSON.stringify(requestData),
			success : function(data) {
				//	alert("删除成功");
				SysteminfoList = data.object;
				console.log(SysteminfoList);

			},
			error : function() {
				alert(error);
			}
		});
	return SysteminfoList;
}

//获取当前登录用户的信息
function getLoginUserInfo(){
	var loginUser;
	/** 获取用户信息 */
	$.ajax({ // 获取用户信息
		type: "get",
		contentType: "application/json",
		url : "getLoginUserInfo.ctrl",
		async : false,
		dataType : "json",
		success : function(data) {
			console.log(data.object);
		//	alert("获取到的登录用户id"+data.object.id);
			loginUser=data.object;
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
		}
	});
	
	return loginUser;
	
}