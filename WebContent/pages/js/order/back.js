/**用户取消事件，不可真删除，只能更新订单状态*/
$("#userGoingOrderBack").click(function(){
	alert("zzz");
	var selectedData = $("#userGoingOrderInfo").datagrid("getSelected");
	if(selectedData == null){	//判断是否有选中
		$.messager.alert({
			title:'错误提示',
			msg:"请单击要编辑行",
			icon:"error"
		});
	}else{
		var id=selectedData.id;
		var order_status_kind = selectedData.order_status_kind;
		alert(order_status_kind);
		var order_check_kind = selectedData.order_check_kind;
		var pay_status_kind = selectedData.pay_status_kind;
		var total = selectedData.total;
		var license = selectedData.license;
		alert(license);
		var endAt = selectedData.endAt;
		var current_time = show();
		var DistanceDay =getDistanceDay(endAt,current_time);
		if(order_status_kind=="进行中"&&order_check_kind=="已审核"&&pay_status_kind=="已付款"){
			if(DistanceDay==0){
				//更新车辆信息
				backCar(license);
				//获取车辆等级信息
				var carlevel= tackDepositAndfine(license);
				alert("aaa"+carlevel.deposit);
				//返还押金
				 backMoney(carlevel.deposit);
				 //更新订单状态为完成
				endOrder(id);
				
			}else if(DistanceDay<0){
				$.messager.alert({
					title:'错误提示',
					msg:"本系统不提供提前还车功能！提前还车请与客服联系！客服电话13655246248！",
					icon:"error"
				});
			}else{
				$.messager.alert({
					title:'错误提示',
					msg:"超时订单！",
					icon:"error"
				});
			/*	//更新车辆信息
				backCar(license);
				//获取车辆等级信息
				var carlevel= tackDepositAndfine(license);
				alert("aaa"+carlevel.deposit+"bb"+carlevel.fine);
				//获取车辆出租价格
				var total = tackPrice(license);
				DistanceDay*fine*/
				
			}
			
			
			
		}else{
			$.messager.alert({
				title:'错误提示',
				msg:"当前订单不可还车！",
				icon:"error"
			});
		}
		
	}
	
});


//还款
function backMoney(total){
	var account;
	$.ajax({ // 获取当前地址信息
		type: "post",
		contentType: "application/json",
		url : "getLoginUserInfo.ctrl",
		async : false,
		dataType : "json",
		success : function(data) {
			alert("获取user信息");
			if(data.object==null){
				alert(error);
			}else{
				alert(data.object.account);		
				account=data.object.account;
				alert("传出去的account"+account);
				
			}
							
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
		}
	});	
	
	
	
	var newaccount= (account-0)+(total-0);
	alert(newaccount);
	
	var pay={
			newaccount:newaccount
	}
	alert(pay);
	//获取汽车的押金
	$.ajax({ // 获取当前地址信息
		type: "post",
		contentType: "application/json",
		url : "user/updateUserAccount.ctrl",
		async : false,
		dataType : "json",
		data : JSON.stringify(pay),
		success : function(data) {
			alert("1111");
			if(data.object){
				
					$.messager.alert({
					title:'信息提示',
					msg:"成功返还金额！",
					icon:"ok"
				});	
			
				
			}else{
				$.messager.alert({
					title:'信息提示',
					msg:"返还金额失败！",
					icon:"error"
				});	
			}
					
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
		}
	});	
}



//处理显示当前系统时间
function show(){
	   var mydate = new Date();
	   var str = "" + mydate.getFullYear() + "-";
	   if((mydate.getMonth()+1)>0&&(mydate.getMonth()+1)<10){
		   str +="0"+ (mydate.getMonth()+1) + "-";
	   }else{
		   str += (mydate.getMonth()+1) + "-";
	   }
	   
	   if(mydate.getDate()>0&&mydate.getDate()<10){
		   str +="0"+ mydate.getDate();
	   }else{
		   str += mydate.getDate();
	   }
	  
	   return str;
	  }


//比较下单时间和当前系统时间，如果当前系统时间之间相差1则自动取消订单，并提示用户，订单已取消
function getDistanceDay(dateBegin,dateEnd){
	//比较两个日期间相差天数
	var distance;
	//转化日期格式
	var newdateBegin=new Date(dateBegin.replace("-", "/").replace("-", "/"));  
    var newdateEnd=new Date(dateEnd.replace("-", "/").replace("-", "/")); 
    var sDate = new Date(newdateBegin);
	var eDate = new Date(newdateEnd);
	var fen = ((eDate.getTime()-sDate.getTime())/1000)/60;
	distance = parseInt(fen/(24*60)); //相隔distance天
	
//	alert("相隔"+distance+"天");
	return distance;
	}

//根据车牌号码查询，汽车押金和超时扣费
function tackDepositAndfine(license){
	var carlevel;
	var Car={
			license:license
	}
	
	$.ajax({ // 获取当前地址信息
		type: "post",
		contentType: "application/json",
		url : "car/tackDepositAndfine.ctrl",
		async : false,
		dataType : "json",
		data : JSON.stringify(Car),
		success : function(data) {
			
			if(data.object!=null){
				
				carlevel =	data.object;
				
			
				
			}else{
				$.messager.alert({
					title:'信息提示',
					msg:"获取汽车押金失败！",
					icon:"error"
				});	
			}
					
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
		}
	});	
	
	return carlevel;
	
}

//结束订单，即更改订单状态为完成
function endOrder(id){
	
    var requestData={
    		id:id
    		};
    alert(requestData);
	$.ajax({ 
		type: "post",
		contentType: "application/json",
		url : "order/endOrder.ctrl",
		async :false,
		dataType : "json",
		data:JSON.stringify(requestData),
		success : function(data) {
		//	alert("删除成功");
			alert(data.object);
			if(data.object){				
				
				$.messager.alert({
					title:'信息提示',
					msg:"更新订单状态成功！",
					icon:"ok"
				});
				
			}else{
				$.messager.alert({
					title:'错误提示',
					msg:"取消订单失败！",
					icon:"error"
				});
			}
			
		},
		error : function() {
			alert(error);
		}
	});
}


//更改车辆状态
function backCar(license){
	var Car={
			license:license
	}
	
	$.ajax({ // 获取当前地址信息
		type: "post",
		contentType: "application/json",
		url : "car/updateCarStatus.ctrl",
		async : false,
		dataType : "json",
		data : JSON.stringify(Car),
		success : function(data) {
			alert("1111");
			if(data.object){
				
					$.messager.alert({
					title:'信息提示',
					msg:"成功更改车辆状态！",
					icon:"ok"
				});	
			
				
			}else{
				$.messager.alert({
					title:'信息提示',
					msg:"更改车辆状态失败！",
					icon:"error"
				});	
			}
					
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
		}
	});	
}


