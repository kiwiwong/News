<?php
session_start();
header("Content-type:text/html;charset=utf-8");
require 'localDb.php';
//本地数据库连接
//
//$title = @$_POST['title'] ? $_POST['title'] : '';
//$content = @$_POST['con'] ? $_POST['con'] : '';
//$cid = @$_POST['leibie'] ? $_POST['leibie'] : '';
//$addtime = date("Y-m-d H:i:s");
//
//$_SESSION['id'] = $_COOKIE['id'];
//$aid = $_SESSION['id'];
//$imgurl = $_COOKIE['imgurl'];
$cid = '1101';

$sql_select = "select cname from category where cid= ?";
$stmt = mysqli_prepare($con, $sql_select);
mysqli_stmt_bind_param($stmt, 's', $cid);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$cname = mysqli_fetch_assoc($result)['cname'];

echo $cname;

//// 预处理及绑定并执行
//$insert_sql = "INSERT INTO NEWS (title, content, imgurl, aid, cid, addtime) VALUES (?, ?, ?, ?, ?, ?)";
//$stmt = $con -> prepare($insert_sql);
//$stmt -> bind_param("ssssss", $title, $content, $imgurl, $aid, $cid, $addtime);
//$result = $stmt -> execute();
//
//if ($result) {
//	echo "数据插入成功";
//} else {
//	echo "数据插入失败";
//}
//
$stmt -> close();
$con -> close();
?>