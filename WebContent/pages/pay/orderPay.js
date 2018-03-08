var CarId = getQueryString("CarId");
var startAt = getQueryString("startAt");
var endAt = getQueryString("endAt");
var orderId = getQueryString("orderId");
//订单总价
var total;
//账户余额
var account;

/*var user = getUserInfo();*/
//alert(CarId);
//alert(startAt);
//alert(endAt);
//alert(orderId);
var day = getDistanceDay(startAt,endAt);




function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return decodeURI(r[2]); return null; 
	} 




//当开始日期和结束日期相同时，应该返回1，否则按实际流程进行
function getDistanceDay(dateBegin,dateEnd){
	//比较两个日期间相差天数
	var distance;
	//转化日期格式
	var newdateBegin=new Date(dateBegin.replace("-", "/").replace("-", "/"));  
    var newdateEnd=new Date(dateEnd.replace("-", "/").replace("-", "/")); 
    //此处有问题，就是关于时间间隔的问题，两个极端：1，当天晚上取车到第二天晚上还车时算一天还是两天，此处采用有利于企业利益的处理办法，算两天
   /* if(newdateBegin==newdateEnd){
    	distance =1;
    }else{
    	var sDate = new Date(newdateBegin);
    	var eDate = new Date(newdateEnd);
    	var fen = ((eDate.getTime()-sDate.getTime())/1000)/60;
    	distance = parseInt(fen/(24*60)); //相隔distance天
    }*/
    var sDate = new Date(newdateBegin);
	var eDate = new Date(newdateEnd);
	var fen = ((eDate.getTime()-sDate.getTime())/1000)/60;
	distance = parseInt(fen/(24*60))+1; //相隔distance天
	
//	alert("相隔"+distance+"天");
	return distance;
	}

		

		if (CarId) {		
			var id= CarId;
			 var requestData = {
					 id : id
					    };
			$.ajax({ // 获取当前地址信息
				type: "post",
				contentType: "application/json",
				url : "../../car/selectCarById.ctrl",
				async : false,
				dataType : "json",
				data : JSON.stringify(requestData),
				success : function(data) {
					if(data.object==null){
						alert(error);
						
					}else{
						var price= data.object.price;
						//alert(price);
						var c_level = data.object.c_level;
						//alert(c_level);
						var deposit = selectdepositById(c_level);
						//alert("222"+deposit);
						total= deposit+day*price;
					//	alert("订单总价"+total);
						//插入订单总价
						insertOrderTotal(total);
						//account是当前客户的账户余额
						account = profile();
					//	alert("222"+account);						
						$('#eachOrderPayInfoForm input[name="account"]').val(account);
						$('#eachOrderPayInfoForm input[name="total"]').val(total);
						//将查到的账户余额和订单总价插入到表格里
						
						
						
						
					}
							
					
					
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
				}
			});	
			
			}
		
		
		//查询车辆押金
		function selectdepositById(c_level){
			var deposit;
			var carlevel={
					c_level:c_level
			}
		//	alert(carlevel);
			//获取汽车的押金
			$.ajax({ // 获取当前地址信息
				type: "post",
				contentType: "application/json",
				url : "../../car/selectdepositById.ctrl",
				async : false,
				dataType : "json",
				data : JSON.stringify(carlevel),
				success : function(data) {
				//	alert("1111");
					if(data.object==null){
						alert(data.error);
						
					}else{
						var carlevel = data.object;
						//alert("111"+data.object.deposit);
						deposit = data.object.deposit;
					//	alert(deposit);
					}
					
							
					
					
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
				}
			});	
			
			return deposit;
		}
		
		//获取
		function profile(){
			var account;
			//获取当前用户的账户余额
			$.ajax({ // 获取当前地址信息
				type: "post",
				contentType: "application/json",
				url : "../../getLoginUserInfo.ctrl",
				async : false,
				dataType : "json",
				success : function(data) {
				//	alert("获取user信息");
					if(data.object==null){
						alert(error);
					}else{
						account = data.object.account;
					//	alert(account);
											
						
					}
									
					
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
				}
			});	
			return account;
		}
		
	
		
	function payOrder(){
	//	alert("点击支付按钮是取到的total"+total);
	//	alert("点击支付按钮是取到的account"+account);
	//	alert("点击支付按钮是取到的orderId"+orderId);
		
		//判断账户余额和订单总价，如果账户余额大于订单总价则可以改变订单状态，并且从用户余额中扣除订单总价，即更新账户余额，否则提示信息
		if(account>total){
			updateOrderPayStatus();				
		}else{
			$.messager.alert({
				title:'错误提示',
				msg:"您的余额不足，请及时充值！",
				icon:"error"
			});	
		}
	}
	
	function updateOrderPayStatus(){
	//	alert("点击支付按钮是取到的值后传到后台的total"+total);
	//	alert("点击支付按钮是取到的值后传到后台的account"+account);
	//	alert("点击支付按钮是取到的值后传到后台的orderId"+orderId);
		var newaccount = account -total;
	//	alert(newaccount);
		
		var pay={
				newaccount:newaccount,
				orderId:orderId
		}
		
		//获取汽车的押金
		$.ajax({ // 获取当前地址信息
			type: "post",
			contentType: "application/json",
			url : "../../order/updateOrderPayStatus.ctrl",
			async : false,
			dataType : "json",
			data : JSON.stringify(pay),
			success : function(data) {
			//	alert("1111");
				if(data.object){
					$.messager.alert({
						title:'信息提示',
						msg:"支付完成！谢谢使用本系统预约车辆！请等待订单审核！",
						icon:"ok"
					});	
					setTimeout(function(){
						window.location.href ="../../rental.html";
					},3000);
				
					
				}else{
					$.messager.alert({
						title:'信息提示',
						msg:data.error,
						icon:"error"
					});	
				}
						
				
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
			}
		});	
		
		
	}
	
	//插入订单总价
	function insertOrderTotal(total){
		var order={
				total:total,
				orderId:orderId
		}
		$.ajax({ // 获取当前地址信息
			type: "post",
			contentType: "application/json",
			url : "../../order/insertOrderTotal.ctrl",
			async : false,
			dataType : "json",
			data : JSON.stringify(order),
			success : function(data) {
				if(data.object){
					$.messager.alert({
						title:'信息提示',
						msg:"成功生成订单！",
						icon:"ok"
					});	
					
				}else{
					
					$.messager.alert({
						title:'信息提示',
						msg:"订单生成有误！",
						icon:"error"
					});	
					
					
				}
						
				
				
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
			}
		});	
	}
	
	
	
	
	