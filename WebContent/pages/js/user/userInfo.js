/**
 * 个人信息JS
 */
// 表格设置
$("#userInfo").datagrid(
		{
			title : '用户信息列表',
			fit : true,
			fitColumns : true,
			toolbar:'#userInfoTb',
			columns : [ [ {
				field : 'id',
				title : '用户编号',
				width : 30,
				align : 'center'
			},{
				field : 'username',
				title : '用户姓名',
				width : 80,
				align : 'center'
			},{
				field : 'status',
				title : '审核状态',
				width : 50,
				align : 'center'
			},{
				field : 'account',
				title : '账户余额',
				width : 50,
				align : 'center'
			},{
				field : 'sex',
				title : '性别',
				width : 50,
				align : 'center'
			},{
				field : 'fullname',
				title : '真实姓名',
				width : 50,
				align : 'center'
			},{
				field : 'identity',
				title : '身份证号',
				width : 50,
				align : 'center'
			},{
				field : 'phone',
				title : '手机号码',
				width : 50,
				align : 'center'
			},{
				field : 'email',
				title : '邮箱',
				width : 50,
				align : 'center'
			},{
				field : 'address',
				title : '家庭住址',
				width : 80,
				align : 'center'
				
			}
			] ],
			border : false,
			pagination : true,
			pageNumber : 1,
			pageSize : 10,
			pageList : [ 10, 20, 30, 40 ],
			//是否多选
			singleSelect : true,
			url : "searchUser.ctrl",
			loadFilter : function(data) {
				console.log(data.object);
				return data.object
			}
		});
/** 编辑按钮点击事件 */
$("#userInfoEdit").click(function() {
	var selectedData = $("#userInfo").datagrid("getSelected");
	if(selectedData != null){	//判断是否有选中
		$('#userInfoForm').form('load',selectedData);
		$("#userInfoWindow").window({
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
$("#userInfoSave").click(function(){
	$('#userInfoForm').form('submit',{
    	url:'userInfo/updateUser.ctrl',
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
        		$('#userInfoForm').form('clear');
        		$.messager.alert({
        			title:'错误提示',
        			msg:error,
        			icon:"error"
        		});
        	}else {
        		$('#userInfoForm').form('clear');
        		$("#userInfoWindow").window("close");
        		$("#userInfo").datagrid("reload");
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
/** 表单取消按钮点击事件 */
$("#userInfoFormUndo").click(function(){
	$('#userInfoForm').form('clear');
	$("#userInfoWindow").window("close");
});