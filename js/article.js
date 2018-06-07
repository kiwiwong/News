$(function() {
	$.ajax({
		type: "post",
		url: "php/getNews.php?a=getcon",
		async: true,
		success: function(data) {
			var arr = JSON.parse(data);

			$('#title-con').append(arr[0].title);
			$('#aname').append(arr[0].aname);
			$('#addtime').append(arr[0].addtime);
			$('#news-con').append(arr[0].content);

		},
		error: function() {
			console.log("加载出错！");
		}
	});

});