


/** 根据获取某一种汽车信息，主要参数CarId */
var CarId = getQueryString("CarId");
//alert(CarId);

function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return decodeURI(r[2]); return null; 
	} 

/**异步加载取车人信息列表*/
var Receiver;
$.ajax({
    type : "post",
    url : "../../receiver/receiverListByUserId.ctrl",
    contentType : "application/json",
    async : false,
    dataType : "json",
    success : function(data) {
     	if (data.object) {
     		Receiver = data.object;
    		var new_div = "";
		    for(var i=0 ;i < Receiver.length; i++){ 
		    	new_div += '<hr style="border: 1 dashed #987cb9;" width="100%" color="red" size="3">';
		    	new_div += '<table width="100%" bordercolor="red" border="1" cellspacing="1" cellpadding="1" class="table_list">';
		    	new_div += '<tr>';
		    	new_div += '<td>';
		    	if(Receiver[i].isDefault){
		    		new_div += '<span style="color: blue">[默认]</span>';
		    	}else{
		    		new_div += '<span>&nbsp;&nbsp;&nbsp;</span>';
		    	}
		    	new_div += '</td>';
		    	new_div += '<td valign="top" width="500" onclick="moreinfo(\''+Receiver[i].id+'\')">';
		    	new_div += '<div class="title_car">';
		    	new_div += '<div id="receiveName" class="conpname">姓名：'+Receiver[i].receiveName+'</div>';
		    	new_div += '<div id="receivePhone" class="receivePhone">手机号码：'+Receiver[i].receivePhone+'</div>';
		    	new_div += '<div id="receiveIdentity" class="receiveIdentity">身份证号：'+Receiver[i].receiveIdentity+'</div>';
		    	new_div += '<div id="receiveAddress" class="receiveAddress">取车地址：'+Receiver[i].receiveAddress+'</div>';
		    	new_div += '<div id="backAddress" class="backAddress">还车地址：'+Receiver[i].backAddress+'</div>';
		    	new_div += '</div>';
		    	new_div += '</td>';
		    //	new_div += '<td align="right"><a id="updateReceiverInfo" href="javascript:void(0);" onclick="updateReceiverInfo(\''+Receiver[i].id+'\')" class="green_a">查看详情>></a></td>';
		    	new_div += '<td align="right"><a id="updateReceiverInfo" href="updateReceiver.html?CarId='+CarId+'&&ReceiverId='+Receiver[i].id+'"  class="green_a">查看详情>></a></td>';
		    	new_div += '</tr>';
		    	new_div += '</table>';		    	
		    	
		    }	
		    
		    
		  //绑到一个容器里，container
	    	$("#receiverListContainer").append(new_div);
		} else {
			 alert(data.error+"返回的错误");
		    }
     	},	
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
	}
	
});







/*function updateReceiverInfo(id){
	alert("aaa");

	$("#updateReceiverWindow").window({
		title : '修改/删除取车人信息',
		iconCls : 'icon-add', 
		shadow:true
	}).window("open");
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
				alert(",,,,");
				$('#updateReceiverInfoForm input[name="receiveName"]').val(data.object.receiveName);
				$('#updateReceiverInfoForm input[name="receiveIdentity"]').val(data.object.receiveIdentity);
				$('#updateReceiverInfoForm input[name="receivePhone"]').val(data.object.receivePhone);
				$('#updateReceiverInfoForm input[name="receiveAddress"]').val(data.object.receiveAddress);
				$('#updateReceiverInfoForm input[name="backAddress"]').val(data.object.backAddress);		
				
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
			}
		});
		}
	
}*/
	
/*function updateReceiverInfo(id){
	alert("2222");
	window.location.href ="../../receiver/updateReceiver.html";
	
}*/

	

