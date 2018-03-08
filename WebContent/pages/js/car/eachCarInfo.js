
$(window).resize(function() {
	$('#eachCarInfoDiv').css({	
		position : 'absolute',
		left : ($(window).width() - $('#eachCarInfo').outerWidth()) / 2,
		top : ($(window).height() - $('#eachCarInfo').outerHeight())/ 2 + $(document).scrollTop()

	});
});
// 初始化函数
$(window).resize();

/** 获取某一种汽车信息，主要参数id */
var id = getQueryString("id");

function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return decodeURI(r[2]); return null; 
	} 
//alert(id);
var car;
if (id) {
	
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
			$('#eachCarInfo input[name="license"]').val(data.object.license);
			$('#eachCarInfo input[name="color"]').val(data.object.color);
			$('#eachCarInfo input[name="brand"]').val(data.object.brand);
			$('#eachCarInfo input[name="c_type"]').val(data.object.c_type);
			$('#eachCarInfo input[name="displacement"]').val(data.object.displacement);
			if(data.object.c_level==1){
				
				$('#eachCarInfo input[name="level_kind"]').val("经济型");
			}else if(data.object.c_level==2){
				
				$('#eachCarInfo input[name="level_kind"]').val("家用型");
			}else if(data.object.c_level==3){
				
			$('#eachCarInfo input[name="level_kind"]').val("商务型");
			}else if(data.object.c_level==4){
				
			$('#eachCarInfo input[name="level_kind"]').val("豪华型");
			}		
			$('#eachCarInfo input[name="price"]').val(data.object.price);
			$('#eachCarInfo input[name="c_describe"]').val(data.object.c_describe);
			
			
			
			/*var price = $('#eachCarInfo input[name="price"]').val();
			var level_kind= $('#eachCarInfo input[name="level_kind"]').val();
			//var c_status =data.object.c_status;
			//保存订单信息
			$("#OrderInfoSave").click(function(){
				var receiveName = $('#addOrderInfoForm input[name="receiveName"]').val();
				alert(receiveName);
				var receiveIdentity = $('#addOrderInfoForm input[name="receiveIdentity"]').val();
				alert(receiveIdentity);
				var receivePhone = $('#addOrderInfoForm input[name="receivePhone"]').val();
				alert(receivePhone);
				var receiveAddress = $('#addOrderInfoForm input[name="receiveAddress"]').val();
				alert(receiveAddress);
				var backAddress = $('#addOrderInfoForm input[name="backAddress"]').val();
				alert(backAddress);
				var startAt = $('#addOrderInfoForm input[name="startAt"]').val();
				alert($('#addOrderInfoForm input[name="startAt"]').val());
				var endAt = $('#addOrderInfoForm input[name="endAt"]').val();
				var  current_time =show();
				alert(current_time);
				//比较开始时间和当前系统时间
				var checkAt_c_s = checkTime(current_time,startAt);
				//如果开始时间小于系统时间那么就继续，否则返回错误提示
				if(checkAt_c_s){
					//比较开始时间与结束时间
					var checkAt_s_e = checkTime(startAt,endAt);
					alert(checkAt_s_e);
					
					if(checkAt_s_e){
						var order={
								id:id,
								receiveName:receiveName,
								receiveIdentity:receiveIdentity,
								receivePhone:receivePhone,
								receiveAddress:receiveAddress,
								backAddress:backAddress,
								startAt:startAt,
								endAt:endAt							
						}
						// 增加订单信息
						$.ajax({ 
							type: "post",
							contentType: "application/json",
							url : "../../order/addOrder.ctrl",
							async : false,
							data: JSON.stringify(order),
							dataType : "json",
							success : function(data) {
					        	var error = data.error;
					        	if(!error){
					        		window.location.href ="../pay/payOrder.html?id="+id+"&&startAt="+startAt+"&&endAt="+endAt+"&&level_kind="+level_kind+"&&price="+price;
					        	}else {	        		
					        		alert(error);	        		
					        	}				
							},
							error : function(XMLHttpRequest, textStatus, errorThrown) {
								console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
							}
							});
						
					//	window.location.href ="../pay/payOrder.html?id="+id+"&&startAt="+startAt+"&&endAt="+endAt+"&&level_kind="+level_kind+"&&price="+price;
					}else{
						$.messager.alert({
							title:'错误提示',
							msg:"请重新输入开始时间和结束时间,结束时间必须大于或等于开始时间!",
							icon:"error"
						});
						}
					}else{
						$.messager.alert({
							title:'错误提示',
							msg:"请重新输入开始时间,开始时间必须大于或等于系统时间!",
							icon:"error"
						});
					}	
				
			});*/
			
			
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
		}
	});	
	
	}

function carInfoForm(price,level_kind){
	
}
//点击后，弹出订单信息弹框
function receiverInfoForm(){
	
	
	/*alert("666");
	//弹出取车人信息以及添加订单信息
	$("#addOrderWindow").window({
		title : '添加订单信息',
		iconCls : 'icon-edit',
		shadow:true
	}).window("open");*/
	window.location.href ="../../pages/receiver/receiverList.html?CarId="+id;
	
}






//比较两个时间的大小，如果结束时间小于开始时间则返回false，否则返回true
function checkTime(startTime,endTime){  
    var start=new Date(startTime.replace("-", "/").replace("-", "/"));  
    var end=new Date(endTime.replace("-", "/").replace("-", "/"));  
    if(end<start){  
        return false;  
    }else{
    	 return true;  
    }     
}  
//处理显示当前系统时间
function show(){
	   var mydate = new Date();
	   var str = "" + mydate.getFullYear() + "-";
	   if((mydate.getMonth()+1)>0&&(mydate.getMonth()+1)<10){
		   str +="0"+ (mydate.getMonth()+1) + "-";
	   }else{
		   str += (mydate.getMonth()+1) + "-";
	   }
	   
	   if(mydate.getDate()>0&&mydate.getDate()<10){
		   str +="0"+ mydate.getDate();
	   }else{
		   str += mydate.getDate();
	   }
	  
	   return str;
	  }

/** 表单取消按钮点击事件 */
$("#addOrderInfoFormUndo").click(function(){
	$('#addOrderInfoForm').form('clear');
	$("#addOrderWindow").window("close");
});