

/** 根据获取某一种汽车信息，主要参数CarId */
var CarId = getQueryString("CarId");
//alert(CarId);
var id = getQueryString("ReceiverId");
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return decodeURI(r[2]); return null; 
	} 
	/*$("#updateReceiverWindow").window({
		title : '修改取车人信息',
		iconCls : 'icon-add', 
		shadow:true
	}).window("open");*/
	
	if (id) {
		 var requestData = {
					id : id
				    };
		$.ajax({ // 获取当前地址信息
			type: "post",
			contentType: "application/json",
			url : "../../receiver/searchReceiverById.ctrl",
			async : false,
			dataType : "json",
			data : JSON.stringify(requestData),
			success : function(data) {		
				//alert("222");
				console.log(data.object);
			//	alert(data.object.isDefault);
				$('#eachReceiverInfo input[name="receiveName"]').val(data.object.receiveName);
			//	alert("2"+$('#eachReceiverInfo input[name="receiveName"]').val());
				$('#eachReceiverInfo input[name="receiveIdentity"]').val(data.object.receiveIdentity);
				$('#eachReceiverInfo input[name="receivePhone"]').val(data.object.receivePhone);
				$('#eachReceiverInfo input[name="receiveAddress"]').val(data.object.receiveAddress);
				$('#eachReceiverInfo input[name="backAddress"]').val(data.object.backAddress);
				if(data.object.isDefault){
					 $('#eachReceiverInfo input[name="isDefault"]').attr('checked' ,true);
				}else{
					 $('#eachReceiverInfo input[name="isDefault"]').attr('checked' ,false);
				}
				
				
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
			}
		});
		}
	

	
	/** 表单保存按钮点击事件 */
	function receiverInfoFormSave(){
		var receiveName =  $('#eachReceiverInfo input[name="receiveName"]').val();
		var receiveIdentity = $('#eachReceiverInfo input[name="receiveIdentity"]').val();
		var receivePhone =  $('#eachReceiverInfo input[name="receivePhone"]').val();
		var receiveAddress = $('#eachReceiverInfo input[name="receiveAddress"]').val();
		var backAddress = $('#eachReceiverInfo input[name="backAddress"]').val();
		var Default = $('#eachReceiverInfo input[name="isDefault"]').is(":checked");
	//	alert("Default"+Default);
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
						msg:"请输入手机号码！！",
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
								isDefault =1;
							}else {
								isDefault =0;
								
							}
							
								var Receiver ={
										id:id,
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
									url : "../../receiver/backUpdateReceiver.ctrl",
									async : false,
									dataType : "json",
									data : JSON.stringify(Receiver),
									success : function(data) {
										if(data.object){
											$.messager.alert({
												title:'信息提示',
												msg:"修改取车人地址成功！！",
												icon:"ok"
											});
											setTimeout(function(){
												window.location.href ="receiverList.html?CarId="+CarId;
											},3000);
										
											
										}else{
											$.messager.alert({
												title:'信息提示',
												msg:"修改取车人地址失败！！",
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
	}
	/** 表单取消按钮点击事件 */
	function receiverInfoFormUndo(){
		$('#eachReceiverInfo').form('clear');
		window.location.href ="receiverList.html?CarId="+CarId;
	}

