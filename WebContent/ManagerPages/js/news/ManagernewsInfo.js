/**
 * 租赁单信息JS
 */
// 表格设置
$("#newsInfo").datagrid(
{
	title : '租赁单信息',
	fit : true,
	fitColumns : true,
	toolbar:"#newsListTb",
	columns : [ [
			{
				field : 'id',
				title : '汽车编号',
				width : 50,
				align : 'center',
			},
			{
				field : 'title',
				title : '新闻标题',
				width : 50,
				align : 'center',
			},
			{
				field : 'body',
				title : '新闻正文',
				width : 80,
				align : 'center',
			},
			{
				field : 'm_username',
				title : '发布者',
				width : 80,
				align : 'center',
			},
			{
				field : 'publishAt',
				title : '发布时间',
				width : 50,
				align : 'center',
				formatter : function(value, row, index) {
					return value == null ? '-' : new Date(value)
							.Format("yyyy-MM-dd");
				}
			}
			
			] ],
			border : false,
			pagination : true,
			pageNumber : 1,
			pageSize : 5,
			pageList : [ 5, 10, 15, 20 ],
			singleSelect : true,
			url : "searchAllnews.ctrl",
			loadFilter : function(data) {
				console.log(data.object);
				return data.object
			}
});

/** 编辑按钮点击事件 */
$("#newsEdit").click(function() {
	var selectedData = $("#newsInfo").datagrid("getSelected");
	//selectedData.id=selectedData.newscategory.name;
	if(selectedData != null){	//判断是否有选中
		$('#newsForm').form('load',selectedData);
		
		$("#mynewsWindow").window({
			title : '修改订单',
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
/** 表单保存按钮点击事件 */
$("#newsFormSave").click(function(){
	var id = $('#newsForm input[name="id"]').val(); 
	//alert(id);
	var title = $('#newsForm input[name="title"]').val(); 
	//alert(title);
	var publishAt=$('#newsForm input[name="publishAt"]').val();
//	alert(publishAt);
	var body=$('#newsForm input[name="body"]').val();	
			var news={
					id:id,
					title:title,					
					publishAt:publishAt,					
					body:body
					
			    }; 
			//alert(JSON.stringify(news));
			$.ajax({ // 更新用户信息
				type: "post",
				contentType: "application/json",
				url : "news/updatenews.ctrl",
				async : false,
				data: JSON.stringify(news),
				dataType : "json",
				success : function(data) {
		        	var error = data.error;
		            if(! (typeof(error) == "undefined")){
		            	$.messager.alert({
		    				title:'错误提示',
		    				msg:error,
		    				icon:"error"
		    			});
		        	}else {
		        		$.messager.alert({
		    				title:'信息提示',
		    				msg:"修改新闻信息成功！",
		    				icon:"ok"
		    			});
		        		$("#newsInfo").datagrid("reload");
		        	}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
				}
				});
	});
/**删除汽车信息*/

$("#newsDel").click(function(){
	var selectedData = $("#newsInfo").datagrid("getSelected");
	if(selectedData == null){	//判断是否有选中
		$.messager.alert({
			title:'错误提示',
			msg:"请单击要编辑行",
			icon:"error"
		});
	}else{
		var id=selectedData.id;
	    var requestData={id:id};
	  //  alert(requestData);
		$.ajax({ 
			type: "post",
			contentType: "application/json",
			url : "news/delete.ctrl",
			async :false,
			dataType : "json",
			data:JSON.stringify(requestData),
			success : function(data) {
				$.messager.alert({
    				title:'错误提示',
    				msg:"删除新闻信息成功！",
    				icon:"ok"
    			});
				$("#newsInfo").datagrid("reload");
			},
			error : function() {
				alert(error);
			}
		});
	}
	
});
/** 表单取消按钮点击事件 */
$("#newsFormUndo").click(function(){
	$('#newsForm').form('clear');
	$("#mynewsWindow").window("close");
});
/**
 * 车辆信息条件查询
 */
function newsInfoSearch(){
	var isValid = $("#newsSearchForm").form('validate');
	if(! isValid){
		return;
	}
	var queryParams=new Object();
	var form_title,form_publishAt
	form_title = $('#newsSearchForm input[name="title"]').val();
	//alert($('#newsSearchForm input[name="title"]').val());
	form_publishAt = $('#newsSearchForm input[name="publishAt"]').val();
//	alert($('#newsSearchForm input[name="publishAt"]').val());
	""==form_publishAt?null:queryParams.publishAt = form_publishAt;
	""==form_title?null:queryParams.title = form_title;
	$('#newsInfo').datagrid('load',queryParams);
}

/**
 * 重置查询表单
 */
function newsInfoRedo(){
	$("#newsSearchForm").form("clear");
	$('#newsInfo').datagrid('load',{});
}
