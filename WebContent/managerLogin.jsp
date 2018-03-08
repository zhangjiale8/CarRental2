<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>汽车租赁管理系统-管理员登录</title>
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.4.4/themes/metro/easyui.css" />
<link rel="stylesheet" type="text/css" href="jquery-easyui-1.4.4/themes/icon.css" />
<script type="text/javascript" src="jquery-easyui-1.4.4/jquery.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.4.4/jquery.easyui.min.js"></script>
<script type="text/javascript" src="jquery-easyui-1.4.4/locale/easyui-lang-zh_CN.js"></script>
</head>
<body background="images/登录背景3.jpg">
	<div id="loginDiv" style="width: 400px;" >
		<div class="easyui-panel" title="汽车租赁管理系统-管理员登录" style="width: 400px; padding: 30px 70px 20px 70px">
			<form id="login" method="post">
				<div style="margin-bottom: 10px">
					<input class="easyui-textbox" name="m_username" style="width: 100%; height: 40px; padding: 12px" data-options="prompt:'用户名',iconCls:'icon-man',iconWidth:38,required:true">
				</div>
				<div style="margin-bottom: 20px">
					<input class="easyui-textbox" name="m_password" type="password" style="width: 100%; height: 40px; padding: 12px" data-options="prompt:'密码',iconCls:'icon-lock',iconWidth:38,required:true">
				</div>
			</form>
			<div>&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:void(0);" class="easyui-linkbutton" onclick="submitLoginForm()" data-options="iconCls:'icon-ok'" style="padding: 6px 0px; width: 30%;"> <span style="font-size: 14px;">登录</span>
				</a><!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="User/register.jsp" class="easyui-linkbutton"  data-options="iconCls:'icon-help'" style="padding: 6px 0px; width: 30%;"> <span style="font-size: 14px;">注册</span>
				</a> -->			
			</div>
		</div>
	</div>
	
</body>

<script type="text/javascript" src="js/login/Managerlogin.js"></script>


</html>