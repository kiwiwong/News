<?php
header("Content-type:text/html;charset=utf-8");
require 'localDb.php';
//本地数据库连接

$a = @$_GET['a'] ? $_GET['a'] : '';

if ($a == 'delnews') {
	
	$nid = $_POST['nid'];
	$sql_delete = "delete from news where nid=?";
	$stmt = $con -> prepare($sql_delete);
	$stmt -> bind_param("s",$nid);
	$result = $stmt -> execute();

	if ($result) {
		echo "数据删除成功";
	} else {
		echo "数据删除失败";
	}

	$stmt -> close();

}elseif($a == 'delcount'){

	$aid = $_POST['aid'];
	$sql_delete = "delete from admin where aid=?";
	$stmt = $con -> prepare($sql_delete);
	$stmt -> bind_param("s",$aid);
	$result = $stmt -> execute();

	if ($result) {
		echo "数据删除成功";
	} else {
		echo "数据删除失败";
	}

	$stmt -> close();
}

mysqli_close($con);

?>