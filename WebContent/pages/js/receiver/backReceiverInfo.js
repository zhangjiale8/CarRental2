/**
 * 个人信息JS
 */
//alert("11111");
// 表格设置
$("#receiverInfo").datagrid(
		{
			title : '取车人信息列表',
			fit : true,
			fitColumns : true,
			toolbar:'#receiverInfoTb',
			columns : [ [ 
			{
				field : 'id',
				title : '取车人编号',
				width : 30,
				align : 'center'
			},{
				field : 'receiveName',
				title : '取车人姓名',
				width : 80,
				align : 'center'
			},{
				field : 'receiveIdentity',
				title : '身份证号',
				width : 50,
				align : 'center'
			},{
				field : 'receivePhone',
				title : '手机号码',
				width : 50,
				align : 'center'
			},{
				field : 'receiveAddress',
				title : '取车地址',
				width : 80,
				align : 'center'
			},{
				field : 'backAddress',
				title : '还车地址',
				width : 80,
				align : 'center'
			},{
				field : 'isDefault',
				title : '默认',
				width : 80,
				align : 'center'
			}
			] ],
			border : false,
			pagination : true,
			pageNumber : 1,
			pageSize : 10,
			pageList : [ 10, 20, 30, 40 ],
			//是否多选
			singleSelect : true,
			url : "receiver/backSearchReceiverList.ctrl",
			loadFilter : function(data) {
				console.log(data.object);
				return data.object
			}
		});
/** 编辑按钮点击事件 */
$("#receiverInfoEdit").click(function() {
	var selectedData = $("#receiverInfo").datagrid("getSelected");
	if(selectedData != null){	//判断是否有选中
		$('#receiverInfoForm').form('load',selectedData);
		$("#receiverInfoWindow").window({
			title : '修改取车人信息',
			iconCls : 'icon-edit',
			shadow:true
		}).window("open");
	}else{
		$.messager.alert({
			title:'错误提示',
			msg:"请单击要编辑行",
			icon:"error"
		});
	}
});

/**删除取车人信息*/

$("#receiverInfoDelete").click(function(){
	var selectedData = $("#receiverInfo").datagrid("getSelected");
	if(selectedData == null){	//判断是否有选中
		$.messager.alert({
			title:'错误提示',
			msg:"请单击要编辑行",
			icon:"error"
		});
	}else{
		var id=selectedData.id;
	    var requestData={"id":id};
	   // alert(requestData);
		$.ajax({ 
			type: "get",
			contentType: "application/json",
			url : "receiver/deleteById.ctrl",
			async :false,
			dataType : "json",
			data:requestData,
			success : function(data) {
				$.messager.alert({
    				title:'错误提示',
    				msg:"删除取车人信息成功！",
    				icon:"ok"
    			});
				$("#receiverInfo").datagrid("reload");
			},
			error : function() {
				alert(error);
			}
		});
	}
	
});


/** 表单保存按钮点击事件 */
$("#receiverInfoSave").click(function(){
	var id = $('#receiverInfoForm input[name="id"]').val();
	var receiveName =  $('#receiverInfoForm input[name="receiveName"]').val();
	var receiveIdentity = $('#receiverInfoForm input[name="receiveIdentity"]').val();
	var receivePhone =  $('#receiverInfoForm input[name="receivePhone"]').val();
	var receiveAddress = $('#receiverInfoForm input[name="receiveAddress"]').val();
	var backAddress = $('#receiverInfoForm input[name="backAddress"]').val();
	var Default = $('#receiverInfoForm input[name="isDefault"]').val();
	//alert("Default"+Default);
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
						if(Default==""){
							$.messager.alert({
								title:'信息提示',
								msg:"请输入是否设置成默认地址！！",
								icon:"error"
							});
						}else if(Default=="true"||Default=="false"){
							
							var isDefault;
							if(Default=="true"){
								isDefault=1;
							}else if(Default=="false"){
								isDefault=0;
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
								url : "receiver/backUpdateReceiver.ctrl",
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
										$("#receiverInfo").datagrid("reload");
										
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
							
							
						}else{
							$.messager.alert({
								title:'信息提示',
								msg:"请输入true或false！！",
								icon:"error"
							});
						}
						

						
					}
					
				}
				
			}
			
		}
	}
});
/** 表单取消按钮点击事件 */
$("#receiverInfoFormUndo").click(function(){
	$('#receiverInfoForm').form('clear');
	$("#receiverInfoWindow").window("close");
});