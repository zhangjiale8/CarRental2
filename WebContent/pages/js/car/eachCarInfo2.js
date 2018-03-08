

/** 获取某一种汽车信息，主要参数id */
var id = getQueryString("id");

function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return decodeURI(r[2]); return null; 
	} 
//alert(id);
var car;
if (id) {
	
	 var requestData = {
			 id : id
			    };
	$.ajax({ // 获取当前地址信息
		type: "post",
		contentType: "application/json",
		url : "../../car/selectCarById.ctrl",
		async : false,
		dataType : "json",
		data : JSON.stringify(requestData),
		success : function(data) {
			$('#eachCarInfo input[name="license"]').val(data.object.license);
			$('#eachCarInfo input[name="color"]').val(data.object.color);
			$('#eachCarInfo input[name="brand"]').val(data.object.brand);
			$('#eachCarInfo input[name="c_type"]').val(data.object.c_type);
			$('#eachCarInfo input[name="displacement"]').val(data.object.displacement);
			if(data.object.c_level==1){
				
				$('#eachCarInfo input[name="level_kind"]').val("经济型");
			}else if(data.object.c_level==2){
				
				$('#eachCarInfo input[name="level_kind"]').val("家用型");
			}else if(data.object.c_level==3){
				
			$('#eachCarInfo input[name="level_kind"]').val("商务型");
			}else if(data.object.c_level==4){
				
			$('#eachCarInfo input[name="level_kind"]').val("豪华型");
			}		
			$('#eachCarInfo input[name="price"]').val(data.object.price);
			$('#eachCarInfo input[name="c_describe"]').val(data.object.c_describe);
			
			
			
			var new_div = "";
			
			if(data.object.brand=="大众"&&data.object.c_type=="帕萨特"){
    			new_div += '<img alt="" src="/CarRental2/images/bigCars/DZ-pasate.jpg" width="90%" height="73%">'
    		}
    		else if(data.object.brand=="大众"&&data.object.c_type=="迈腾"){
    			new_div += '<img alt="" src="/CarRental2/images/bigCars/DZ-maiteng.jpg" width="90%" height="73%">'
    		}else if(data.object.brand=="大众"&&data.object.c_type=="朗逸"){
    			new_div += '<img alt="" src="/CarRental2/images/bigCars/DZ-langyi.jpg" width="90%" height="73%">'
    		}else if(data.object.brand=="宝马"&&data.object.c_type=="3系列"){
    			new_div += '<img alt="" src="/CarRental2/images/bigCars/BM-3.jpg" width="90%" height="73%">'
    		}else if(data.object.brand=="宝马"&&data.object.c_type=="5系列"){
    			new_div += '<img alt="" src="/CarRental2/images/bigCars/BM-5.jpg" width="90%" height="73%">'
    		}else if(data.object.brand=="别克"&&data.object.c_type=="君越"){
    			new_div += '<img alt="" src="/CarRental2/images/bigCars/BK-junyue.jpg" width="90%" height="73%">'
    		}else if(data.object.brand=="别克"&&data.object.c_type=="英朗"){
    			new_div += '<img alt="" src="/CarRental2/images/bigCars/BK-yinglang.jpg" width="90%" height="73%">'
    		}else if(data.object.brand=="丰田"&&data.object.c_type=="卡罗拉"){
    			new_div += '<img alt="" src="/CarRental2/images/bigCars/FT-kaluola.jpg" width="90%" height="73%">'
    		}else if(data.object.brand=="丰田"&&data.object.c_type=="普拉多"){
    			new_div += '<img alt="" src="/CarRental2/images/bigCars/FT-puladuo.jpg" width="90%" height="73%">'
    		}else if(data.object.brand=="奇瑞"&&data.object.c_type=="风云2"){
    			new_div += '<img alt="" src="/CarRental2/images/bigCars/QR-fengyun2.jpg" width="90%" height="73%">'
    		}else if(data.object.brand=="奇瑞"&&data.object.c_type=="瑞虎5"){
    			new_div += '<img alt="" src="/CarRental2/images/bigCars/QR-ruihu5.jpg" width="90%" height="73%">'
    		}else if(data.object.brand=="现代"&&data.object.c_type=="朗动"){
    			new_div += '<img alt="" src="/CarRental2/images/bigCars/XD-langdong.jpg" width="90%" height="73%">'
    		}else if(data.object.brand=="现代"&&data.object.c_type=="途胜"){
    			new_div += '<img alt="" src="/CarRental2/images/bigCars/XD-tusheng.jpg" width="90%" height="73%">'
    		}else if(data.object.brand=="雪佛兰"&&data.object.c_type=="科鲁兹"){
    			new_div += '<img alt="" src="/CarRental2/images/bigCars/XFL-keluzi" width="90%" height="73%">'
    		}else if(data.object.brand=="雪佛兰"&&data.object.c_type=="科帕奇"){
    			new_div += '<img alt="" src="/CarRental2/images/bigCars/XFL-kepaqi.jpg" width="90%" height="73%">'
    		}else{
    			new_div += '<img alt="" src="/CarRental2/images/bigCars/other.jpg" width="90%" height="73%">'
    		}
			
			$("#eachCarImages").append(new_div);
			
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
		}
	});	
	
	}

function carInfoForm(price,level_kind){
	
}
//点击后，弹出订单信息弹框
function receiverInfoForm(){
	
	
	/*alert("666");
	//弹出取车人信息以及添加订单信息
	$("#addOrderWindow").window({
		title : '添加订单信息',
		iconCls : 'icon-edit',
		shadow:true
	}).window("open");*/
	window.location.href ="../../pages/receiver/receiverList.html?CarId="+id;
	
}






//比较两个时间的大小，如果结束时间小于开始时间则返回false，否则返回true
function checkTime(startTime,endTime){  
    var start=new Date(startTime.replace("-", "/").replace("-", "/"));  
    var end=new Date(endTime.replace("-", "/").replace("-", "/"));  
    if(end<start){  
        return false;  
    }else{
    	 return true;  
    }     
}  
//处理显示当前系统时间
function show(){
	   var mydate = new Date();
	   var str = "" + mydate.getFullYear() + "-";
	   if((mydate.getMonth()+1)>0&&(mydate.getMonth()+1)<10){
		   str +="0"+ (mydate.getMonth()+1) + "-";
	   }else{
		   str += (mydate.getMonth()+1) + "-";
	   }
	   
	   if(mydate.getDate()>0&&mydate.getDate()<10){
		   str +="0"+ mydate.getDate();
	   }else{
		   str += mydate.getDate();
	   }
	  
	   return str;
	  }

/** 表单取消按钮点击事件 */
$("#addOrderInfoFormUndo").click(function(){
	$('#addOrderInfoForm').form('clear');
	$("#addOrderWindow").window("close");
});