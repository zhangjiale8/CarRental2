/**
 * 异步加载未支付的订单和超时的订单，列表，这里主要目的是防止用户占用汽车，
 * 一直不支付或者超时订单时间过长，影响其他人租赁
 * 系统自动取消当天未支付的订单
 */
//alert("uuuu");
var Order = getOrderList();
var current_time = show();
//是否存在未付款订单和超时订单！
//alert(Order.length);
if(Order.length>0){	
	for(var i=0 ;i < Order.length; i++){
		//每个未支付订单的下单时间
		var tackAt = Order[i].tackAt;
		var endAt = Order[i].endAt;
		var id = Order[i].id;
		var CarId = Order[i].c_id;
		var userId= Order[i].u_id;
		var payStatus = Order[i].payStatus;
		//如果订单状态为未付款
		if(payStatus==1){
			var DistanceDay = getDistanceDay(tackAt, current_time);
			//下单时间和当前系统时间相差大于0，即第二天，则取消订单，更新车辆状态，并给出系统提示。
			if (DistanceDay > 0) {
				//取消订单
				
				 //给出未支付订单取消提示
				warnUserUpayingOrder(userId,id);
				SystemCalOrder(id,userId);
			}
			
		}else{
			
			var DistanceDay = getDistanceDay(endAt, current_time);
			//判断订单结束时间是否大于系统时间
			if(DistanceDay>0){
				warnUserOverTimeOrder(userId,id);
			}
			continue;
			
		}
		
		
	}
	
}

//获取未支付和超时订单列表
function getOrderList(){
	var orderInfo;
	$.ajax({
		type : "post",
		contentType : "application/json",
		url : "order/selectOrderUpaingAndOvertime.ctrl",
		async : false,
		dataType : "json",
		success : function(data) {
			orderInfo = data.object;

		},
		error : function() {
			alert(error);
		}
	});
	return orderInfo;
}

//取消订单

function SystemCalOrder(id,userId){	
	//系统自动取消订单并提示用户
	var requestData = {
		id:id,
		userId:userId
	};
//	alert(requestData);
	//此处调用一样的取消接口
	$.ajax({
		type : "post",
		contentType : "application/json",
		url : "order/SystemOrderCal.ctrl",
		async : false,
		dataType : "json",
		data :JSON.stringify(requestData),
		success : function(data) {
			//	alert("删除成功");
		//	alert(data.object);
			console.log("系统取消订单"+data.object);
			if (data.object) {

				//alert("取消订单成功！");
				//更新车辆状态
				setTimeout(function() {
					backCar(CarId);
				}, 3000);

			} else {
			//	alert("取消订单失败！");
			}

		},
		error : function() {
			alert(error);
		}
	});

	
}



function backCar(CarId) {
	var Car = {
			CarId : CarId
	}

	$.ajax({ // 获取当前地址信息
		type : "post",
		contentType : "application/json",
		url : "car/updateCarStatusByCarId.ctrl",
		async : false,
		dataType : "json",
		data : JSON.stringify(Car),
		success : function(data) {
			console.log("更改车辆状态"+data.object);
			/*if (data.object) {
				alert( "成功更改车辆状态！");

			} else {
				alert( "更改车辆状态失败！");
			}*/

		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error:" + XMLHttpRequest + " " + textStatus + " "
					+ errorThrown);
		}
	});
}

//处理显示当前系统时间
function show() {
	var mydate = new Date();
	var str = "" + mydate.getFullYear() + "-";
	if ((mydate.getMonth() + 1) > 0 && (mydate.getMonth() + 1) < 10) {
		str += "0" + (mydate.getMonth() + 1) + "-";
	} else {
		str += (mydate.getMonth() + 1) + "-";
	}

	if (mydate.getDate() > 0 && mydate.getDate() < 10) {
		str += "0" + mydate.getDate();
	} else {
		str += mydate.getDate();
	}

	return str;
}

//比较下单时间和当前系统时间，如果当前系统时间之间相差1则自动取消订单，并提示用户，订单已取消
function getDistanceDay(dateBegin, dateEnd) {
	//比较两个日期间相差天数
	var distance;
	//转化日期格式
	var newdateBegin = new Date(dateBegin.replace("-", "/").replace("-", "/"));
	var newdateEnd = new Date(dateEnd.replace("-", "/").replace("-", "/"));
	var sDate = new Date(newdateBegin);
	var eDate = new Date(newdateEnd);
	var fen = ((eDate.getTime() - sDate.getTime()) / 1000) / 60;
	distance = parseInt(fen / (24 * 60)); //相隔distance天

	//	alert("相隔"+distance+"天");
	return distance;
}



function warnUserUpayingOrder(userId,id){
	var w_title="系统取消订单提醒";
	//alert(w_title);
	var w_body ="您的订单编号为"+id+"的订单未在规定时间内完成支付，系统已经为您自动取消！请注意及时支付订单！"
	//alert(w_body);
	var warn={
			userId:userId,	
			w_title:w_title,
			w_body:w_body
	}
	$.ajax({ 
		type: "post",
		contentType: "application/json",
		url : "warn/addSystemInfo.ctrl",
		async :false,
		dataType : "json",
		data:JSON.stringify(warn),
		success : function(data) {
		//	alert("删除成功");
		//	alert(data.object);
			console.log("消息提醒"+data.object);
			/*if(data.object){	
				alert("消息提醒成功！");			
				
				
			}else{
				alert("消息提醒失败");
			}
			*/
		},
		error : function() {
			alert(error);
		}
	});
	
}


function warnUserOverTimeOrder(userId,id){
	var w_title="订单超时提醒";
//	alert(w_title);
	var w_body ="您的订单编号为"+id+"的订单已经超时，请及时处理！"
//	alert(w_body);
	var warn={
			userId:userId,	
			w_title:w_title,
			w_body:w_body
	}
	$.ajax({ 
		type: "post",
		contentType: "application/json",
		url : "warn/addSystemInfo.ctrl",
		async :false,
		dataType : "json",
		data:JSON.stringify(warn),
		success : function(data) {
		//	alert("删除成功");
		//	alert(data.object);
			/*if(data.object){	
				alert("消息提醒成功！");				
				
				
			}else{
				alert("消息提醒失败");
			}*/
			
		},
		error : function() {
			alert(error);
		}
	});
	
}

