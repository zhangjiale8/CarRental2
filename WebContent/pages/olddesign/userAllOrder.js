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
				field : 'receivePhone',
				title : '手机号码',
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
			url : "order/searchUserAllOrder.ctrl",
			loadFilter : function(data) {
				console.log(data.object);
				return data.object
			}
});

 	
/** 表单保存按钮点击事件 */
$("#allOrderFormSave").click(function(){
	$('#allOrderForm').form('submit',{
    	url:'order/save.ctrl',
        onSubmit:function(param){
        //表单提交时统一验证
        return $(this).form('enableValidation').form('validate');
        },
       	success: function(data){
        	data = $.parseJSON(data);
        	var errorCode = data.errorCode;	//判断
        	if((!(typeof(errorCode) == "undefined")) && (errorCode == 444)){	//session过期
        		window.location.href="index.html"
        		return;
        	}
        	var object = data.object;
        	var error = data.error;
        	if(! (typeof(error) == "undefined")){
        		$('#orderForm').form('clear');
        		$.messager.alert({
        			title:'错误提示',
        			msg:error,
        			icon:"error"
        		});
        	}else {
        		$('#allOrderForm').form('clear');
        		$("#myallOrderWindow").window("close");
        		$("#allOrderInfo").datagrid("reload");
        		$.messager.show({
    				title:'提示',
    				msg:"保存成功",
    				showType:'slide',
    				timeout:1000
    			});
        	}
    	}
    });
});
/**删除事件*/
$("#orderDel").click(function(){
	var selectedData = $("#allOrderInfo").datagrid("getSelected");
	if(selectedData == null){	//判断是否有选中
		$.messager.alert({
			title:'错误提示',
			msg:"请单击要编辑行",
			icon:"error"
		});
	}else{
		var id=selectedData.id;
	    var requestData={"id":id};
	    alert(requestData);
		$.ajax({ 
			type: "get",
			contentType: "application/json",
			url : "order/del.ctrl",
			async :false,
			dataType : "json",
			data:requestData,
			success : function(data) {
			//	alert("删除成功");
				$("#orderInfo").datagrid("reload");
			},
			error : function() {
				alert(error);
			}
		});
	}
	
});
/** 表单取消按钮点击事件 */
$("#allOrderFormUndo").click(function(){
	$('#allOrderForm').form('clear');
	$("#myallOrderWindow").window("close");
});
/**
 * 博客信息条件查询
 */
function orderInfoSerch(){
	var isValid = $("#orderSearchForm").form('validate');
	if(! isValid){
		return;
	}
	var queryParams=new Object();
	var form_title,form_category;
	form_title = $('#orderSearchForm input[name="title"]').val();
	form_category = $('#orderSearchForm input[name="usercategoryid"]').val();
	""==form_category?null:queryParams.usercategoryid = form_category;
	""==form_title?null:queryParams.title = form_title;
	$('#orderInfo').datagrid('load',queryParams);
}

/**
 * 重置查询表单
 */
function orderInfoRedo(){
	$("#orderSearchForm").form("clear");
	$('#orderInfo').datagrid('load',{});
}
