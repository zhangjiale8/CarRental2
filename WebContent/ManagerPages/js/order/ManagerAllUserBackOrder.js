/**
 * 租赁单信息JS
 */
//alert("333");
// 表格设置
$("#ManagerAllUserBackOrderInfo").datagrid(
{
	title : '租赁单信息',
	fit : true,
	fitColumns : true,
	toolbar:"#ManagerAllUserBackOrderListTb",
	columns : [ [
			{
				field : 'id',
				title : '订单编号',
				width : 50,
				align : 'center',
			},
			{
				field : 'receiveName',
				title : '姓名',
				width : 50,
				align : 'center',
				
			},
			{
				field : 'receivePhone',
				title : '手机号码',
				width : 50,
				align : 'center',
			},
			{
				field : 'total',
				title : '订单总额',
				width : 50,
				align : 'center',
				
			},
			{
				field : 'license',
				title : '车牌号码',
				width : 50,
				align : 'center',
				
			},{
				field : 'brand',
				title : '车辆品牌',
				width : 50,
				align : 'center',
			},{
				field : 'c_type',
				title : '车辆类型',
				width : 50,
				align : 'center',
			},{
				field : 'receiveIdentity',
				title : '身份证号',
				width : 50,
				align : 'center',
			},{
				field : 'receiveAddress',
				title : '取车地址',
				width : 50,
				align : 'center',
			},{
				field : 'backAddress',
				title : '还车地址',
				width : 50,
				align : 'center',
			},{
				field : 'order_status_kind',
				title : '订单状态',
				width : 50,
				align : 'center',
			},
			{
				field : 'order_check_kind',
				title : '审核状态',
				width : 50,
				align : 'center',
			},{
				field : 'pay_status_kind',
				title : '支付状态',
				width : 50,
				align : 'center',
			},{
				field : 'back_status_kind',
				title : '还车状态',
				width : 50,
				align : 'center',
			},
			{
				field : 'startAt',
				title : '开始时间',
				width : 80,
				align : 'center',
				formatter : function(value, row, index) {
					return value == null ? '-' : new Date(value)
							.Format("yyyy-MM-dd");
				}
			},
			{
				field : 'endAt',
				title : '结束时间',
				width : 80,
				align : 'center',
				formatter : function(value, row, index) {
					return value == null ? '-' : new Date(value)
					.Format("yyyy-MM-dd");
				}
			},
			{
				field : 'backAt',
				title : '还车时间',
				width : 80,
				align : 'center',
				formatter : function(value, row, index) {
					return value == null ? '-' : new Date(value)
					.Format("yyyy-MM-dd");
				}
			}
			
			] ],
			border : false,
			pagination : true,
			pageNumber : 1,
			pageSize : 10,
			pageList : [ 10, 20, 30, 40 ],
			singleSelect : true,
			url : "order/searchManagerAllUserBackOrder.ctrl",
			loadFilter : function(data) {
				console.log(data.object);
				return data.object
			}
});

 	


/**
 * 用户订单条件查询
 */
function ManagerAllUserBackOrderInfoSerch(){
	var isValid = $("#ManagerAllUserBackOrderSearchForm").form('validate');
	if(! isValid){
		return;
	}
	var queryParams=new Object();
	var form_id,form_order_status_kind,form_order_check_kind,form_pay_status_kind;
	
	form_id = $('#ManagerAllUserBackOrderSearchForm input[name="id"]').val();
	form_order_status_kind = $('#ManagerAllUserBackOrderSearchForm input[name="order_status_kind"]').val();
	form_order_check_kind = $('#ManagerAllUserBackOrderSearchForm input[name="order_check_kind"]').val();
	form_pay_status_kind = $('#ManagerAllUserBackOrderSearchForm input[name="pay_status_kind"]').val();
	
	""==form_pay_status_kind?null:queryParams.pay_status_kind = form_pay_status_kind;
	""==form_order_check_kind?null:queryParams.order_check_kind = form_order_check_kind;
	""==form_order_status_kind?null:queryParams.order_status_kind = form_order_status_kind;
	""==form_id?null:queryParams.id = form_id;
	
	$('#ManagerAllUserBackOrderInfo').datagrid('load',queryParams);
}

/**
 * 重置查询表单
 */
function ManagerAllUserBackOrderInfoRedo(){
	//alert("222");
	$("#ManagerAllUserBackOrderSearchForm").form("clear");
	$('#ManagerAllUserBackOrderInfo').datagrid('load',{});
}


/** 编辑按钮点击事件 */
$("#orderEdit").click(function() {
	var selectedData = $("#ManagerAllUserBackOrderInfo").datagrid("getSelected");
	//selectedData.id=selectedData.carcategory.name;
	if(selectedData != null){	//判断是否有选中
		$('#ManagerAllUserBackOrderForm').form('load',selectedData);
		
		$("#ManagerAllUserBackOrderWindow").window({
			title : '查看订单',
			iconCls : 'icon-edit',
			shadow:true
		}).window("open");
	}else{
		$.messager.alert({
			title:'错误提示',
			msg:"请单击要编辑行",
			icon:"error"
		});
	}
});


/** 表单取消按钮点击事件 */
$("#ManagerAllUserBackOrderFormUndo").click(function(){
	$('#ManagerAllUserBackOrderForm').form('clear');
	$("#ManagerAllUserBackOrderWindow").window("close");
});





/**确认归还*/
$("#ManagerAllUserBackOrderOn").click(function(){
//	alert("zzz");
	var selectedData = $("#ManagerAllUserBackOrderInfo").datagrid("getSelected");
	if(selectedData == null){	//判断是否有选中
		$.messager.alert({
			title:'错误提示',
			msg:"请单击要编辑行",
			icon:"error"
		});
	}else{
		var id=selectedData.id;
		var order_status_kind = selectedData.order_status_kind;
	//	alert(order_status_kind);
		var order_check_kind = selectedData.order_check_kind;
		var pay_status_kind = selectedData.pay_status_kind;
		var total = selectedData.total;
		var license = selectedData.license;
		//alert(license);
		var endAt = selectedData.endAt;
		//显示系统时间
		var current_time = show();
		//订单结束时间与系统时间相差多少天
		var DistanceDay =getDistanceDay(endAt,current_time);
		//获取出租车辆信息
		var carInfo = getCarInfo(license);
		//获取订单信息
		var orderInfo = getOrderInfo(id);
		//alert("传过来的下单人信息id"+orderInfo.u_id);
		var userId =orderInfo.u_id;
		var userInfo = getUserInfo(userId);
		
		//alert("传过来的下单人信息账户余额"+userInfo.account);
		//判断订单状态1
		if(order_status_kind=="进行中"||order_status_kind=="续租"){
			//判断审核状态和支付状态2
			if(order_check_kind=="已审核"&&pay_status_kind=="已付款"){
				//判断订单是否超时，0是正好未超时，<0时则是提前还车，>0则是超时还车，且超时未超过一周
				if(DistanceDay==0){
					//首先归还车辆
					 backCar(license);
					 var carlevel= tackDepositAndfine(license);
						//alert("aaa"+carlevel.deposit);
					 //如果订单状态是进行中则直接还押金进行了，否则就是续租要在押金上扣除续租费用
					if(order_status_kind=="进行中"){
						//获取押金
						
						var newMoney = userInfo.account + carlevel.deposit;
						//返还押金		
					//	alert("扣除续租费用后的账户余额"+newMoney);
					}else{
						//获取汽车出租价格
						var price = carInfo.price;
					//	alert("获取的出租价格"+price);
						//获取押金
						var newMoney = userInfo.account + carlevel.deposit - price*2;
						//alert("扣除续租费用后的账户余额"+newMoney);			
					}
					//返还钱
					 backMoney(userId,newMoney);
					
					 //更新订单状态为完成
					endOrder(id);
					setTimeout(function(){
						$("#ManagerAllUserBackOrderInfo").datagrid("reload");
					},3000);
					
					
				}else if(DistanceDay<0){
					//首先归还车辆
					 backCar(license);
				//	alert("提前天数"+DistanceDay);
					//获取出租车辆价格
					var price = carInfo.price;
					//alert("获取的出租价格"+price);
					//多出的租赁金，不包括押金
					var spareMoney = price*(0-DistanceDay);
					//获取押金
					var carlevel= tackDepositAndfine(license);
					//alert("aaa"+carlevel.deposit);
					//扣除剩余钱的10%,以及多少天违约金
					var newMoney =userInfo.account + carlevel.deposit + spareMoney*0.9-carlevel.fine*(0-DistanceDay);
					//alert("提前扣除各种费用后的钱"+newMoney);
					//返还钱
					 backMoney(userId,newMoney);
					 //更新订单状态为完成
					endOrder(id);
					setTimeout(function(){
						$("#ManagerAllUserBackOrderInfo").datagrid("reload");
					},3000);
					
				}else{
					
					//alert("超时天数"+DistanceDay);					
					//首先归还车辆
					 backCar(license);
					//获取出租车辆价格
					var price = carInfo.price;
					//alert("获取的出租价格"+price);
					//多出的租赁金，不包括押金
					var spareMoney = price*(DistanceDay-0);
					//alert("应在付的钱"+spareMoney);
					//获取押金
					var carlevel= tackDepositAndfine(license);
					//alert("aaa"+carlevel.deposit);
					//扣除剩余钱的,以及多少天违约金
					if(order_status_kind=="进行中"){
						var newMoney = userInfo.account + carlevel.deposit - spareMoney-carlevel.fine*(DistanceDay-0);
						
					}else{
						var newMoney = userInfo.account + carlevel.deposit - spareMoney-carlevel.fine*(DistanceDay-0)-price*2;
					//	alert("续租后超时扣除各种费用后的账户余额"+newMoney);
					}
				
					//返还钱
					 backMoney(userId,newMoney);
					 //更新订单状态为完成
					endOrder(id);
					setTimeout(function(){
						$("#ManagerAllUserBackOrderInfo").datagrid("reload");
					},3000);
					
				}
				
				
				
			}else{
				$.messager.alert({
					title:'错误提示',
					msg:"当前订单不可还车！",
					icon:"error"
				});
			}
		//	if(order_status_kind=="进行中"&&order_check_kind=="已审核"&&pay_status_kind=="已付款")
			/*if(DistanceDay==0){
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
				//更新车辆信息
				backCar(license);
				//获取车辆等级信息
				var carlevel= tackDepositAndfine(license);
				alert("aaa"+carlevel.deposit+"bb"+carlevel.fine);
				//获取车辆出租价格
				var total = tackPrice(license);
				DistanceDay*fine
				
			}
			*/
			
			
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
function backMoney(userId,newaccount){
//	alert("userId"+userId);
//	alert("newaccount"+newaccount);
	var pay={
			userId:userId,
			newaccount:newaccount
	}
//	alert(pay);
	//获取汽车的押金
	$.ajax({ // 获取当前地址信息
		type: "post",
		contentType: "application/json",
		url : "user/ManagerUpdateUserAccount.ctrl",
		async : false,
		dataType : "json",
		data : JSON.stringify(pay),
		success : function(data) {
		//	alert("1111");
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
  //  alert(requestData);
	$.ajax({ 
		type: "post",
		contentType: "application/json",
		url : "order/endOrder.ctrl",
		async :false,
		dataType : "json",
		data:JSON.stringify(requestData),
		success : function(data) {
		//	alert("删除成功");
		//	alert(data.object);
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
		//	alert("1111");
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

//结束订单，即更改订单状态为完成
function endOrder(id){
	
    var requestData={
    		id:id
    		};
   // alert(requestData);
	$.ajax({ 
		type: "post",
		contentType: "application/json",
		url : "order/endOrder.ctrl",
		async :false,
		dataType : "json",
		data:JSON.stringify(requestData),
		success : function(data) {
		//	alert("删除成功");
			//alert(data.object);
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


//获取车辆出租价格
function getCarInfo(license){
	var Car={
			license:license
	}
	var carInfo;
	$.ajax({ // 获取当前地址信息
		type: "post",
		contentType: "application/json",
		url : "car/getCarInfo.ctrl",
		async : false,
		dataType : "json",
		data : JSON.stringify(Car),
		success : function(data) {
		//	alert("1111");
			if(data.object!=null){
				$.messager.alert({
					title:'信息提示',
					msg:"获取车辆信息成功！",
					icon:"ok"
				});	
				carInfo =data.object;
					
			
				
			}else{
				$.messager.alert({
					title:'信息提示',
					msg:"获取车辆信息失败！",
					icon:"error"
				});	
			}
					
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
		}
	});	
	return carInfo;
}

function getOrderInfo(id){
	var orderInfo;
	 var requestData={
	    		id:id
	    		};
	  //  alert(requestData);
		$.ajax({ 
			type: "post",
			contentType: "application/json",
			url : "order/selectOrderById.ctrl",
			async :false,
			dataType : "json",
			data:JSON.stringify(requestData),
			success : function(data) {
			//	alert("删除成功");
			//	alert(data.object);
				if(data.object!=null){	
					console.log(orderInfo);
					orderInfo =	data.object;
				//	alert("下订单的用户是"+orderInfo.u_id);
					
					
				}else{
					$.messager.alert({
						title:'错误提示',
						msg:"获取订单中uid失败！",
						icon:"error"
					});
				}
				
			},
			error : function() {
				alert(error);
			}
		});
	
		return orderInfo;
}


function getUserInfo(u_id){
	var userInfo;
	 var requestData={
			 u_id:u_id
	    		};
	 //   alert(requestData);
		$.ajax({ 
			type: "post",
			contentType: "application/json",
			url : "user/getUserInfoById.ctrl",
			async :false,
			dataType : "json",
			data:JSON.stringify(requestData),
			success : function(data) {
			//	alert("删除成功");
			//	alert(data.object);
				if(data.object!=null){	
					console.log(userInfo);
					userInfo =	data.object;					
					
					
				}else{
					$.messager.alert({
						title:'错误提示',
						msg:"获取订单中uid失败！",
						icon:"error"
					});
				}
				
			},
			error : function() {
				alert(error);
			}
		});
	
		return userInfo;
}