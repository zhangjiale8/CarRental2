//		alert("qqqq");
		var account;
		$.ajax({ // 获取当前地址信息
				type: "post",
				contentType: "application/json",
				url : "getLoginUserInfo.ctrl",
				async : false,
				dataType : "json",
				success : function(data) {
				//	alert("获取user信息");
					if(data.object==null){
						alert(error);
					}else{
					//	alert(data.object.account);
						$('#RechargeForm input[name="account"]').val(data.object.account);
						account=$('#RechargeForm input[name="account"]').val();
					//	alert("传出去的account"+account);
						
					}
									
					
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
				}
			});	
		
	//	alert("接收到的account"+account);
		
		/** 表单取消按钮点击事件 */
		$("#RechargeFormUndo").click(function(){
			//$('#RechargeForm input[name="recharge"]').val("").focus();
			//$("input[name='recharge']").val("");// 清空并获得焦点
			
			$('#RechargeForm').form('clear');
			window.location.href ="admin.html";
			
		});
		
		
		/** 表单取消按钮点击事件 */
		$("#RechargeFormSave").click(function(){			
		//	alert("888");
			var recharge = $('#RechargeForm input[name="recharge"]').val();
		//	alert(recharge);
			if(recharge==""){
				$.messager.alert({
					title:'错误提示',
					msg:"请输入金额！",
					icon:"error"
				});
			}else if(recharge==0){
				$.messager.alert({
					title:'错误提示',
					msg:"请输入金额大于0！",
					icon:"error"
				});
			}else{
				//account-0此处是吧字符串类型的account转化成数字类型的account，转化成数字键的运算
				var newaccount= (account-0)+(recharge-0);
				//alert(newaccount);
				
				var pay={
						newaccount:newaccount
				}
			//	alert(pay);
				//获取汽车的押金
				$.ajax({ // 获取当前地址信息
					type: "post",
					contentType: "application/json",
					url : "user/updateUserAccount.ctrl",
					async : false,
					dataType : "json",
					data : JSON.stringify(pay),
					success : function(data) {
					//	alert("1111");
						if(data.object){
							
								$.messager.alert({
								title:'信息提示',
								msg:"充值完成！",
								icon:"ok"
							});	
						
						setTimeout(function(){
							window.location.href ="admin.html";
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
			
			
			
		});