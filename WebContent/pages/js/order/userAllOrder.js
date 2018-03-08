/**
 * 租赁单信息JS
 */
// 表格设置
$("#userAllOrderInfo").datagrid(
{
	title : '租赁单信息',
	fit : true,
	fitColumns : true,
	toolbar:"#userAllOrderListTb",
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
			url : "order/searchUserAllOrder.ctrl",
			loadFilter : function(data) {
				console.log(data.object);
				return data.object
			}
});

 	

/**用户删除事件，不可真删除，只能更新订单状态*/
$("#userAllOrderDel").click(function(){
	//alert("bbb");
	var selectedData = $("#userAllOrderInfo").datagrid("getSelected");
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
		if(order_status_kind=="完成"||order_status_kind=="已取消"){
		//	alert(id);
		    var requestData={"id":id};
		  //  alert(requestData);
			$.ajax({ 
				type: "get",
				contentType: "application/json",
				url : "order/updateUserDel.ctrl",
				async :false,
				dataType : "json",
				data:requestData,
				success : function(data) {
				//	alert("删除成功");
					$.messager.alert({
						title:'信息提示',
						msg:"删除成功！",
						icon:"ok"
					});
					$("#userAllOrderInfo").datagrid("reload");
				},
				error : function() {
					alert(error);
				}
			});
			
		}else{
			$.messager.alert({
				title:'错误提示',
				msg:"当前订单不可删除！",
				icon:"error"
			});
		}
		
	}
	
});

/**
 * 用户订单条件查询
 */
function userAllOrderInfoSerch(){
	var isValid = $("#userAllOrderSearchForm").form('validate');
	if(! isValid){
		return;
	}
	var queryParams=new Object();
	var form_id,form_order_status_kind,form_order_check_kind,form_pay_status_kind;
	
	form_id = $('#userAllOrderSearchForm input[name="id"]').val();
	form_order_status_kind = $('#userAllOrderSearchForm input[name="order_status_kind"]').val();
	form_order_check_kind = $('#userAllOrderSearchForm input[name="order_check_kind"]').val();
	form_pay_status_kind = $('#userAllOrderSearchForm input[name="pay_status_kind"]').val();
	
	""==form_pay_status_kind?null:queryParams.pay_status_kind = form_pay_status_kind;
	""==form_order_check_kind?null:queryParams.order_check_kind = form_order_check_kind;
	""==form_order_status_kind?null:queryParams.order_status_kind = form_order_status_kind;
	""==form_id?null:queryParams.id = form_id;
	
	$('#userAllOrderInfo').datagrid('load',queryParams);
}

/**
 * 重置查询表单
 */
function userAllOrderInfoRedo(){
	//alert("222");
	$("#userAllOrderSearchForm").form("clear");
	$('#userAllOrderInfo').datagrid('load',{});
}
