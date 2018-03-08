

/** 表单取消按钮点击事件 */
$("#addReceiverInfoFormUndo").click(function(){
	$('#addReceiverInfoForm').form('clear');
	
		window.location.href ="admin.html";
	
});



$("#addReceiverInfoSave").click(function(){
	
	var receiveName =  $('#addReceiverInfoForm input[name="receiveName"]').val();
	var receiveIdentity = $('#addReceiverInfoForm input[name="receiveIdentity"]').val();
	var receivePhone =  $('#addReceiverInfoForm input[name="receivePhone"]').val();
	var receiveAddress = $('#addReceiverInfoForm input[name="receiveAddress"]').val();
	var backAddress = $('#addReceiverInfoForm input[name="backAddress"]').val();
//	 alert($('#addReceiverInfoForm input[name="isDefault"]').attr("checked"));
//	 alert($('#addReceiverInfoForm input[name="isDefault"]').is(":checked"));
//	 alert($('#addReceiverInfoForm input[name="isDefault"]').is(":checked")==true);
	var Default =$('#addReceiverInfoForm input[name="isDefault"]').is(":checked");
	 
	if(receiveName==""){
		$.messager.alert({
			title:'信息提示',
			msg:"请输入取车人姓名！！",
			icon:"error"
		});
	}else{
		if(receiveIdentity==""||/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(receiveIdentity)==false){
			$.messager.alert({
				title:'信息提示',
				msg:"请输入正确身份证号！！",
				icon:"error"
			});
		}else{
			if(receivePhone==""||/^1[0-9]{10}$/.test(receivePhone)==false){
				$.messager.alert({
					title:'信息提示',
					msg:"请输入正确手机号码！！",
					icon:"error"
				});
			}else{
				if(receiveAddress==""){
					$.messager.alert({
						title:'信息提示',
						msg:"请输入取车地址！！",
						icon:"error"
					});
				}else{
					if(backAddress==""){
						$.messager.alert({
							title:'信息提示',
							msg:"请输入还车地址！！",
							icon:"error"
						});
					}else{
						
						var isDefault;
						if(Default){
							isDefault=1;
						}else{
							isDefault=0;
						}
						
						
						var Receiver ={
								receiveName:receiveName,
								receiveIdentity:receiveIdentity,
								receivePhone:receivePhone,
								receiveAddress:receiveAddress,
								backAddress:backAddress,
								isDefault:isDefault
								
						}
				//		alert(Receiver);
						$.ajax({ // 获取当前地址信息
							type: "post",
							contentType: "application/json",
							url : "receiver/addReceiver.ctrl",
							async : false,
							dataType : "json",
							data : JSON.stringify(Receiver),
							success : function(data) {
						//		alert(",,,,");
								if(data.object){
									$.messager.alert({
										title:'信息提示',
										msg:"新增取车人地址成功！！",
										icon:"ok"
									});
									
									$('#addReceiverInfoForm').form('clear');
									setTimeout(function(){
										window.location.href ="admin.html";
									},3000);
									
									
								}else{
									$.messager.alert({
										title:'信息提示',
										msg:"新增取车人地址失败！！",
										icon:"error"
									});
								}
								
								
								
								
							},
							error : function(XMLHttpRequest, textStatus, errorThrown) {
								console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
							}
						});

						
					}
					
				}
				
			}
			
		}
	}
	

});

	
	