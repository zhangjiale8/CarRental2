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
<title>汽车租赁管理系统-更改客户信息</title>
</head>
<body>
	<div id="registerDiv" style="width: 250px" >
		<div class="easyui-panel" title="汽车租赁管理系统-更改客户信息" >
			<form id="update">
				<div>
					用&nbsp;&nbsp;户&nbsp;&nbsp;名：<input id="usernameId" class="easyui-textbox" name="username"  data-options="prompt:'用户名',iconCls:'icon-man',iconWidth:38,required:true,validType:['username']">
				</div><br/>
				<div >
					性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：
					<select class="easyui-combobox" id="sexId" name="sex" style="width:100px;">
						<option value="男">男</option>
						<option value="女">女</option>
					</select>
				</div><br/>
				<div >
					真实姓名：<input id="fullnameId" class="easyui-textbox" name="fullname"  data-options="prompt:'真实姓名',iconCls:'icon-man',iconWidth:38">
				</div><br/>
				<div >
					身份证号：<input id="identityId" class="easyui-textbox" name="identity"  data-options="prompt:'身份证号',iconWidth:38">
				</div><br/>
				<div >
					手机号码：<input id="phoneId" class="easyui-textbox" name="phone"  data-options="prompt:'手机号码',iconWidth:38,validType:['mobileNumber']">
				</div><br/>
				<div >
					邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：<input id="emailId" class="easyui-textbox" name="email"  data-options="prompt:'邮箱',iconWidth:38,validType:['email']">
				</div><br/>
				<div >
					家庭住址：<input id="addressId" class="easyui-textbox" name="address"  data-options="prompt:'家庭住址',iconWidth:38">
				</div>

			</form><br/><br/>
			<div>&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:void(0);" class="easyui-linkbutton" onclick="submitSearchForm()" data-options="iconCls:'icon-ok'" > <span style="font-size: 14px;">查询</span>
				</a>&nbsp;
				<a  class="easyui-linkbutton" onclick="updateForm()" data-options="iconCls:'icon-help'" > <span style="font-size: 14px;">修改</span>	
				</a>&nbsp;
				<a  class="easyui-linkbutton" onclick="clearForm()" data-options="iconCls:'icon-help'" > <span style="font-size: 14px;">重置</span>
				</a>	
			</div>
		</div>
	</div>
	
	
	<script type="text/javascript" >
	function submitSearchForm(){
		//根据用户名查询到当前要修改的用户信息
		var username = $('#update input[name="username"]').val();
		alert($('#update input[name="username"]').val());
		$.ajax({ 
			type: "post",
			contentType: "application/json",
			url : "../searchUserByUserName.ctrl",
			async : false,
			data:{
				 "username":username
		    },
			dataType : "json",
			success : function(data) {
	        		//	alert(data.object.username);
	        			//$("#usernameId").val(data.object.username);
	        		/* 	$("#sexId").val(data.object.sex);
	        			$("#fullnameId").val(data.object.fullname);
	        			$("#identityId").val(data.object.identity);
	        			$("#phoneId").val(data.object.phone);
	        			$("#emailId").val(data.object.emailId);
	        			$("#addressId").val(data.object.address); */
	 
	        		
			}
		
		});
	}	
	//手机号码验证
	 $.extend($.fn.validatebox.defaults.rules, {
			
			mobileNumber : {	//手机号验证
				validator : function(value, param) {
					var re = /^1[0-9]{10}$/; 
					return re.test(value);
				},
				message : '手机号格式不正确'
				}  
	 });
	
		
	function clearForm() {
			$('#register').form('clear');
		}	
	</script>
</body>
</html>