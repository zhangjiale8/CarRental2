/**
 * http://usejsdoc.org/
 */
$.ajaxSetup({
	error : function(XMLHttpRequest, textStatus, errorThrown) {
		if (XMLHttpRequest.status == 403) {
			alert('您没有权限访问此资源或进行此操作');
			return false;
		}
	},
	complete : function(XMLHttpRequest, textStatus) {
		//console.log("textStatus --> " + textStatus);
		if (XMLHttpRequest.status == 444) {
			window.location.href="index.html"
		}
	}
});