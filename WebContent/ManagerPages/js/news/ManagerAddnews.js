function submitaddnewsForm(){
	//alert("bbb");
		var title=$('#addnews input[name="title"]').val();
		var body=$('#addnews input[name="body"]').val();
				var news={			
						title:title,
						body:body
				    }; 
			//	alert(JSON.stringify(news));
				if(title!=null&&""!=title){
					if(body!=null&&""!=body){
						
						$.ajax({ // 更新用户信息
							type: "post",
							contentType: "application/json",
							url : "news/addnews.ctrl",
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
					    				msg:"新增新闻信息成功！",
					    				icon:"ok"
					    			});
					        	}
							},
							error : function(XMLHttpRequest, textStatus, errorThrown) {
								console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
							}
							});
						
					}else{
						$.messager.alert({
		    				title:'错误提示',
		    				msg:"请输入新闻正文！",
		    				icon:"error"
		    			});
					}
				}else{
					$.messager.alert({
	    				title:'错误提示',
	    				msg:"请输入新闻标题！",
	    				icon:"error"
	    			});
				}
				
						
				
}
	 
	
	 
	function clearForm() {
		$('#addnews').form('clear');
	}