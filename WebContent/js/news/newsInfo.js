//alert("hhhh");


/** 获取某条信息，主要参数id */
var newsId = getQueryString("newsId");

function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return decodeURI(r[2]); return null; 
	} 
//alert(newsId);



if (newsId) {
	
	 var requestData = {
			 newsId : newsId
			    };
	$.ajax({ // 获取当前地址信息
		type: "post",
		contentType: "application/json",
		url : "../news/selectNewsById.ctrl",
		async : false,
		dataType : "json",
		data : JSON.stringify(requestData),
		success : function(data) {
			console.log(data.object);
			var new_div = "";
			if(data.object!=null){	
				
				//alert(data.object.title);
				//alert(data.object.publishAt);
				//alert(data.object.body);
				console.log("新闻详情"+data.object);	
			    	new_div += '<center>';	
			    	new_div += '<strong>'+data.object.title+ '</strong><br />';
			    	new_div += ' <span>'+data.object.publishAt+ '</span> ';
			    	new_div += '</center>';
			    	new_div += '<p>'+'&nbsp;&nbsp;'+data.object.body+ '</p>';
			    	 //绑到一个容器里，container
			    	$("#newsInfoContainer").append(new_div);
				
			}
			
			
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
		}
	});	
	
	}
/*





*/