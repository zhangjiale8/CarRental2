/**
 * 租赁单信息JS
 */
//alert("333");
// 表格设置
$("#userCheckingOrderInfo").datagrid(
{
	title : '租赁单信息',
	fit : true,
	fitColumns : true,
	toolbar:"#userCheckingOrderListTb",
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
			url : "order/searchUserCheckingOrder.ctrl",
			loadFilter : function(data) {
				console.log(data.object);
				return data.object
			}
});

 	

/**用户取消事件，不可真删除，只能更新订单状态*/
$("#userCheckingOrderCal").click(function(){
//	alert("zzz");
	var selectedData = $("#userCheckingOrderInfo").datagrid("getSelected");
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
		if(order_status_kind=="预定中"&&order_check_kind=="审核中"){
		//	alert(id);
		    var requestData={"id":id};
		 //   alert(requestData);
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
							$("#userCheckingOrderInfo").datagrid("reload");
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
function userCheckingOrderInfoSerch(){
	var isValid = $("#userCheckingOrderSearchForm").form('validate');
	if(! isValid){
		return;
	}
	var queryParams=new Object();
	var form_id,form_order_status_kind,form_order_check_kind,form_pay_status_kind;
	
	form_id = $('#userCheckingOrderSearchForm input[name="id"]').val();
	form_order_status_kind = $('#userCheckingOrderSearchForm input[name="order_status_kind"]').val();
	form_order_check_kind = $('#userCheckingOrderSearchForm input[name="order_check_kind"]').val();
	form_pay_status_kind = $('#userCheckingOrderSearchForm input[name="pay_status_kind"]').val();
	
	""==form_pay_status_kind?null:queryParams.pay_status_kind = form_pay_status_kind;
	""==form_order_check_kind?null:queryParams.order_check_kind = form_order_check_kind;
	""==form_order_status_kind?null:queryParams.order_status_kind = form_order_status_kind;
	""==form_id?null:queryParams.id = form_id;
	
	$('#userCheckingOrderInfo').datagrid('load',queryParams);
}

/**
 * 重置查询表单
 */
function userCheckingOrderInfoRedo(){
	//alert("222");
	$("#userCheckingOrderSearchForm").form("clear");
	$('#userCheckingOrderInfo').datagrid('load',{});
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
			//	alert(data.object.account);		
				account=data.object.account;
			//	alert("传出去的account"+account);
				
			}
							
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
		}
	});	
	
	
	
	var newaccount= (account-0)+(total-0);
//	alert(newaccount);
	
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
	var selectedData = $("#userCheckingOrderInfo").datagrid("getSelected");
	//selectedData.id=selectedData.carcategory.name;
	if(selectedData != null){	//判断是否有选中
		$('#userCheckingOrderForm').form('load',selectedData);
		
		$("#userCheckingOrderWindow").window({
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
$("#userCheckingOrderFormUndo").click(function(){
	$('#userCheckingOrderForm').form('clear');
	$("#userCheckingOrderWindow").window("close");
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

/** 表单保存按钮点击事件 *//*
$("#userCheckingOrderFormSave").click(function(){
	var id = $('#userCheckingOrderForm input[name="id"]').val(); 
	
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