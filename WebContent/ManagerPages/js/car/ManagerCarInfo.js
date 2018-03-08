/**
 * 租赁单信息JS
 */
// 表格设置
$("#carInfo").datagrid(
{
	title : '租赁单信息',
	fit : true,
	fitColumns : true,
	toolbar:"#carListTb",
	columns : [ [
			{
				field : 'id',
				title : '汽车编号',
				width : 50,
				align : 'center',
			},
			{
				field : 'license',
				title : '车牌号码',
				width : 50,
				align : 'center',
			},
			{
				field : 'color',
				title : '汽车颜色',
				width : 50,
				align : 'center',
				
			},
			{
				field : 'brand',
				title : '车辆品牌',
				width : 80,
				align : 'center',
				
			},
			{
				field : 'c_type',
				title : '汽车类型',
				width : 80,
				align : 'center',
			},
			{
				field : 'displacement',
				title : '车辆排量',
				width : 80,
				align : 'center',
			},
			{
				field : 'level_kind',
				title : '车辆等级',
				width : 80,
				align : 'center',
			},
			{
				field : 'status_kind',
				title : '车辆状态',
				width : 80,
				align : 'center',
			},
			{
				field : 'price',
				title : '出租价格',
				width : 80,
				align : 'center',
				
			},
			{
				field : 'c_describe',
				title : '汽车描述',
				width : 80,
				align : 'center',
			}
			
			] ],
			border : false,
			pagination : true,
			pageNumber : 1,
			pageSize : 10,
			pageList : [ 10, 20, 30, 40 ],
			singleSelect : true,
			url : "searchAllCar.ctrl",
			loadFilter : function(data) {
				console.log(data.object);
				return data.object
			}
});

/** 编辑按钮点击事件 */
$("#carEdit").click(function() {
	var selectedData = $("#carInfo").datagrid("getSelected");
	//selectedData.id=selectedData.carcategory.name;
	if(selectedData != null){	//判断是否有选中
		$('#carForm').form('load',selectedData);
		
		$("#mycarWindow").window({
			title : '修改订单',
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
/** 表单保存按钮点击事件 */
$("#carFormSave").click(function(){
	/*$('#carForm').form('submit',{
    	url:'car/update.ctrl',
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
        		$('#carForm').form('clear');
        		$.messager.alert({
        			title:'错误提示',
        			msg:error,
        			icon:"error"
        		});
        	}else {
        		$('#carForm').form('clear');
        		$("#mycarWindow").window("close");
        		$("#carInfo").datagrid("reload");
        		$.messager.show({
    				title:'提示',
    				msg:"保存成功",
    				showType:'slide',
    				timeout:1000
    			});
        	}
    	}
    });*/
	var id = $('#carForm input[name="id"]').val(); 
	var license = $('#carForm input[name="license"]').val(); 
//	alert(license);
	var color = $('#carForm input[name="color"]').val(); 
	var brand=$('#carForm input[name="brand"]').val();
	var c_type=$('#carForm input[name="c_type"]').val();
	var displacement=$('#carForm input[name="displacement"]').val();	
	var level_kind=$('#carForm input[name="level_kind"]').val();	
//	alert($('#carForm input[name="level_kind"]').val());
	var c_level;
	var status_kind=$('#carForm input[name="status_kind"]').val(); 
	var c_status;
	var price=$('#carForm input[name="price"]').val();
	var c_describe=$('#carForm input[name="c_describe"]').val();
//	alert(!(level_kind!="经济型"||level_kind!="家用型"||level_kind!="商务型"||level_kind!="豪华型"));
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
	//	alert(c_level);
	//	alert(!(status_kind!="未租赁"||status_kind!="已租赁"||status_kind!="故障"||status_kind!="预定中"));
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
		//	alert(c_status);
			
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
			//alert(JSON.stringify(Car));
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
	
	
	
	
});
/**删除汽车信息*/

$("#carDel").click(function(){
	var selectedData = $("#carInfo").datagrid("getSelected");
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
			url : "car/delete.ctrl",
			async :false,
			dataType : "json",
			data:requestData,
			success : function(data) {
				$.messager.alert({
    				title:'错误提示',
    				msg:"删除车辆信息成功！",
    				icon:"ok"
    			});
				$("#carInfo").datagrid("reload");
			},
			error : function() {
				alert(error);
			}
		});
	}
	
});
/** 表单取消按钮点击事件 */
$("#carFormUndo").click(function(){
	$('#carForm').form('clear');
	$("#mycarWindow").window("close");
});
/**
 * 车辆信息条件查询
 */
function carInfoSearch(){
	var isValid = $("#carSearchForm").form('validate');
	if(! isValid){
		return;
	}
	var queryParams=new Object();
	var form_license,form_c_type,form_status_kind;
	form_license = $('#carSearchForm input[name="license"]').val();
//	alert($('#carSearchForm input[name="license"]').val());
	form_c_type = $('#carSearchForm input[name="c_type"]').val();
	form_status_kind = $('#carSearchForm input[name="status_kind"]').val();
	""==form_c_type?null:queryParams.c_type = form_c_type;
	""==form_license?null:queryParams.license = form_license;
	""==form_status_kind?null:queryParams.status_kind = form_status_kind;
	$('#carInfo').datagrid('load',queryParams);
}

/**
 * 重置查询表单
 */
function carInfoRedo(){
	$("#carSearchForm").form("clear");
	$('#carInfo').datagrid('load',{});
}
