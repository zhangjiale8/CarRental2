/**异步加载可租赁汽车信息列表*/
var Car;
$.ajax({
    type : "post",
    url : "searchAllRentableCarList.ctrl",
    contentType : "application/json",
    async : false,
    dataType : "json",
    success : function(data) {
     	if (data.object) {
    		Car = data.object;
    		var new_div = "";
		    for(var i=0 ;i < Car.length; i++){ 
		    	
		    	new_div += ' <hr style="border: 1 dashed #987cb9;" width="100%" color="red" size="3">';
		    	new_div += '<div>';
		    	new_div += '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="table_list" >';
		    	new_div += '<tr>';
		    	new_div += ' <td width="100"><a href="pages/receiver/receiverList.html?CarId='+Car[i].id+'" class="easyui-linkbutton" data-options="iconCls:'+'icon-add'
		    		+'" ><span style="font-size: 15px;color: blue">我要租车</span></a></td>';
		    	new_div += ' <td width="135"><img src="images/tp_car.jpg" width="105" height="70"></td>';
		    	new_div += ' <td width="525">';
		    	new_div += ' <div class="title_car">';
		    	new_div += ' <p id="license" class="license">车牌号码：<span class="license">'+Car[i].license+'</span></p>';
		    	new_div += ' <p id="color" class="color">车辆颜色：<span class="color">'+Car[i].color+'</span></p>';
		    	new_div += ' <p id="brand" class="brand">车辆品牌：<span class="brand">'+Car[i].brand+'</span></p>';
		    	new_div += ' <p id="c_type" class="c_type">车辆类型：<span class="c_type">'+Car[i].c_type+'</span></p>';
		    	new_div += ' <p id="displacement" class="displacement">车辆排量：<span class="displacement">'+Car[i].displacement+'</span></p>';
		    	if(Car[i].c_level==1){
		    		new_div += ' <p id="level_kind" class="level_kind">车辆等级：<span class="level_kind">经济型</span></p>';
		    	}else if(Car[i].c_level==2){
		    		new_div += ' <p id="level_kind" class="level_kind">车辆等级：<span class="level_kind">家用型</span></p>';
		    	}else if(Car[i].c_level==3){
		    		new_div += ' <p id="level_kind" class="level_kind">车辆等级：<span class="level_kind">商务型</span></p>';
		    	}else if(Car[i].c_level==4){
		    		new_div += ' <p id="level_kind" class="level_kind">车辆等级：<span class="level_kind">豪华型</span></p>';
		    	}else{
		    		$.messager.alert({
		    			title:'错误提示',
		    			msg:"无车辆等级！",
		    			icon:"error"
		    		});
		    	}
		    	new_div += ' <p id="price" class="price">出租价格：<span class="displacement">'+Car[i].price+'</span></p>';
		    	new_div += ' </div>';
		    	new_div += ' <div id="c_describe" name="c_describe" class="c_describe">车辆描述：<span class="license">'+Car[i].c_describe+'</span></div>';
		    	new_div += ' </td>';
		    	new_div += ' <td align="right"><a href="pages/car/carInfo2.html?id='+Car[i].id+'" class="green_a">查看详情>></a></td>';
		    	new_div += ' </tr>';
		    	new_div += ' </table>';
		    	new_div += ' </div><br/><br/>';
		    	
		    }	
		    
		    
		  //绑到一个容器里，container
	    	$("#CarListContainer").append(new_div);
		} else {
			 alert(data.error+"返回的错误");
		    }
     	},	
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
	}
	
});
