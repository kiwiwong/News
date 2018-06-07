$(function() {
	$.ajax({
		type: "post",
		url: "php/getNews.php?a=a",
		async: true,
		success: function(data) {
			var item = "";
			var arr = JSON.parse(data);

			for(var i = 0; i < arr.length; i++) {
				item += '<div class="news-item" id="' + arr[i].nid + '">' +
					'<div class="item-wrap row">' +
					'<div class="news-cover col-sm-3 col-md-3 col-lg-3">' +
					'<img src="' + arr[i].imgurl + '" class="news-img"/></div>' +
					'<div class="news-title col-sm-9 col-md-9 col-lg-9" align="left">' +
					'<a href=""><h4>' + arr[i].title + '</h4></a>' +
					'<p>' + arr[i].aname + '&nbsp;&nbsp;' + arr[i].addtime + '</p>' +
					'</div></div></div>';
			}

			$('#search-con').append(item);
			$('#search-num').append(arr.length);

		},
		error: function() {
			console.log("加载出错！");
		}
	});
	
	$('body').on('click', '.news-item', function() {
		var nid = $(this).attr('id');
		$.ajax({
			type: "post",
			url: "php/getNews.php?a=getnid",
			async: true,
			data: {
				'nid': nid
			},
			success: function(data) {
				location.href = 'article.html';
			},
			error: function() {
				alert("服务器繁忙，请重试？");
			}
		});
	});
	
	$('#s-btn').on('click',function(){
		var search = $('#s-input').val();
		if(search == ""){
			alert("请输入搜索关键字！");
		}else{
			location.reload();	
		}
		
	});
	
});