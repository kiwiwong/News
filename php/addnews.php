<?php
session_start();
header("Content-type:text/html;charset=utf-8");
require 'localDb.php';
//本地数据库连接

$title = @$_POST['title'] ? $_POST['title'] : '';
$content = @$_POST['con'] ? $_POST['con'] : '';
$cid = @$_POST['leibie'] ? $_POST['leibie'] : '';
$addtime = date("Y-m-d H:i:s");

if (isset($_COOKIE['id']) && isset($_COOKIE['aname'])) {
	$_SESSION['id'] = $_COOKIE['id'];
	$aid = $_SESSION['id'];
	$_SESSION['aname'] = $_COOKIE['aname'];
	$aname = $_SESSION['aname'];
	$imgurl = $_COOKIE['imgurl'];

	$sql_select = "select cname from category where cid= ?";
	$stmts = mysqli_prepare($con, $sql_select);
	mysqli_stmt_bind_param($stmts, 's', $cid);
	mysqli_stmt_execute($stmts);
	$results = mysqli_stmt_get_result($stmts);
	$cname = mysqli_fetch_assoc($results)['cname'];
	

	// 预处理及绑定并执行
	$insert_sql = "INSERT INTO NEWS (title, content, imgurl, aid, aname, cid, cname, addtime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
	$stmt = $con -> prepare($insert_sql);
	$stmt -> bind_param("ssssssss", $title, $content, $imgurl, $aid, $aname, $cid, $cname, $addtime);
	$result = $stmt -> execute();

	if ($result) {
		echo "数据插入成功";
	} else {
		echo "数据插入失败";
	}

	$stmt -> close();
	$stmts -> close();

}
$con -> close();

//$insert_sql = "insert into news(title,content,addtime)values(? , ? , ? )";
//$stmt = mysqli_prepare($con, $insert_sql);
//mysqli_stmt_bind_param($stmt, 'sss', $title, $content, $addtime );
//$result_insert = mysqli_stmt_execute($stmt);

//if ($result_insert) {
//	echo "<script>alert('提交成功！');location='../admin.html';</script>";
//	exit ;
//}else {
//	echo "<script>alert('提交失败！');location='../admin.html';</script>";
//	exit ;
//}
?>