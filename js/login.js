$(function(){
	$("#login-btn").on('click',function(){
		var id=$("#input-id").val();
		var pwd=$("#input-pwd").val();
		if(id==""){
			alert("请输入ID！");
			location.reload();
		}else if(pwd==""){
			alert("请输入密码！");
			location.reload();
		}else{
			$("#form").submit();
		}
	});
});
