$(function() {
	//创建编辑器
	var E = window.wangEditor;
	var editor = new E('#editor');

	editor.customConfig.uploadImgServer = 'upload.php';
	editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024;
	editor.customConfig.uploadImgMaxLength = 5;
	editor.customConfig.uploadFileName = 'file';
	editor.customConfig.uploadImgHeaders = {
		'Accept': 'multipart/form-data'
	};
	editor.customConfig.uploadImgHooks = {
		error: function(xhr, editor) {
			alert("2:" + xhr);
			// 图片上传出错时触发
			// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
		},
		fail: function(xhr, editor, result) {
			alert("1:" + xhr);
		},
		success: function(xhr, editor, result) {
			// console.log(result)
			// insertImg('https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png')
		},
		customInsert: function(insertImg, result, editor) {
			//console.log(result)
			// 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
			// insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
			// 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
			insertImg(result.data);
		}
	};

	editor.create();

	//	document.getElementById('sub-btn').addEventListener('click', function() {
	//		alert(editor.txt.html()); // 读取 html
	//		//alert(editor.txt.text()); //读取 text
	//	}, false);

	$('#sub-btn').on('click', function() {
		var form = new FormData();
		var title = $('#title').val();
		var con = editor.txt.html();
		var leibie = $('#leibie').val();

		form.append('title', title);
		form.append('con', con);
		form.append('leibie', leibie);
		//console.log(form.get('con'));

		if(confirm("确定发表？")) {
			$.ajax({
				url: 'php/addnews.php',
				type: 'POST',
				data: form, // 上传form封装的数据
				dataType: 'JSON',
				cache: false, // 不缓存
				processData: false, // jQuery不要去处理发送的数据
				contentType: false, // jQuery不要去设置Content-Type请求头
				success: function(data) { //成功回调
					console.log(data);
				},
				error: function() {
					console.log("操作出错！");
				}
			});
		}
		location.reload();

	});

});