/**
 * 租赁单信息JS
 */
//alert("333");
// 表格设置
$("#ManagerAllUserOrderInfo").datagrid(
{
	title : '租赁单信息',
	fit : true,
	fitColumns : true,
	toolbar:"#ManagerAllUserOrderListTb",
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
			url : "order/searchManagerAllUserOrder.ctrl",
			loadFilter : function(data) {
				console.log(data.object);
				return data.object
			}
});

 	

/**用户取消事件，不可真删除，只能更新订单状态*/
$("#ManagerAllUserOrderCal").click(function(){
//	alert("zzz");
	var selectedData = $("#ManagerAllUserOrderInfo").datagrid("getSelected");
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
		if(order_status_kind=="预定中"&&order_check_kind=="审核中"){
		//	alert(id);
		    var requestData={"id":id};
		 //   alert(requestData);
			$.ajax({ 
				type: "get",
				contentType: "application/json",
				url : "order/ManagerAllUserOrderCal.ctrl",
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
						//此处返还金额
						setTimeout(function(){
							backMoney(total);
						},3000);
						
						//更新车辆状态
						setTimeout(function(){
							backCar(license);
						},3000);
						//更新车辆状态
						setTimeout(function(){
							$("#ManagerAllUserOrderInfo").datagrid("reload");
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
function ManagerAllUserOrderInfoSerch(){
	var isValid = $("#ManagerAllUserOrderSearchForm").form('validate');
	if(! isValid){
		return;
	}
	var queryParams=new Object();
	var form_id,form_order_status_kind,form_order_check_kind,form_pay_status_kind;
	
	form_id = $('#ManagerAllUserOrderSearchForm input[name="id"]').val();
	form_order_status_kind = $('#ManagerAllUserOrderSearchForm input[name="order_status_kind"]').val();
	form_order_check_kind = $('#ManagerAllUserOrderSearchForm input[name="order_check_kind"]').val();
	form_pay_status_kind = $('#ManagerAllUserOrderSearchForm input[name="pay_status_kind"]').val();
	
	""==form_pay_status_kind?null:queryParams.pay_status_kind = form_pay_status_kind;
	""==form_order_check_kind?null:queryParams.order_check_kind = form_order_check_kind;
	""==form_order_status_kind?null:queryParams.order_status_kind = form_order_status_kind;
	""==form_id?null:queryParams.id = form_id;
	
	$('#ManagerAllUserOrderInfo').datagrid('load',queryParams);
}

/**
 * 重置查询表单
 */
function ManagerAllUserOrderInfoRedo(){
	//alert("222");
	$("#ManagerAllUserOrderSearchForm").form("clear");
	$('#ManagerAllUserOrderInfo').datagrid('load',{});
}

function backMoney(total){
	var account;
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
				//alert(data.object.account);		
				account=data.object.account;
				//alert("传出去的account"+account);
				
			}
							
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
		}
	});	
	
	
	
	var newaccount= (account-0)+(total-0);
	//alert(newaccount);
	
	var pay={
			newaccount:newaccount
	}
	//alert(pay);
	//获取汽车的押金
	$.ajax({ // 获取当前地址信息
		type: "post",
		contentType: "application/json",
		url : "user/updateUserAccount.ctrl",
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


/** 编辑按钮点击事件 */
$("#orderEdit").click(function() {
	var selectedData = $("#ManagerAllUserOrderInfo").datagrid("getSelected");
	//selectedData.id=selectedData.carcategory.name;
	if(selectedData != null){	//判断是否有选中
		$('#ManagerAllUserOrderForm').form('load',selectedData);
		
		$("#ManagerAllUserOrderWindow").window({
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



/** 编辑按钮点击事件 */
$("#orderUpdate").click(function() {
	var selectedData = $("#ManagerAllUserOrderInfo").datagrid("getSelected");
	//selectedData.id=selectedData.carcategory.name;
	if(selectedData != null){	//判断是否有选中
		$('#ManagerAllUserUpdateOrderForm').form('load',selectedData);
		
		$("#ManagerAllUserUpdateOrderWindow").window({
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
$("#ManagerAllUserUpdateOrderFormUndo").click(function(){
	$('#ManagerAllUserUpdateOrderForm').form('clear');
	$("#ManagerAllUserUpdateOrderWindow").window("close");
});

/** 表单取消按钮点击事件 */
$("#ManagerAllUserOrderFormUndo").click(function(){
	$('#ManagerAllUserOrderForm').form('clear');
	$("#ManagerAllUserOrderWindow").window("close");
});



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

/** 表单保存按钮点击事件 */
$("#ManagerAllUserUpdateOrderFormSave").click(function(){
//	alert("zzz");
	var selectedData = $("#ManagerAllUserOrderInfo").datagrid("getSelected");
	//selectedData.id=selectedData.carcategory.name;
	if(selectedData != null){	//判断是否有选中
		var id=selectedData.id;
	//	alert("Id="+id);
		var order_status_kind = selectedData.order_status_kind;
		//alert("order_status_kind="+order_status_kind);
		var startAt = selectedData.startAt;
		
		var endAt = selectedData.endAt;
		//alert("....old"+startAt);
		var newstartAt=$('#ManagerAllUserUpdateOrderForm input[name="startAt"]').val();
		var newendAt=$('#ManagerAllUserUpdateOrderForm input[name="endAt"]').val();
		//alert("...new"+newstartAt);
		var currentTime = show();
		var Distance2 = getDistanceDay(newstartAt,currentTime);
		var Distance3 = getDistanceDay(newstartAt,newendAt);
		var Distance4 = getDistanceDay(endAt,newendAt);
		var backAt = selectedData.backAt;
	//	alert("backAt"+backAt);
		if(backAt==undefined){
			if(order_status_kind=="续租"||order_status_kind=="进行中"||order_status_kind=="预定中"){
				if(order_status_kind=="续租"||order_status_kind=="进行中"){
					if(Distance4>0||Distance4==0){
						updateOrder(id,startAt,newendAt);
						$("#ManagerAllUserOrderInfo").datagrid("reload");
						$('#ManagerAllUserUpdateOrderForm').form('clear');
						$("#ManagerAllUserUpdateOrderWindow").window("close");
					}else{
						$.messager.alert({
							title:'错误提示',
							msg:"修改后的结束时间必须大于之前的结束时间！",
							icon:"error"
						});
					}
					
					
				}else{
					if(Distance2<0||Distance2==0){
						if(Distance3>0||Distance3==0){
							updateOrder(id,newstartAt,newendAt);
							$("#ManagerAllUserOrderInfo").datagrid("reload");
							$('#ManagerAllUserUpdateOrderForm').form('clear');
							$("#ManagerAllUserUpdateOrderWindow").window("close");
						}else{
							$.messager.alert({
								title:'错误提示',
								msg:"新的结束时间，必须大于等于开始时间！",
								icon:"error"
							});
						}
						
					}else{
						$.messager.alert({
							title:'错误提示',
							msg:"新的开始时间必须大于等于系统时间！",
							icon:"error"
						});
					}
					
				}
				
			}else{
				$.messager.alert({
					title:'错误提示',
					msg:"当前订单不可修改！",
					icon:"error"
				});
			}
		}else{
			$.messager.alert({
				title:'错误提示',
				msg:"当前订单不可修改！",
				icon:"error"
			});
		}
		
	}else{
		$.messager.alert({
			title:'错误提示',
			msg:"请单击要编辑行",
			icon:"error"
		});
	
	}
});



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


function updateOrder(id,startAt,endAt){
		
	var Order={
			id:id,
			startAt:startAt,
			endAt:endAt
			
	}
	
	$.ajax({ // 获取当前地址信息
		type: "post",
		contentType: "application/json",
		url : "order/ManagerUpdateOrder.ctrl",
		async : false,
		dataType : "json",
		data : JSON.stringify(Order),
		success : function(data) {
		//	alert("1111");
			if(data.object){
				
					$.messager.alert({
					title:'信息提示',
					msg:"更新订单信息成功！",
					icon:"ok"
				});	
			
				
			}else{
				$.messager.alert({
					title:'信息提示',
					msg:"更新订单信息失败！",
					icon:"error"
				});	
			}
					
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
		}
	});	
}