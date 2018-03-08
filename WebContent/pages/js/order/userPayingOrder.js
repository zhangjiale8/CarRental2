/**
 * 租赁单信息JS
 */
//alert("444");
// 表格设置
$("#userPayingOrderInfo").datagrid(
{
	title : '租赁单信息',
	fit : true,
	fitColumns : true,
	toolbar:"#userPayingOrderListTb",
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
			url : "order/searchUserPayingOrder.ctrl",
			loadFilter : function(data) {
				console.log(data.object);
				
				return data.object
			}
});

 	

/**用户取消事件，不可真删除，只能更新订单状态*/
$("#userPayingOrderCal").click(function(){
	//alert("zzz");
	var selectedData = $("#userPayingOrderInfo").datagrid("getSelected");
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
	//	alert(license);
		if(order_status_kind=="预定中"&&order_check_kind=="审核中"&&pay_status_kind=="未付款"){
		//	alert(id);
		    var requestData={"id":id};
		//    alert(requestData);
		    //此处调用一样的取消接口
			$.ajax({ 
				type: "get",
				contentType: "application/json",
				url : "order/userCheckingOrderCal.ctrl",
				async :false,
				dataType : "json",
				data:requestData,
				success : function(data) {
				//	alert("删除成功");
				//	alert(data.object);
					if(data.object){
						//此处返还金额
					
						$.messager.alert({
							title:'信息提示',
							msg:"取消订单成功！",
							icon:"ok"
						});
						//更新车辆状态
						setTimeout(function(){
							backCar(license);
						},3000);
						//更新车辆状态
						setTimeout(function(){
							$("#userPayingOrderInfo").datagrid("reload");
						},3000);
						
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
			
		}else{
			$.messager.alert({
				title:'错误提示',
				msg:"当前订单不可取消！",
				icon:"error"
			});
		}
		
	}
	
});

/**
 * 用户订单条件查询
 */
function userPayingOrderInfoSerch(){
	var isValid = $("#userPayingOrderSearchForm").form('validate');
	if(! isValid){
		return;
	}
	var queryParams=new Object();
	var form_id,form_order_status_kind,form_order_check_kind,form_pay_status_kind;
	
	form_id = $('#userPayingOrderSearchForm input[name="id"]').val();
	form_order_status_kind = $('#userPayingOrderSearchForm input[name="order_status_kind"]').val();
	form_order_check_kind = $('#userPayingOrderSearchForm input[name="order_check_kind"]').val();
	form_pay_status_kind = $('#userPayingOrderSearchForm input[name="pay_status_kind"]').val();
	
	""==form_pay_status_kind?null:queryParams.pay_status_kind = form_pay_status_kind;
	""==form_order_check_kind?null:queryParams.order_check_kind = form_order_check_kind;
	""==form_order_status_kind?null:queryParams.order_status_kind = form_order_status_kind;
	""==form_id?null:queryParams.id = form_id;
	
	$('#userPayingOrderInfo').datagrid('load',queryParams);
}

/**
 * 重置查询表单
 */
function userPayingOrderInfoRedo(){
	//alert("222");
	$("#userPayingOrderSearchForm").form("clear");
	$('#userPayingOrderInfo').datagrid('load',{});
}



/** 编辑按钮点击事件 */
$("#orderPayingEdit").click(function() {
	//alert("mmm");
	var selectedData = $("#userPayingOrderInfo").datagrid("getSelected");
	//selectedData.id=selectedData.carcategory.name;
	if(selectedData != null){	//判断是否有选中
		$('#userPayingOrderForm').form('load',selectedData);
		
		$("#userPayingOrderWindow").window({
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
$("#userPayingOrderFormUndo").click(function(){
	$('#userPayingOrderForm').form('clear');
	$("#userPayingOrderWindow").window("close");
});




/**用户支付订单 如果用户当天不支付则自动取消订单*/
$("#userPayingOrderPay").click(function(){
	//alert("zzz");
	var selectedData = $("#userPayingOrderInfo").datagrid("getSelected");
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
	//	alert(license);
		//获取下单时间
		var tackAt =getTackAt(id);
		var  current_time =show();
		var DistanceDay =getDistanceDay(tackAt,current_time);
	//	alert(DistanceDay+"相隔多少天");
		if(order_status_kind=="预定中"&&order_check_kind=="审核中"&&pay_status_kind=="未付款"){
			if(DistanceDay>0){
				//系统自动取消订单并提示用户
				$.messager.alert({
					title:'信息提示',
					msg:"订单在一天内未支付系统将自动取消此订单！",
					icon:"ok"
				});
				setTimeout(function(){
					 var requestData={"id":id};
					//    alert(requestData);
					    //此处调用一样的取消接口
						$.ajax({ 
							type: "get",
							contentType: "application/json",
							url : "order/userCheckingOrderCal.ctrl",
							async :false,
							dataType : "json",
							data:requestData,
							success : function(data) {
							//	alert("删除成功");
							//	alert(data.object);
								if(data.object){
									
								
									$.messager.alert({
										title:'信息提示',
										msg:"取消订单成功！",
										icon:"ok"
									});
									//更新车辆状态
									setTimeout(function(){
										backCar(license);
									},3000);
									//更新车辆状态
									setTimeout(function(){
										$("#userPayingOrderInfo").datagrid("reload");
									},3000);
									
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
						
					
					
				},3000);
				
				
				
			}else{
				
				//此处获取用户的账户余额
				  var account = profile();
				  //当天支付的订单
				//更新订单支付状态,并从用户账户余额扣除租赁金
				  updateOrderPayStatus(account,total,id);
			}
		 
			
			
		}else{
			$.messager.alert({
				title:'错误提示',
				msg:"当前订单不支付！",
				icon:"error"
			});
		}
		
	}
	
});

//获取用户余额
function profile(){
	var account;
	//获取当前用户的账户余额
	$.ajax({ // 获取当前地址信息
		type: "post",
		contentType: "application/json",
		url : "getLoginUserInfo.ctrl",
		async : false,
		dataType : "json",
		success : function(data) {
		//	alert("获取user信息");
			if(data.object==null){
				alert(error);
			}else{
				account = data.object.account;
			//	alert(account);
									
				
			}
							
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
		}
	});	
	return account;
}

//更新订单支付状态,并从用户账户余额扣除租赁金
function updateOrderPayStatus(account,total,id){
	//alert("传过来的account"+account);
//	alert("传过来的total"+total);
	var newaccount = account-total;
//	alert("newaccount"+newaccount);
	var orderId= id;
	var pay={
			newaccount:newaccount,
			orderId:orderId
	}
	
	//获取汽车的押金
	$.ajax({ // 获取当前地址信息
		type: "post",
		contentType: "application/json",
		url : "order/updateOrderPayStatus.ctrl",
		async : false,
		dataType : "json",
		data : JSON.stringify(pay),
		success : function(data) {
		//	alert("1111");
			if(data.object){
				$.messager.alert({
					title:'信息提示',
					msg:"支付完成！谢谢使用本系统预约车辆！请等待订单审核！",
					icon:"ok"
				});	
				
				setTimeout(function(){
					$("#userPayingOrderInfo").datagrid("reload");
				},3000);
				
				
				
			}else{
				$.messager.alert({
					title:'信息提示',
					msg:data.error,
					icon:"error"
				});	
			}
					
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
		}
	});	
	
	
}

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
			//alert("1111");
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

//获取下单时间
function getTackAt(id){
	var tackAt;
	 var requestData={
			 id:id
			 };
	  //  alert(requestData);
	    //此处调用一样的取消接口
		$.ajax({ 
			type: "post",
			contentType: "application/json",
			url : "order/selectOrderById.ctrl",
			async :false,
			dataType : "json",
			data:JSON.stringify(requestData),
			success : function(data) {
				if(data.object!=null){
				//	alert(data.object.tackAt);
					tackAt = data.object.tackAt;
				}else{
					$.messager.alert({
						title:'错误提示',
						msg:"获取下单时间失败！",
						icon:"error"
					});
				}
				
			},
			error : function() {
				alert(error);
			}
		});
		
	



		return tackAt;

}



/** 表单保存按钮点击事件 *//*
$("#userPayingOrderFormSave").click(function(){
	var id = $('#userPayingOrderForm input[name="id"]').val(); 
	
	var c_type=$('#carForm input[name="c_type"]').val();
	var displacement=$('#carForm input[name="displacement"]').val();	
	var level_kind=$('#carForm input[name="level_kind"]').val();	
	alert($('#carForm input[name="level_kind"]').val());
	var c_level;
	var status_kind=$('#carForm input[name="status_kind"]').val(); 
	var c_status;
	var price=$('#carForm input[name="price"]').val();
	var c_describe=$('#carForm input[name="c_describe"]').val();
	alert(!(level_kind!="经济型"||level_kind!="家用型"||level_kind!="商务型"||level_kind!="豪华型"));
	//判断取到的level_kind是不是空的，不是在判断status_kind
	if(!(level_kind!="经济型"||level_kind!="家用型"||level_kind!="商务型"||level_kind!="豪华型")){
		$.messager.alert({
			title:'错误提示',
			msg:"请填写车辆等级！",
			icon:"error"
		});
	}else{
		if(level_kind=="经济型"){
			c_level=1;
		}else if(level_kind=="家用型"){
			c_level=2;
		}else if(level_kind=="商务型"){
			c_level=3;
		}else if(level_kind=="豪华型"){
			c_level=4;
		}
		alert(c_level);
		alert(!(status_kind!="未租赁"||status_kind!="已租赁"||status_kind!="故障"||status_kind!="预定中"));
		if(!(status_kind!="未租赁"||status_kind!="已租赁"||status_kind!="故障"||status_kind!="预定中")){
			$.messager.alert({
				title:'错误提示',
				msg:"请填写车辆状态！",
				icon:"error"
			});
		}else{
			
			if(status_kind=="未租赁"){
				c_status=1;
			}else if(status_kind=="已租赁"){
				c_status=2;
			}else if(status_kind=="故障"){
				c_status=3;
			}else if(status_kind=="预定中"){
			c_status=4;
		}
			alert(c_status);
			
			var Car={
					id:id,
					license:license,
					color:color,
					brand:brand,
					c_type:c_type,
					displacement:displacement,
					c_level:c_level,
					c_status:c_status,
					price:price,
					c_describe:c_describe
			    }; 
			alert(JSON.stringify(Car));
			$.ajax({ // 更新用户信息
				type: "post",
				contentType: "application/json",
				url : "car/updateCar.ctrl",
				async : false,
				data: JSON.stringify(Car),
				dataType : "json",
				success : function(data) {
		        	var error = data.error;
		            if(! (typeof(error) == "undefined")){
		        		alert(error);
		        	}else {
		        		$.messager.alert({
		    				title:'错误提示',
		    				msg:"修改车辆信息成功！",
		    				icon:"ok"
		    			});
		        		$("#carInfo").datagrid("reload");
		        	}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
				}
				});
			}
		}
	
	
	
	
});*/