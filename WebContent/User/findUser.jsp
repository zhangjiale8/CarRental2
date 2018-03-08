<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="../jquery-easyui-1.4.4/themes/metro/easyui.css" />
<link rel="stylesheet" type="text/css" href="../jquery-easyui-1.4.4/themes/icon.css" />
<script type="text/javascript" src="../jquery-easyui-1.4.4/jquery.min.js"></script>
<script type="text/javascript" src="../jquery-easyui-1.4.4/jquery.easyui.min.js"></script>
<script type="text/javascript" src="../jquery-easyui-1.4.4/locale/easyui-lang-zh_CN.js"></script>
<title>汽车租赁管理系统-用户查询</title>
	
</head>
<body>
	
	<table id="userList">
		</table>
	<div id="findUserTbID"  >
		<div class="easyui-panel" title="汽车租赁管理系统-用户查询">
			<form id="findUserFormID" method="post">
				<div >
						用户名：<input class="easyui-textbox" type="text" name="username"  />&nbsp;
						性别：<input class="easyui-textbox" type="text" name="sex"/>&nbsp;
						真实姓名：<input class="easyui-textbox" type="text" name="fullname"  />&nbsp;
					<a href="javascript:;" class="easyui-linkbutton" onclick="UserInfoSearch()" data-options="iconCls:'icon-search'" style="width:80px">查询</a>
					<a href="javascript:;" class="easyui-linkbutton" onclick="UserSearchRedo()" data-options="iconCls:'icon-redo'" style="width:80px">重置</a>
				</div>
				
			</form><br/>
			<div id="userInfoTb">
	<a id="userInfoEdit" href="javascript:;"
	class="easyui-linkbutton" data-options="iconCls:'icon-edit',text:'修改'"></a>
</div>
<!-- 新增/修改 window -->
<div id="userInfoWindow" class="easyui-window" style="width: 400px"
	data-options="collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false,closed:true,modal:true,closable:false">
	<div style="padding: 10px 60px 20px 10px">
		 <form id="userInfoForm" method="post">
		 	<table cellpadding="5">
		 	    <tr>
		 	    <td align="right">用户编号：</td>
		 			<td><input class="easyui-textbox" type="text" id="id" name="id" data-options="editable:false"/></td>
		 	    </tr>
		 		<tr>
		 			<td align="right">用户姓名：</td>
		 			<td><input class="easyui-textbox" type="text" id="username" name="username" data-options="editable:false"/></td>
		 		</tr>
		 		<tr>
		 			<td align="right">用户密码：</td>
		 			<td><input class="easyui-textbox" type="text" id="password" name="password" data-options="required:true" /></td>
		 		</tr>
		 		<tr>
		 			<td align="right">审核状态：</td>
		 			<td><input class="easyui-textbox" type="text" id="status" name="status" data-options="editable:false" /></td>
		 		</tr>
		 		<tr>
		 			<td align="right">性别：</td>
		 			<td>
		 			<select id="sex" class="easyui-combobox" id="sex" name="sex" style="width:200px;">   
                     <option>男</option>   
                     <option>女</option>   
                   </select>  
		 			</td>
		 		</tr>
		 		<tr>
		 			<td align="right">真实姓名：</td>
		 			<td><input class="easyui-textbox" type="text" id="fullname" name="fullname" data-options="required:true" /></td>
		 		</tr>
		 		<tr>
		 			<td align="right">身份证号：</td>
		 			<td><input class="easyui-textbox" type="text" id="identity" name="identity" data-options="required:true" /></td>
		 		</tr>
		 		<tr>
		 			<td align="right">手机号码：</td>
		 			<td><input class="easyui-textbox" type="text" id="phone" name="phone" data-options="required:true" /></td>
		 		</tr>
		 		<tr>
		 			<td align="right">邮箱：</td>
		 			<td><input class="easyui-textbox" type="text" id="email" name="email"  /></td>
		 		</tr>
		 		<tr>
		 			<td align="right">家庭住址：</td>
		 			<td><input class="easyui-textbox" type="text" id="address" name="address" data-options="required:true" /></td>
		 		</tr>
		 	</table>
		 </form>
	</div>
	<div style="text-align: center; padding: 5px;">
		<a id="userInfoSave" href="javascript:void(0);"	class="easyui-linkbutton" data-options="iconCls:'icon-ok',text:'保存'"></a>
		<a id="userInfoFormUndo" href="javascript:void(0);"	class="easyui-linkbutton" data-options="iconCls:'icon-undo',text:'取消'"></a>
	</div>
</div>
			
			<!-- 用户列表-->
		</div>
	</div>
	<!-- plug-in start -->
  <script type="text/javascript">
  
	$("#userList").datagrid({
		title : '用户信息列表',
		fit : true,
		fitColumns : true,
		toolbar:'#findUserTbID',
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
		singleSelect : true,
		url : "searchAllUser.ctrl",
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
	/**
	 * 会员条件查询
	 */
	function UserInfoSearch(){
		var isValid = $("#findUserFormID").form('validate');
		if(! isValid){
			return;
		}
		var queryParams=new Object();
		var form_username,form_sex,form_fullname;
		form_username = $('#findUserFormID input[name="username"]').val();
		form_sex = $('#findUserFormID input[name="sex"]').val();
		form_fullname = $('#findUserFormID input[name="fullname"]').val();
		
		""==form_username?null:queryParams.username = form_username;
		""==form_sex?null:queryParams.sex = form_sex;
		""==form_fullname?null:queryParams.fullname = form_fullname;
		
		$('#userList').datagrid('load',queryParams);
	}
	/**
	 * 重置查询表单
	 */
	function UserSearchRedo(){
		$("#findUserFormID").form("clear");
		$('#userList').datagrid('load',{});
	}

	
	</script>  
	
</body>


</html>