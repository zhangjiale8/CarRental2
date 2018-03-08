/**
 * 个人信息JS
 */
// 表格设置
$("#SystemInfoReadedInfo").datagrid(
		{
			title : '系统信息列表',
			fit : true,
			fitColumns : true,
			toolbar:'#SystemInfoReadedInfoTb',
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
			url : "systeminfo/searchSystemInfoReaded.ctrl",
			loadFilter : function(data) {
				console.log(data.object);
				return data.object
			}
		});
/** 编辑按钮点击事件 */
$("#SystemInfoReadedInfoEdit").click(function() {
	var selectedData = $("#SystemInfoReadedInfo").datagrid("getSelected");
	if(selectedData != null){	//判断是否有选中
		$('#SystemInfoReadedInfoForm').form('load',selectedData);
		$("#SystemInfoReadedInfoWindow").window({
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
/** 表单保存按钮点击事件 *//*
$("#SystemInfoReadedInfoSave").click(function(){
	$('#SystemInfoReadedInfoForm').form('submit',{
    	url:'SystemInfoReadedInfo/updateSystemInfoReaded.ctrl',
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
        		$('#SystemInfoReadedInfoForm').form('clear');
        		$.messager.alert({
        			title:'错误提示',
        			msg:error,
        			icon:"error"
        		});
        	}else {
        		$('#SystemInfoReadedInfoForm').form('clear');
        		$("#SystemInfoReadedInfoWindow").window("close");
        		$("#SystemInfoReadedInfo").datagrid("reload");
        		$.messager.show({
    				title:'提示',
    				msg:"修改个人信息成功",
    				showType:'slide',
    				timeout:6000
    			});
        	}
    	}
    });
});*/



/**用户删除事件，删除系统信息*/
$("#SystemInfoReadedInfoDel").click(function(){
//	alert("bbb");
	var selectedData = $("#SystemInfoReadedInfo").datagrid("getSelected");
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
					$("#SystemInfoReadedInfo").datagrid("reload");
				},
				error : function() {
					alert(error);
				}
			});
			
		
		
	}
	
});
/** 表单取消按钮点击事件 */
$("#SystemInfoReadedInfoFormUndo").click(function(){
	$('#SystemInfoReadedInfoForm').form('clear');
	$("#SystemInfoReadedInfoWindow").window("close");
});