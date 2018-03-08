/**
 * 个人信息JS
 */
// 表格设置
$("#SystemInfoUnReadedInfo").datagrid(
		{
			title : '系统信息列表',
			fit : true,
			fitColumns : true,
			toolbar:'#SystemInfoUnReadedInfoTb',
			columns : [ [ {
				field : 'id',
				title : '信息编号',
				width : 30,
				align : 'center'
			},{
				field : 'w_title',
				title : '信息标题',
				width : 50,
				align : 'center'
			},{
				field : 'w_body',
				title : '信息正文',
				width : 80,
				align : 'center'
			},{
				field : 'w_status',
				title : '信息状态',
				width : 50,
				align : 'center'
			},{
				field : 'w_publishAt',
				title : '发布时间',
				width : 50,
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
			//是否多选
			singleSelect : true,
			url : "systeminfo/searchSystemInfoUnReaded.ctrl",
			loadFilter : function(data) {
				console.log(data.object);
				return data.object
			}
		});


/** 编辑查看点击事件 */
$("#SystemInfoUnReadedInfoSee").click(function() {
	var selectedData = $("#SystemInfoUnReadedInfo").datagrid("getSelected");
	if(selectedData != null){	//判断是否有选中
		$('#SystemInfoUnReadedInfoForm').form('load',selectedData);
		
		$("#SystemInfoUnReadedInfoWindow").window({
			title : '修改个人信息',
			iconCls : 'icon-edit',
			shadow:true
		}).window("open");
		
		var id=selectedData.id;
		updateSystemInfoStatus(id);
	}else{
		$.messager.alert({
			title:'错误提示',
			msg:"请单击要编辑行",
			icon:"error"
		});
	}
});
/** 编辑按钮点击事件 */
$("#SystemInfoUnReadedInfoEdit").click(function() {
	var selectedData = $("#SystemInfoUnReadedInfo").datagrid("getSelected");
	if(selectedData != null){	//判断是否有选中
		$('#SystemInfoUnReadedInfoForm').form('load',selectedData);
		$("#SystemInfoUnReadedInfoWindow").window({
			title : '修改个人信息',
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
$("#SystemInfoUnReadedInfoSave").click(function(){
	$('#SystemInfoUnReadedInfoForm').form('submit',{
    	url:'SystemInfoUnReadedInfo/updateSystemInfoUnReaded.ctrl',
        onSubmit:function(param){
        	console.log(param);
        //表单提交时统一验证
        return $(this).form('enableValidation').form('validate');
        },
       	success: function(data){
        	data = $.parseJSON(data);
        	console.log(data);
        	var errorCode = data.errorCode;	//判断
        	if((!(typeof(errorCode) == "undefined")) && (errorCode == 444)){	//session过期
        		window.location.href="index.html"
        		return;
        	}
        	var object = data.object;
        	var error = data.error;
        	if(! (typeof(error) == "undefined")){
        		$('#SystemInfoUnReadedInfoForm').form('clear');
        		$.messager.alert({
        			title:'错误提示',
        			msg:error,
        			icon:"error"
        		});
        	}else {
        		$('#SystemInfoUnReadedInfoForm').form('clear');
        		$("#SystemInfoUnReadedInfoWindow").window("close");
        		$("#SystemInfoUnReadedInfo").datagrid("reload");
        		$.messager.show({
    				title:'提示',
    				msg:"修改个人信息成功",
    				showType:'slide',
    				timeout:6000
    			});
        	}
    	}
    });
});



/**用户删除事件，删除系统信息*/
$("#SystemInfoUnReadedInfoDel").click(function(){
	//alert("bbb");
	var selectedData = $("#SystemInfoUnReadedInfo").datagrid("getSelected");
	if(selectedData == null){	//判断是否有选中
		$.messager.alert({
			title:'错误提示',
			msg:"请单击要编辑行",
			icon:"error"
		});
	}else{
		var id=selectedData.id;
		    var requestData={
		    		id:id
		    		};
		//    alert(requestData);
			$.ajax({ 
				type: "get",
				contentType: "application/json",
				url : "systeminfo/searchSystemInfoDel.ctrl",
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
					$("#SystemInfoUnReadedInfo").datagrid("reload");
				},
				error : function() {
					alert(error);
				}
			});
			
		
		
	}
	
});


/**把系统信息标记成已读*/
$("#SystemInfoUnReadedInfoUpdate").click(function(){
//	alert("bbb");
	var selectedData = $("#SystemInfoUnReadedInfo").datagrid("getSelected");
	if(selectedData == null){	//判断是否有选中
		$.messager.alert({
			title:'错误提示',
			msg:"请单击要编辑行",
			icon:"error"
		});
	}else{
		var id=selectedData.id;
		updateSystemInfoStatus(id);
		
	}
	
});
/** 表单取消按钮点击事件 */
$("#SystemInfoUnReadedInfoFormUndo").click(function(){
	$('#SystemInfoUnReadedInfoForm').form('clear');
	$("#SystemInfoUnReadedInfoWindow").window("close");
});


function updateSystemInfoStatus(id){
	var requestData={
    		id:id
    		};
 //   alert(requestData);
	$.ajax({ 
		type: "get",
		contentType: "application/json",
		url : "systeminfo/SystemInfoUpdate.ctrl",
		async :false,
		dataType : "json",
		data:requestData,
		success : function(data) {
		//	alert("删除成功");
			if(data.object){
				$.messager.alert({
					title:'信息提示',
					msg:"已标记成已读！",
					icon:"ok"
				});
				$("#SystemInfoUnReadedInfo").datagrid("reload");
			}
			
		},
		error : function() {
			alert(error);
		}
	});
	
	
}