/**
 * 主页JS
 */

/** 获取菜单数据 */
$.getJSON('ManagerPages/json/managerMenu.json', function(data) {
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
function managerlogout(){
	$.ajax({ // 获取用户信息
		type: "get",
		contentType: "application/json",
		url : "Managerlogout.ctrl",
		async : false,
		dataType : "json",
		success : function(data) {
			if(data && data.object == "ok"){
				window.location.href="managerLogin.jsp";
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
	url : "getLoginManagerM_userName.ctrl",
	async : false,
	dataType : "json",
	success : function(data) {
		$("#m_username").text(data.object.m_username);
	},
	error : function(XMLHttpRequest, textStatus, errorThrown) {
		console.log("error:"+XMLHttpRequest+" "+textStatus+" "+errorThrown);
	}
});