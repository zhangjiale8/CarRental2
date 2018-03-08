<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>汽车租赁管理系统-用户注册</title>
<link rel="stylesheet" type="text/css" href="../jquery-easyui-1.4.4/themes/metro/easyui.css" />
<link rel="stylesheet" type="text/css" href="../jquery-easyui-1.4.4/themes/icon.css" />
<script type="text/javascript" src="../jquery-easyui-1.4.4/jquery.min.js"></script>
<script type="text/javascript" src="../jquery-easyui-1.4.4/jquery.easyui.min.js"></script>
<script type="text/javascript" src="../jquery-easyui-1.4.4/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="../js/base/validate.js"></script>
</head>
<body >
	<div id="registerDiv" style="width: 400px;" >
		<div class="easyui-panel" title="汽车租赁管理系统-用户注册" >
			<form id="register">
				<div>
					用户名：&nbsp;<input id="usernameId" class="easyui-textbox" name="username"  data-options="prompt:'用户名',iconCls:'icon-man',iconWidth:38,required:true,validType:['username']">
				</div><br/>
				<div >
					密&nbsp;&nbsp;码：<input id="passwordId" class="easyui-textbox" name="password" type="password"  data-options="prompt:'密码',iconCls:'icon-lock',iconWidth:38,required:true,validType:['password']">
				</div><br/>
				<div >
					确认密码：<input id="repasswordId" class="easyui-textbox" name="repassword" type="password"  data-options="prompt:'密码',iconCls:'icon-lock',iconWidth:38,required:true,validType:['password']">
				</div><br/>
				<div >
					性&nbsp;&nbsp;别：
					<select class="easyui-combobox" name="sex" style="width:100px;">
						<option value="男">男</option>
						<option value="女">女</option>
					</select>
				</div><br/>
				<div >
					真实姓名：<input id="fullnameId" class="easyui-textbox" name="fullname"  data-options="prompt:'真实姓名',iconCls:'icon-man',iconWidth:38,required:true">
				</div><br/>
				<div >
					身份证号：<input id="identityId" class="easyui-textbox" name="identity"  data-options="prompt:'身份证号',iconWidth:38,required:true,validType:['personId']">
				</div><br/>
				<div >
					手机号码：<input id="phoneId" class="easyui-textbox" name="phone"  data-options="prompt:'手机号码',iconWidth:38,required:true,validType:['mobileNumber']">
				</div><br/>
				<div >
					邮&nbsp;&nbsp;箱：<input id="emailId" class="easyui-textbox" name="email"  data-options="prompt:'邮箱',required:true,iconWidth:38,validType:['email']">
				</div><br/>
				<div >
					家庭住址：<input id="addressId" class="easyui-textbox" name="address"  data-options="prompt:'家庭住址',iconWidth:38">
				</div>

			</form><br/><br/>
			<div>&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:void(0);" class="easyui-linkbutton" onclick="submitRegisterForm()" data-options="iconCls:'icon-ok'" > <span style="font-size: 14px;">提交</span>
				</a>&nbsp;&nbsp;&nbsp;
				<a  class="easyui-linkbutton" onclick="clearForm()" data-options="iconCls:'icon-help'" > <span style="font-size: 14px;">重置</span>
				</a>			
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="../js/register/register.js"></script>
</html>