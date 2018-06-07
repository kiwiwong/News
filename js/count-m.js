$(document).ready(function() {
	var item = "";
	$.ajax({
		type: "post",
		url: "php/getNews.php?a=d",
		async: true,
		success: function(data) {

			var arr = JSON.parse(data);
			for(var i = 0; i < arr.length; i++) {

				item += '<tr id="count-item"><td>' + arr[i].aid + '</td>' +
					'<td>' + arr[i].aname + '</td>' +
					'<td>' + arr[i].password + '</td>' +
					'<td>' + arr[i].sex + '</td>' +
					'<td>' + arr[i].phone + '</td>' +
					'<td>' + arr[i].email + '</td>' +
					'<td><span id="' + arr[i].aid + '" class="del-btn btn btn-danger btn-sm">删除</span></td></tr>';
			}
			$("#tbody").append(item);
		},
		error: function() {
			console.log("error!");
		}
	});
	
	$('body').on('click','.del-btn',function(){
		var aid = $(this).attr('id');
		if(confirm("是否删除该账号？")) {
			$(this).parent().parent().remove();
			$.ajax({
				type: "post",
				url: "php/delete.php?a=delcount",
				async: true,
				data: {
					'aid': aid
				},
				success: function(data) {
					
				},
				error: function() {
					alert("操作失败！");
					location.reload();
				}
			});
			
		}
	});
	
});