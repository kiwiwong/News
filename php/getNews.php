<?php
header("Content-type:text/html;charset=utf-8");
require 'localDb.php';
//本地数据库连接

$a = @$_GET['a'] ? $_GET['a'] : '';

if ($a == 'a') {

	$sql_select = "select nid, title,imgurl,aname,addtime from news";
	$result = mysqli_query($con, $sql_select);
	if (!$result) {
		printf("Error: %s\n", mysqli_error($con));
		exit();
	}

	$jarr = array();
	while ($rows = mysqli_fetch_array($result)) {
		$count = count($rows);
		//不能在循环语句中，由于每次删除 row数组长度都减小
		for ($i = 0; $i < $count; $i++) {
			unset($rows[$i]);
			//删除冗余数据
		}
		array_push($jarr, $rows);
	}
	$str = json_encode($jarr, JSON_UNESCAPED_UNICODE);
	echo $str;

} elseif ($a == 'b') {

	$sql_select = "select nid,title,imgurl,aname,addtime from news order by nid desc";
	$result = mysqli_query($con, $sql_select);
	if (!$result) {
		printf("Error: %s\n", mysqli_error($con));
		exit();
	}

	$jarr = array();
	while ($rows = mysqli_fetch_array($result)) {
		$count = count($rows);
		//不能在循环语句中，由于每次删除 row数组长度都减小
		for ($i = 0; $i < $count; $i++) {
			unset($rows[$i]);
			//删除冗余数据
		}
		array_push($jarr, $rows);
	}
	$str = json_encode($jarr, JSON_UNESCAPED_UNICODE);
	echo $str;

} elseif ($a == 'allnews') {

	$sql_select = "select * from news";
	$result = mysqli_query($con, $sql_select);
	if (!$result) {
		printf("Error: %s\n", mysqli_error($con));
		exit();
	}

	$jarr = array();
	while ($rows = mysqli_fetch_array($result)) {
		$count = count($rows);
		//不能在循环语句中，由于每次删除 row数组长度都减小
		for ($i = 0; $i < $count; $i++) {
			unset($rows[$i]);
			//删除冗余数据
		}
		array_push($jarr, $rows);
	}
	$str = json_encode($jarr, JSON_UNESCAPED_UNICODE);
	echo $str;

} elseif ($a == 'd') {

	$sql_select = "select * from admin";
	$result = mysqli_query($con, $sql_select);
	if (!$result) {
		printf("Error: %s\n", mysqli_error($con));
		exit();
	}

	$jarr = array();
	while ($rows = mysqli_fetch_array($result)) {
		$count = count($rows);
		//不能在循环语句中，由于每次删除 row数组长度都减小
		for ($i = 0; $i < $count; $i++) {
			unset($rows[$i]);
			//删除冗余数据
		}
		array_push($jarr, $rows);
	}
	$str = json_encode($jarr, JSON_UNESCAPED_UNICODE);
	echo $str;

} elseif ($a == 'getnid') {

	$nid = $_POST['nid'];
	if ($nid) {
		$_SESSION['clicknid'] = $nid;
		setcookie("clicknid", $nid, time() + 60);
	}

} elseif ($a == 'getcon') {

	if (isset($_COOKIE['clicknid'])) {
		$nid = $_COOKIE['clicknid'];

		$sql_select = "select * from news where nid= ?";
		$stmt = mysqli_prepare($con, $sql_select);
		mysqli_stmt_bind_param($stmt, 's', $nid);
		mysqli_stmt_execute($stmt);
		$result = mysqli_stmt_get_result($stmt);
		//$row = mysqli_fetch_assoc($result);

		//$result = mysqli_query($con, $sql_select);
		if (!$result) {
			printf("Error: %s\n", mysqli_error($con));
			exit();
		}

		$jarr = array();
		while ($rows = mysqli_fetch_array($result)) {
			$count = count($rows);
			//不能在循环语句中，由于每次删除 row数组长度都减小
			for ($i = 0; $i < $count; $i++) {
				unset($rows[$i]);
				//删除冗余数据
			}
			array_push($jarr, $rows);
		}
		$str = json_encode($jarr, JSON_UNESCAPED_UNICODE);
		echo $str;
	}

}

mysqli_close($con);
?>