$(document).ready(function() {
	//加载新闻列表
	var item = "";
	$.ajax({
		type: "post",
		url: "php/getNews.php?a=allnews",
		async: true,
		success: function(data) {

			var arr = JSON.parse(data);
			for(var i = 0; i < arr.length; i++) {
				var title = "";
				var con = "";
				if(arr[i].title.length > 10) {
					title = arr[i].title.substr(0, 9) + "...";
				} else {
					title = arr[i].title;
				}

				item += '<tr><td>' + arr[i].nid + '</td>' +
					'<td><div class="img-div"><img class="cover-img" src="' + arr[i].imgurl + '"/></div></td>' +
					'<td>' + title + '</td>' +
					'<td>' + arr[i].cname + '</td>' +
					'<td>' + arr[i].aname + '</td>' +
					'<td>' + arr[i].addtime + '</td>' +
					'<td><span id="' + arr[i].nid + '" class="del-btn btn btn-danger btn-sm">删除</span></td></tr>';
			}
			$("#tbody").append(item);
		},
		error: function() {
			console.log("error!");
		}
	});

	//删除新闻
	$('body').on('click', '.del-btn', function() {
		var nid = $(this).attr('id');
		if(confirm("是否删除该条新闻？")) {
			$(this).parent().parent().remove();
			$.ajax({
				type: "post",
				url: "php/delete.php?a=delnews",
				async: true,
				data: {
					'nid': nid
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

	$('#s-btn').on('click', function() {
		var search = $('#s-input').val();
		if(search == "") {
			alert("请输入搜索关键字！");
		} else {
			location.reload();
		}

	});

});