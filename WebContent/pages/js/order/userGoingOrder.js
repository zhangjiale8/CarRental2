/**
 * 租赁单信息JS
 */
//alert("333");
// 表格设置
$("#userGoingOrderInfo").datagrid(
{
	title : '租赁单信息',
	fit : true,
	fitColumns : true,
	toolbar:"#userGoingOrderListTb",
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
			url : "order/searchUserGoingOrder.ctrl",
			loadFilter : function(data) {
				console.log(data.object);
				return data.object
			}
});

 	


/**
 * 用户订单条件查询
 */
function userGoingOrderInfoSerch(){
	var isValid = $("#userGoingOrderSearchForm").form('validate');
	if(! isValid){
		return;
	}
	var queryParams=new Object();
	var form_id,form_order_status_kind,form_order_check_kind,form_pay_status_kind;
	
	form_id = $('#userGoingOrderSearchForm input[name="id"]').val();
	form_order_status_kind = $('#userGoingOrderSearchForm input[name="order_status_kind"]').val();
	form_order_check_kind = $('#userGoingOrderSearchForm input[name="order_check_kind"]').val();
	form_pay_status_kind = $('#userGoingOrderSearchForm input[name="pay_status_kind"]').val();
	
	""==form_pay_status_kind?null:queryParams.pay_status_kind = form_pay_status_kind;
	""==form_order_check_kind?null:queryParams.order_check_kind = form_order_check_kind;
	""==form_order_status_kind?null:queryParams.order_status_kind = form_order_status_kind;
	""==form_id?null:queryParams.id = form_id;
	
	$('#userGoingOrderInfo').datagrid('load',queryParams);
}

/**
 * 重置查询表单
 */
function userGoingOrderInfoRedo(){
//	alert("222");
	$("#userGoingOrderSearchForm").form("clear");
	$('#userGoingOrderInfo').datagrid('load',{});
}



/** 编辑按钮点击事件 */
$("#orderGoingEdit").click(function() {
	//alert("ccc");
	var selectedData = $("#userGoingOrderInfo").datagrid("getSelected");
	//selectedData.id=selectedData.carcategory.name;
	if(selectedData != null){	//判断是否有选中
		$('#userGoingOrderForm').form('load',selectedData);
		
		$("#userGoingOrderWindow").window({
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
$("#userGoingOrderFormUndo").click(function(){
	$('#userGoingOrderForm').form('clear');
	$("#userGoingOrderWindow").window("close");
});





/**用户续租车辆*/
$("#userGoingOrderLease").click(function(){
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
	//	alert(order_status_kind);
		var oldendAt = selectedData.endAt;
	//	alert(oldendAt);
		if(order_status_kind=="续租"){
			$.messager.alert({
				title:'错误提示',
				msg:"每个订单只可续租一次！请勿多次续租！如若急需再次续租请与管理员！联系电话13655246248",
				icon:"error"
			});
			
		}else{
			if(order_status_kind=="进行中"){
				//续租延时两天后时间
				var endAt = delayTime(oldendAt);
			//	alert(endAt);
				var current_time = show();
				//延迟订单，更改订单状态，更改订单结束时间
				var DistanceDay =getDistanceDay(oldendAt,current_time);
			//	alert(DistanceDay);
				if(DistanceDay>0){
					$.messager.alert({
						title:'错误提示',
						msg:"此订单已超时！请及时还车！本系统不支持超时订单续租！如有疑问请联系系统管理员！联系电话13655246248",
						icon:"error"
					});
				}else{
					delayOrder(id,endAt);
				}
				
				
				
			}else{
				$.messager.alert({
					title:'错误提示',
					msg:"当前订单不可续租！",
					icon:"error"
				});
			}
		}
		
	}
	
});

/**用户还车，只是更新还车状态，不是真正的还车*/
$("#userGoingOrderBack").click(function(){
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
	//	alert(order_status_kind);
		var endAt = selectedData.endAt;
	//	alert(endAt);
		if(order_status_kind=="续租"||order_status_kind=="进行中"){
			
			if(order_status_kind=="续租"){
				//获取当前时间
				var current_time = show();
				//比较结束时间和当前时间
				var DistanceDay =getDistanceDay(endAt,current_time);
				if(DistanceDay<0){
					$.messager.alert({
						title:'信息提示',
						msg:"续租订单不可提前还车，如若急需还车请与管理员联系！联系电话13655246248",
						icon:"error"
					});
				}else{
					//获取当前时间
					var current_time = show();
				//	alert(",,,"+current_time);
					//比较结束时间和当前时间
					var DistanceDay =getDistanceDay(endAt,current_time);
			//		alert("续租订单超时天数"+DistanceDay);
					if(DistanceDay>7){
						$.messager.alert({
							title:'信息提示',
							msg:"本系统不支持超时一周以上的订单提交还车申请，可及时与管理员联系还车，联系电话13655246248，如果长时间不还车，我们将通过法律手段进行强制还车！",
							icon:"error"
						});
					}else{
						userEndOrder(id);
					}
					
				
				}
				
			}else{
				
				//获取当前时间
				var current_time = show();
			//	alert(",,,"+current_time);
				//比较结束时间和当前时间
				var DistanceDay =getDistanceDay(endAt,current_time);
			//	alert("超时天数"+DistanceDay);
				if(DistanceDay>7){
					$.messager.alert({
						title:'信息提示',
						msg:"本系统不支持超时一周以上的订单提交还车申请，可及时与管理员联系还车，联系电话13655246248，如果长时间不还车，我们将通过法律手段进行强制还车！",
						icon:"error"
					});
				}else{
					userEndOrder(id);
				}
				
				
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


//用户还车

function userEndOrder(id){
	
	var requestData={
    		id:id
    		};
  //  alert(requestData);
	$.ajax({ 
		type: "post",
		contentType: "application/json",
		url : "order/userEndOrder.ctrl",
		async :false,
		dataType : "json",
		data:JSON.stringify(requestData),
		success : function(data) {
		//	alert("删除成功");
		//	alert(data.object);
			if(data.object){				
				
				$.messager.alert({
					title:'信息提示',
					msg:"还车成功！",
					icon:"ok"
				});
				$("#userGoingOrderInfo").datagrid("reload");
				
			}else{
				$.messager.alert({
					title:'错误提示',
					msg:"还车失败！",
					icon:"error"
				});
			}
			
		},
		error : function() {
			alert(error);
		}
	});
	
	
}


//某个日期两天后的时间
function delayTime(oldendAt){	
//	var s = "2009-06-22";
	var dt = Date.parse(oldendAt.replace(/-/g,"/"));	
	var date1 = new Date(dt);
//	alert(date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate())
	var date2 = new Date(date1);
	date2.setDate(date1.getDate()+2);
	var times = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
//	alert(times);
	return times;
}

//延时订单
function delayOrder(id,endAt){
	//alert();
	var requestData={
    		id:id,
    		endAt:endAt
    		};
  //  alert(requestData);
	$.ajax({ 
		type: "post",
		contentType: "application/json",
		url : "order/delayOrder.ctrl",
		async :false,
		dataType : "json",
		data:JSON.stringify(requestData),
		success : function(data) {
		//	alert("删除成功");
		//	alert(data.object);
			if(data.object){				
				
				$.messager.alert({
					title:'信息提示',
					msg:"续租成功！",
					icon:"ok"
				});
				$("#userGoingOrderInfo").datagrid("reload");
				
			}else{
				$.messager.alert({
					title:'信息提示',
					msg:"续租失败！",
					icon:"error"
				});
			}
			
		},
		error : function() {
			alert(error);
		}
	});
	
}
