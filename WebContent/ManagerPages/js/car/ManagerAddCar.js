function submitaddCarForm(){
	/*	alert("kkk");
		//form表单
			 $('#addCar').form('submit',{
				url:'addCar.ctrl',
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
						$('#addCar').form('clear');
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
			}); */
		var license = $('#addCar input[name="license"]').val(); 
	//	alert(license);
		var color = $('#addCar input[name="color"]').val(); 
		var brand=$('#addCar input[name="brand"]').val();
		var c_type=$('#addCar input[name="c_type"]').val();
		var displacement=$('#addCar input[name="displacement"]').val();	
		var level_kind=$("#addCar #level_kind").find("option:selected").text();
	//	alert($("#addCar #level_kind").find("option:selected").text());
		var c_level;
		var status_kind=$("#addCar #status_kind").find("option:selected").text(); 
	//	alert($("#addCar #status_kind").find("option:selected").text());
		var c_status;
		var price=$('#addCar input[name="price"]').val();
		var c_describe=$('#addCar input[name="c_describe"]').val();
		//判断取到的level_kind是不是空的，不是在判断status_kind
		if(level_kind==""){
			$.messager.alert({
				title:'错误提示',
				msg:"请选择车辆等级！",
				icon:"error"
			});
		}else{
			if(level_kind=="经济型"){
				c_level=1;
			}else if(level_kind=="家用型"){
				c_level=2;
			}else if(level_kind=="商务型"){
				c_level=3;
			}else if(level_kind=="豪华型"){
				c_level=4;
			}
			
			if(status_kind==""){
				$.messager.alert({
					title:'错误提示',
					msg:"请选择车辆状态！",
					icon:"error"
				});
			}else{
				
				if(status_kind=="未租赁"){
					c_status=1;
				}else if(status_kind=="已租赁"){
					c_status=2;
				}else if(status_kind=="故障"){
					c_status=3;
				}else if(status_kind=="预定中"){
					c_status=4;
				}
				
				
				var Car={
						license:license,
						color:color,
						brand:brand,
						c_type:c_type,
						displacement:displacement,
						c_level:c_level,
						c_status:c_status,
						price:price,
						c_describe:c_describe
				    }; 
			//	alert(JSON.stringify(Car));
				$.ajax({ // 更新用户信息
					type: "post",
					contentType: "application/json",
					url : "addCar.ctrl",
					async : false,
					data: JSON.stringify(Car),
					dataType : "json",
					success : function(data) {
			        	var error = data.error;
			            if(! (typeof(error) == "undefined")){
			        		alert(error);
			        	}else {
			        	//	alert("新增车辆成功！ ");
			        		$.messager.alert({
								title:'错误提示',
								msg:"新增车辆成功！",
								icon:"ok"
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
	 
	
	 
	function clearForm() {
		$('#addCar').form('clear');
	}