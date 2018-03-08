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

</head>
<body >
	<div id="registerDiv" style="width: 250px" >
		<div class="easyui-panel" title="汽车租赁管理系统-用户注册" >
			<form id="register">
				<div>
					用&nbsp;&nbsp;户&nbsp;&nbsp;名：<input id="usernameId" class="easyui-textbox" name="username"  data-options="prompt:'用户名',iconCls:'icon-man',iconWidth:38,required:true,validType:['username']">
				</div><br/>
				<div >
					密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：<input id="passwordId" class="easyui-textbox" name="password" type="password"  data-options="prompt:'密码',iconCls:'icon-lock',iconWidth:38,required:true,validType:['password']">
				</div><br/>
				<div >
					确认密码&nbsp;：<input id="repasswordId" class="easyui-textbox" name="repassword" type="password"  data-options="prompt:'密码',iconCls:'icon-lock',iconWidth:38,required:true,validType:['password']">
				</div><br/>
				<div >
					性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：
					<select class="easyui-combobox" name="sex" style="width:100px;">
						<option value="男">男</option>
						<option value="女">女</option>
					</select>
				</div><br/>
				<div >
					真实姓名：<input id="fullnameId" class="easyui-textbox" name="fullname"  data-options="prompt:'真实姓名',iconCls:'icon-man',iconWidth:38,required:true">
				</div><br/>
				<div >
					身份证号：<input id="identityId" class="easyui-textbox" name="identity"  data-options="prompt:'身份证号',iconWidth:38,required:true">
				</div><br/>
				<div >
					手机号码：<input id="phoneId" class="easyui-textbox" name="phone"  data-options="prompt:'手机号码',iconWidth:38,required:true,validType:['mobileNumber']">
				</div><br/>
				<div >
					邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：<input id="emailId" class="easyui-textbox" name="email"  data-options="prompt:'邮箱',iconWidth:38,validType:['email']">
				</div><br/>
				<div >
					家庭住址：<input id="addressId" class="easyui-textbox" name="address"  data-options="prompt:'家庭住址',iconWidth:38">
				</div>

			</form><br/><br/>
			<div>&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:void(0);" class="easyui-linkbutton" onclick="submitRegisterForm()" data-options="iconCls:'icon-ok'" > <span style="font-size: 14px;">提交</span>
				</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<a  class="easyui-linkbutton" onclick="clearForm()" data-options="iconCls:'icon-help'" > <span style="font-size: 14px;">重置</span>
				</a>			
			</div>
		</div>
	</div>
	<script type="text/javascript" >
	function submitRegisterForm(){
		var password = $('#register input[name="password"]').val();
		var repassword = $('#register input[name="repassword"]').val();
		if(password!=repassword){
			$.messager.alert({
				title:'错误提示',
				msg:"两次输入密码不一致",
				icon:"error"
			});
		}else{
			$('#register').form('submit',{
				url:'register.ctrl',
				
				onSubmit:function(param){
				console.log(param);
	            return $(this).form('enableValidation').form('validate');
				},
				
				success: function(data){	
					alert("success");
					data = $.parseJSON(data);  
					var object = data.object;
					var error = data.error;
					if(! (typeof(error) == "undefined")){
						$('#register').form('clear');
						$.messager.alert({
							title:'错误提示',
							msg:error,
							icon:"error"
						});
					}else if(object==1) {
					
						$.messager.alert({
							title:'信息提示',
							msg:"添加成功！",
							icon:"ok"
						});
					}
				}
			});
		}
	}

	function clearForm() {
		$('#register').form('clear');
	}
	
	
	
	 $.extend($.fn.validatebox.defaults.rules, {
		 	datatime : {	// 日期格式验证
		 		validator : function(value, param) {
		 			var re = /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s((([0-1][0-9])|(2?[0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))))?$/; 
		 			return re.test(value);
		 		},
		 		message : '非法的日期格式'
		 	},
		 	maxLength: {	//字符串长度验证
		        validator: function(value, param){
		            return value.length <= param[0];
		        },
		        message: '请输入小于{0}的字符串'
		    },
		    positiveFloat : {	//正浮点数
				validator : function(value, param) {
					var re = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/; 
					return re.test(value);
				},
				message : '请输入正浮点数'
			},
			identity : {	//身份证号验证
				validator : function(value, param) {
					var re = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/; 
					return re.test(value);
				},
				message : '身份证号格式不正确'
			},
			
			mobileNumber : {	//手机号验证
				validator : function(value, param) {
					var re = /^1[0-9]{10}$/; 
					return re.test(value);
				},
				message : '手机号格式不正确'
			},
			   portnumber: {//输入指定范围的数据
				    validator: function (value, param) {
				       var rules = $.fn.validatebox.defaults.rules;  
				    if(!(/^(?:[1-9]\d*|0)$/.test(value))){
				    rules.portnumber.message = "请输入数字型数值";  
				      return false;  
				    }else{
				    rules.portnumber.message = ""; 
				    if(value>param[1] || value<param[0]){
				    rules.portnumber.message = "数据的范围在{0}~{1}的范围内";  
				     return false;  
				    }else{
				     return true;
				     }
				    }
				    },
				        message: ""
				    },
				    md: { //结束时间小于开始时间验证
				    	validator: function(value, param){ 
				    	var startTime = $(param[0]).datetimebox('getValue'); 
				    	var d1 = $.fn.datebox.defaults.parser(startTime); 
				    	var d2 = $.fn.datebox.defaults.parser(value);  
				    	return d2>=d1||startTime==""||startTime==null; 
				    	},
				    	message: '结束时间不能小于开始时间！' 
				    	
				    	} 

		 });
	
	</script>

		
</body>

</html>