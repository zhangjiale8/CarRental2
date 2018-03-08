 /** EasyUI 基础的表单验证 */
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
	mobileNumber : {	//手机号验证
		validator : function(value, param) {
			var re = /^1[0-9]{10}$/; 
			return re.test(value);
		},
		message : '手机号格式不正确'
	},
	personId : {	//手机号验证
		validator : function(value, param) {
			var re = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/; 
			return re.test(value);
		},
		message : '身份证格式不正确'
	},
	license : {	//车牌号码验证
		validator : function(value, param) {
			var re = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/; 
			return re.test(value);
		},
		message : '车牌号码格式不正确'
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

