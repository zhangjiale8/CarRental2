<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>汽车租赁管理系统-用户登录</title>
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.4.4/themes/metro/easyui.css" />
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.4.4/themes/icon.css" />
<script type="text/javascript" src="jquery-easyui-1.4.4/jquery.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.4.4/jquery.easyui.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.4.4/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/base/validate.js"></script>

</head>
<body background="images/登录背景2.jpg">
	<div id="loginDiv" style="width: 400px;" >
		<div class="easyui-panel" title="汽车租赁管理系统-登录" style="width: 400px; padding: 30px 70px 20px 70px" >
			<form id="login" method="post">
				<div style="margin-bottom: 10px">
					<input class="easyui-textbox" name="username" style="width: 100%; height: 40px; padding: 12px" data-options="prompt:'用户名',iconCls:'icon-man',iconWidth:38,required:true">
				</div>
				<div style="margin-bottom: 20px">
					<input class="easyui-textbox" name="password" type="password" style="width: 100%; height: 40px; padding: 12px" data-options="prompt:'密码',iconCls:'icon-lock',iconWidth:38,required:true">
				</div>
			  <div align="right">
					<a id="forgetPassword" href="javascript:void(0);"   >忘记密码
				</a> 
				</div> 
			</form>
			<div>&nbsp;&nbsp;
				<a href="javascript:void(0);" class="easyui-linkbutton" onclick="submitLoginForm()" data-options="iconCls:'icon-ok'" style="padding: 6px 0px; width: 30%;"> <span style="font-size: 14px;">登录</span>
				</a>&nbsp;&nbsp;
				<a href="User/register.jsp" class="easyui-linkbutton"  data-options="iconCls:'icon-help'" style="padding: 6px 0px; width: 30%;"> <span style="font-size: 14px;">注册</span>
				</a>			
			</div>
		</div>
	</div>	
	
	
	<div id="userUpdaePasswordWindow" class="easyui-window" style="width: 400px"
	data-options="collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false,closed:true,modal:true,closable:false">
	<div style="padding: 10px 60px 20px 10px">
		 <form id="userUpdaePasswordForm" method="post">
		 	<table cellpadding="5">
		 		<tr>
		 			<td align="right">用户姓名：</td>
		 			<td><input class="easyui-textbox" type="text" id="username" name="username" data-options="prompt:'用户名',iconCls:'icon-man',iconWidth:38,required:true,validType:['username']" /></td>
		 		</tr>
		 		<tr>
		 			<td align="right">手机号码：</td>
		 			<td><input class="easyui-textbox" type="text" id="phone" name="phone" data-options="prompt:'手机号码',iconWidth:38,required:true,validType:['mobileNumber']" /></td>
		 		</tr>
		 	  <tr>
		 			<td align="right">密&nbsp;&nbsp;码：</td>
		 			<td><input id="password" type="password" class="easyui-textbox" name="password" data-options="prompt:'密码',iconCls:'icon-lock',iconWidth:38,required:true,validType:['password']"/> </td>
		 		</tr>
		 		<tr>
		 			<td align="right">确认密码：</td>
		 			<td><input id="repassword" type="password" class="easyui-textbox" name="repassword" data-options="prompt:'密码',iconCls:'icon-lock',iconWidth:38,required:true,validType:['password']"/></td>
		 		</tr>
		 		<tr>
		 			<td align="right">身份证号：</td>
		 			<td><input class="easyui-textbox" type="text" id="identity" name="identity" data-options="prompt:'身份证号',iconWidth:38,required:true,validType:['personId']" /></td>
		 		</tr>
		 		<tr>
		 			<td align="right">电子邮箱：</td>
		 			<td><input id="email" type="text" class="easyui-textbox" name="email" data-options="prompt:'邮箱',iconWidth:38,required:true,validType:['email']"/></td>
		 		</tr>    
		 	</table>
		 </form>
	</div>
	<div style="text-align: center; padding: 5px;">
		<a id="userUpdaePasswordFormSave" href="javascript:void(0);"	class="easyui-linkbutton" data-options="iconCls:'icon-ok',text:'保存'"></a>
		<a id="userUpdaePasswordFormUndo" href="javascript:void(0);"	class="easyui-linkbutton" data-options="iconCls:'icon-undo',text:'取消'"></a>
	</div>
	</div>
</body>

<script type="text/javascript" src="js/login/login.js"></script>
</body>
</html>