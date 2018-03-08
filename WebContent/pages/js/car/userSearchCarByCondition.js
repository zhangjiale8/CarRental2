
/**异步加载可租赁汽车信息列表*/
/**
	page:页码
	pageSize:每页的记录条数
	此方法除了传入page和pageSize之外，还应知道的有三个参数：
	一、表的全部数据，json串格式，可通过action查询数据库得到。
	二、表头所对应的列的key及名称，也是json串格式
	三、表所对应的id
	注：此处只是适合表头只有一行，且事先写好的情况。您可以根据需要改一下，逻辑思路就是这样，欢迎批评指正。
 */

var Car;
function carInfoSearch(page, pageSize) {
	var ptable = document.getElementById("page_table");
	var num = ptable.rows.length;//table.rows返回表格中包含的所有行，此处假设表由表头1行和表体N行组成
	//alert(num);
	//清除tbody
	for (var j = num - 1; j > 0; j--) {
		ptable.deleteRow(j);
	}
	
	Car = tackCarListByCondition();
	var totalNums = Car.length;//总記錄数
	var totalPage = Math.ceil(totalNums / pageSize);//总页数
	var begin = (page - 1) * pageSize;//页起始位置(包括)
	var end = page * pageSize;//页结束位置(不包括)
	end = end > totalNums ? totalNums : end;
	//向tbody中写入数据
	var n=0;
	var new_div = "";	    		    	
    	for (var i = begin; i < end; i++) {
    		new_div+='<tr>'
	    		new_div += '<td>'
	    		new_div += '<hr style="border: 1 dashed #987cb9;" width="100%" color="red" size="3">'
	    		new_div += '</td>'
	    		new_div += '</tr>'
	    		new_div += '<tr>'
	    		new_div += '<td>'
	    		new_div += '<div>'
	    		new_div += '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="table_list">'
	    		new_div += '<tr>'
	    		new_div += '<td width="250">&nbsp;&nbsp;&nbsp;<a href="pages/receiver/receiverList.html?CarId='+Car[i].id+'" class="easyui-linkbutton" data-options="iconCls:'
	    		+'icon-add'+'" ><span style="font-size: 15px;color: blue">我要租车</span></a></td>'
	    		if(Car[i].brand=="大众"&&Car[i].c_type=="帕萨特"){
	    			new_div += '<td width="200">&nbsp;&nbsp;&nbsp;<img src="images/cars/DZ-pasate.jpg" witdth="130" height="100" ></td>'
	    		}
	    		else if(Car[i].brand=="大众"&&Car[i].c_type=="迈腾"){
	    			new_div += '<td width="200">&nbsp;&nbsp;&nbsp;<img src="images/cars/DZ-maiteng.jpg" witdth="130" height="100" ></td>'
	    		}else if(Car[i].brand=="大众"&&Car[i].c_type=="朗逸"){
	    			new_div += '<td width="200">&nbsp;&nbsp;&nbsp;<img src="images/cars/DZ-langyi.jpg" witdth="130" height="100" ></td>'
	    		}else if(Car[i].brand=="宝马"&&Car[i].c_type=="3系列"){
	    			new_div += '<td width="200">&nbsp;&nbsp;&nbsp;<img src="images/cars/BM-3.jpg" witdth="130" height="100" ></td>'
	    		}else if(Car[i].brand=="宝马"&&Car[i].c_type=="5系列"){
	    			new_div += '<td width="200">&nbsp;&nbsp;&nbsp;<img src="images/cars/BM-5.jpg" witdth="130" height="100" ></td>'
	    		}else if(Car[i].brand=="别克"&&Car[i].c_type=="君越"){
	    			new_div += '<td width="200">&nbsp;&nbsp;&nbsp;<img src="images/cars/BK-junyue.jpg" witdth="130" height="100" ></td>'
	    		}else if(Car[i].brand=="别克"&&Car[i].c_type=="英朗"){
	    			new_div += '<td width="200">&nbsp;&nbsp;&nbsp;<img src="images/cars/BK-yinglang.jpg" witdth="130" height="100" ></td>'
	    		}else if(Car[i].brand=="丰田"&&Car[i].c_type=="卡罗拉"){
	    			new_div += '<td width="200">&nbsp;&nbsp;&nbsp;<img src="images/cars/FT-kaluola.jpg" witdth="130" height="100" ></td>'
	    		}else if(Car[i].brand=="丰田"&&Car[i].c_type=="普拉多"){
	    			new_div += '<td width="200">&nbsp;&nbsp;&nbsp;<img src="images/cars/FT-puladuo.jpg" witdth="130" height="100" ></td>'
	    		}else if(Car[i].brand=="奇瑞"&&Car[i].c_type=="风云2"){
	    			new_div += '<td width="200">&nbsp;&nbsp;&nbsp;<img src="images/cars/QR-fengyun2.jpg" witdth="130" height="100" ></td>'
	    		}else if(Car[i].brand=="奇瑞"&&Car[i].c_type=="瑞虎5"){
	    			new_div += '<td width="200">&nbsp;&nbsp;&nbsp;<img src="images/cars/QR-ruihu5.jpg" witdth="130" height="100" ></td>'
	    		}else if(Car[i].brand=="现代"&&Car[i].c_type=="朗动"){
	    			new_div += '<td width="200">&nbsp;&nbsp;&nbsp;<img src="images/cars/XD-langdong.jpg" witdth="130" height="100" ></td>'
	    		}else if(Car[i].brand=="现代"&&Car[i].c_type=="途胜"){
	    			new_div += '<td width="200">&nbsp;&nbsp;&nbsp;<img src="images/cars/XD-tusheng.jpg" witdth="130" height="100" ></td>'
	    		}else if(Car[i].brand=="雪佛兰"&&Car[i].c_type=="科鲁兹"){
	    			new_div += '<td width="200">&nbsp;&nbsp;&nbsp;<img src="images/cars/XFL-keluzi.jpg" witdth="130" height="100" ></td>'
	    		}else if(Car[i].brand=="雪佛兰"&&Car[i].c_type=="科帕奇"){
	    			new_div += '<td width="200">&nbsp;&nbsp;&nbsp;<img src="images/cars/XFL-kepaqi.jpg" witdth="130" height="100" ></td>'
	    		}else{
	    			new_div += '<td width="200">&nbsp;&nbsp;&nbsp;<img src="images/cars/other.jpg" witdth="130" height="100" ></td>'
	    		}
	    		
	    		new_div += '<td width="525">&nbsp;&nbsp;&nbsp;'
	    		new_div += '<div class="title_car">'
	    		new_div += '<p id="license" class="license">车牌号码：<span class="license">'+Car[i].license+'</span>'
	    		new_div += '</p>'
	    		new_div += '<p id="color" class="color">车辆颜色：<span class="color">'+Car[i].color+'</span>'
	    		new_div += '</p>'
	    		new_div += '<p id="brand" class="brand">车辆品牌：<span class="brand">'+Car[i].brand+'</span>'
	    		new_div += '</p>'
	    		new_div += '<p id="c_type" class="c_type">车辆类型：<span class="c_type">'+Car[i].c_type+'</span>'
	    		new_div += '</p>'
	    		new_div += '<p id="displacement" class="displacement">车辆排量：<span class="displacement">'+Car[i].displacement+'</span>'
	    		new_div += '</p>'
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

	    		new_div += '<p id="price" class="price">出租价格：<span class="displacement">'+Car[i].price+'</span>'
	    		new_div += '</p>'
	    		new_div += '</div>'
	    		new_div += '<div id="c_describe" name="c_describe" class="c_describe">车辆描述：<span class="license">'+Car[i].c_describe+'</span>'
	    		new_div += '</div>'
	    		new_div += '</td>'
	    		new_div += '<td width="250" align="right"><a href="pages/car/carInfo2.html?id='+Car[i].id+'"class="green_a">查看详情>></a></td>'
	    		new_div += '</tr>'
	    		new_div += '</table>'
	    		new_div += '</div>'
	    		new_div += '<br />'
	    		new_div += '<br />'
	    		new_div += '</td>'
	    		new_div += '</tr>'
        	document.getElementById('CarListContainer').innerHTML = new_div;
			
		}
	
    /*var row = ptable.insertRow(n++);
	var rowData = tableData[i];
	for (var j = 0; j < columns.length; j++) {
		var col = columns[j].cid;
		var cell = row.insertCell(j);
		var cellData = rowData[col];
		cell.innerHTML = cellData;
	}*/
	//生成分页工具条
	var pageBar = "第" + page + "页/共" + totalPage + "页" + " ";
	if (page > 1) {
		pageBar += "<a href=\"javascript:splitPage(" + 1 + "," + pageSize
				+ ");\">首页</a> ";
	} else {
		pageBar += "首页 ";
	}
	if (page > 1) {
		pageBar += "<a href=\"javascript:splitPage(" + (page - 1) + ","
				+ pageSize + ");\">上一页</a> ";
	} else {
		pageBar += "上一页 ";
	}
	if (page < totalPage) {
		pageBar += "<a href=\"javascript:splitPage(" + (page + 1) + ","
				+ pageSize + ");\">下一页</a> ";
	} else {
		pageBar += "下一页 ";
	}
	if (page < totalPage) {
		pageBar += "<a href=\"javascript:splitPage(" + (totalPage) + ","
				+ pageSize + ");\">尾页</a> ";
	} else {
		pageBar += "尾页 ";
	}
	document.getElementById("page_bar").innerHTML = pageBar;
}


function tackCarListByCondition(){
var CarList;
var brand = $('#carSearchForm input[name="brand"]').val();

//alert(brand);
var displacement = $('#carSearchForm input[name="displacement"]').val();

//alert(displacement);
var c_type = $('#carSearchForm input[name="c_type"]').val();

//alert(c_type);


var requestData = {
		brand : brand,
		c_type : c_type,
		displacement : displacement
		    };

$.ajax({
    type : "post",
    url : "car/searchCarListByCondition.ctrl",
    contentType : "application/json",
    async : false,
    dataType : "json",
    data : JSON.stringify(requestData),
    success : function(data) {
     	if (data.object) {
     		console.log(data.object);
     		CarList = data.object;
    		
		} else {
			 alert(data.error+"返回的错误");
		    }
     	},	
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
	}
	
});
return CarList;
}

function carInfoRedo(){
	splitPage(1,2);
 //   $('#carSearchForm')[0].reset(); 
//	$('#carSearchForm').form('clear');
	
//	document.getElementById("carSearchForm").reset();
//	$('#carSearchForm input[name="displacement"]').val("");
	$(':input','#carSearchForm')
	.not(':button, :submit, :reset, :hidden')
	.val('')
	.removeAttr('checked')
	.removeAttr('selected');
}