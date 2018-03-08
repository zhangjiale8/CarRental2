

function moreinfo(id){
	//alert("333");
	//alert(id);
	
	$("#addOderWindow").window({
		title : '新增订单信息',
		iconCls : 'icon-add', 
		shadow:true
	}).window("open");
	
	
	var receiverId=id;
//	alert("取车人Id"+receiverId);
//	alert("车辆id"+CarId);
	/** 表单保存按钮点击事件 */
	$("#addOderInfoSave").click(function(){
		
		var startAt = $('#addOderInfoForm input[name="startAt"]').val();
	//	alert($('#addOderInfoForm input[name="startAt"]').val());
		var endAt = $('#addOderInfoForm input[name="endAt"]').val();
		var  current_time =show();
		//alert("当前系统时间"+current_time);
		//判断订单开始时间是否为空，如果是空的则返回信息提示，否则判断结束时间
		if(""==startAt){
		//	alert("aaaa");
			$.messager.alert({
				title:'错误提示',
				msg:"请输入订单开始时间！",
				icon:"error"
			});	 
		}else{
			//如果结束时间是空的，则返回信息提示否则就继续执行
			if(""==endAt){
				$.messager.alert({
					title:'错误提示',
					msg:"请输入订单结束时间！",
					icon:"error"
				});	 
			}else{
				//比较开始时间和当前系统时间
				var checkAt_c_s = checkTime(current_time,startAt);
				//如果开始时间小于系统时间那么就继续，否则返回错误提示
				if(checkAt_c_s){
					//比较开始时间与结束时间
					var checkAt_s_e = checkTime(startAt,endAt);
				//	alert("结束时间是否大于开始时间"+checkAt_s_e);
					
					if(checkAt_s_e){
						
						var order={
								CarId:CarId,
								receiverId:receiverId,
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
					        	var orderId = data.object;
					        	if(!error){
					        		window.location.href ="../pay/payOrder.html?CarId="+CarId+"&&startAt="+startAt+"&&endAt="+endAt+"&&receiverId="+receiverId+"&&orderId="+orderId;
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
				
				
				
			}
			
		}
		
	});
	
	
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

/** 表单重置按钮点击事件 */
$("#addOderInfoFormUndo").click(function(){
	$('#addOderInfoForm').form('clear');
});
/** 表单取消按钮点击事件 */
$("#addOrderBack").click(function(){
	$('#addOderInfoForm').form('clear');
	$("#addOderWindow").window("close");
});