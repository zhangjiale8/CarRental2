/**
 * 主页JS
 */

/** 获取菜单数据 */
$.getJSON('pages/json/adminMenu.json', function(data) {
	var menuData = data;
	if (menuData.length > 0) {
		$.each(menuData, function(i, o) {
			$('#menu-accordion').accordion('add', {
				title : o.accordionTile,
				content : '<ul id="menu' + i + '" class="easyui-tree"></ul>',
				selected : o.accordionSelected
			});

			$('#menu' + i).tree({
				data : o.treeData,
				onClick : function(node) {
					var tab = $('#main-tabs').tabs('getTab', node.text);

					if (tab != null) {
						$('#main-tabs').tabs('select', node.text);
						tab.panel('refresh');
					} else {
						$('#main-tabs').tabs('add', {
							title : node.text,
							iconCls : node.iconCls,
							href : node.attributes.url,
							selected : true,
							closable : true
						});
					}
				}
			});
		});
	}
});

/**
 * 登出
 */
function consumerlogout(){
	$.ajax({ // 获取用户信息
		type: "get",
		contentType: "application/json",
		url : "logout.ctrl",
		async : false,
		dataType : "json",
		success : function(data) {
			if(data && data.object == "ok"){
				window.location.href="consumerLogin.jsp";
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
		}
	});
}

/** 获取用户信息 */
$.ajax({ // 获取用户信息
	type: "get",
	contentType: "application/json",
	url : "getLoginUserInfo.ctrl",
	async : false,
	dataType : "json",
	success : function(data) {
		//alert(data.object.username);
		$("#username").text(data.object.username);
	},
	error : function(XMLHttpRequest, textStatus, errorThrown) {
		console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
	}
});