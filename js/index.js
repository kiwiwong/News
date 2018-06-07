function loadMainNews() {
	//加载主页新闻
	$.ajax({
		type: "post",
		url: "php/getNews.php?a=a",
		async: true,
		success: function(data) {
			var item = "";
			var arr = JSON.parse(data);

			if(arr.length > 3) {
				for(var i = 0; i < 3; i++) {
					item += '<div class="news-item" id="' + arr[i].nid + '">' +
						'<div class="item-wrap row">' +
						'<div class="news-cover col-sm-3 col-md-3 col-lg-3">' +
						'<img src="' + arr[i].imgurl + '" class="news-img"/></div>' +
						'<div class="news-title col-sm-9 col-md-9 col-lg-9" align="left">' +
						'<a href=""><h4>' + arr[i].title + '</h4></a>' +
						'<p>' + arr[i].aname + '&nbsp;&nbsp;' + arr[i].addtime + '</p>' +
						'</div></div></div>';
				}
			} else {
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
			}
			$('#news').append(item);

		},
		error: function() {
			console.log("加载出错！");
		}
	});
}

$(function() {
	loadMainNews();

	//加载右侧热点新闻
	$.ajax({
		type: "post",
		url: "php/getNews.php?a=b",
		async: true,
		success: function(data) {
			var item = "";
			var arr = JSON.parse(data);
			if(arr.length > 4) {
				for(var i = 0; i < 4; i++) {
					item += '<div class="hot-item" id="' + arr[i].nid + '">' +
						'<div class="hot-wrap row">' +
						'<div class="hot-cover col-sm-4 col-md-4 col-lg-4">' +
						'<img src="' + arr[i].imgurl + '" class="hot-img"/></div>' +
						'<div class="hot-title col-sm-8 col-md-8 col-lg-8" align="left">' +
						'<a href=""><p class="h-title">' + arr[i].title + '</p></a>' +
						'</div></div></div>';
				}
			} else {
				for(var i = 0; i < arr.length; i++) {
					item += '<div class="hot-item" id="' + arr[i].nid + '">' +
						'<div class="hot-wrap row">' +
						'<div class="hot-cover col-sm-4 col-md-4 col-lg-4">' +
						'<img src="' + arr[i].imgurl + '" class="hot-img"/></div>' +
						'<div class="hot-title col-sm-8 col-md-8 col-lg-8" align="left">' +
						'<a href=""><p class="h-title">' + arr[i].title + '</p></a>' +
						'</div></div></div>';
				}
			}
			$('#hot').append(item);

		},
		error: function() {
			console.log("加载出错！");
		}
	});

	$('#categories p').mouseover(function() {
		$(this).siblings().removeClass("hover-btn");
		$(this).addClass("hover-btn");
	});
	$('#categories p').mouseout(function() {
		$(this).removeClass("hover-btn");
	})

	//加载推荐新闻
	$('#tuijian').on('click', function() {
		$(this).siblings().removeClass("click-btn");
		$(this).addClass("click-btn");
		$('#news').empty();
		loadMainNews();

	});

	$('#tuijian').siblings().on('click', function() {
		$(this).siblings().removeClass("click-btn");
		$(this).addClass("click-btn");
		$('#news').empty();

		$.ajax({
			type: "post",
			url: "php/getNews.php?a=b",
			async: true,
			success: function(data) {
				var item = "";
				var arr = JSON.parse(data);

				if(arr.length > 3) {
					for(var i = 0; i < 3; i++) {
						item += '<div class="news-item" id="' + arr[i].nid + '">' +
							'<div class="item-wrap row">' +
							'<div class="news-cover col-sm-3 col-md-3 col-lg-3">' +
							'<img src="' + arr[i].imgurl + '" class="news-img"/></div>' +
							'<div class="news-title col-sm-9 col-md-9 col-lg-9" align="left">' +
							'<a href=""><h4>' + arr[i].title + '</h4></a>' +
							'<p>' + arr[i].aname + '&nbsp;&nbsp;' + arr[i].addtime + '</p>' +
							'</div></div></div>';
					}
				} else {
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
				}
				$('#news').append(item);

			},
			error: function() {
				console.log("加载出错！");
			}
		});

	});

	$('body').on('click', '.news-item,.hot-item', function() {
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
	
	$('#s-btn').on('click', function() {
		var search = $('#s-input').val();
		if(search == ""){
			alert("请输入搜索关键字！");
		}else{
			location.href = 'search.html';
		}
	});

});