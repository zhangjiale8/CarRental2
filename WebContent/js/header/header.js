/**异步加载站内新闻信息列表*/
//alert("ccc");
var Systemnews;
$.ajax({
    type : "post",
    url : "news/searchSystemnewsList.ctrl",
    contentType : "application/json",
    async : false,
    dataType : "json",
    success : function(data) {
     	if (data.object) {
     		Systemnews = data.object;
    		var new_div = "";
    		var j =0;
		    for(var i=0; i < Systemnews.length; i++){ 
		    	
		    	new_div += '<li>';	
		    	new_div += '<a href="news/newsInfo.html?newsId='+Systemnews[i].id+'">'
		    	new_div += ' <span>'+Systemnews[i].title+'</span> ';
		    	new_div += '&nbsp;';
		    	new_div += '<span >'+Systemnews[i].publishAt+'</span>';
		    	new_div += '</a>';
		    	new_div += '</li>';
		    	j++;
		    	if(j>3){
		    		break;
		    	}
		    	
		    }	
		    
		    
		  //绑到一个容器里，container
	    	$("#newsContainer").append(new_div);
		} else {
			 alert(data.error+"返回的错误");
		    }
     	},	
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
	}
	
});