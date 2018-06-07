<?php
session_start();
header("Content-type:text/html;charset=utf-8");

function mkdirs($dir, $mode = 0777) {
	if (is_dir($dir) || @mkdir($dir, $mode))
		return TRUE;
	if (!mkdirs(dirname($dir), $mode))
		return FALSE;
	return @mkdir($dir, $mode);
}

$savename = date('YmdHis', time()) . mt_rand(0, 9999) . '.jpeg';
//localResizeIMG压缩后的图片都是jpeg格式
$imgdirs = "upload/" . date('Y-m-d', time()) . '/';
mkdirs($imgdirs);
$fileName = $_FILES["file"]["name"];
$savepath = 'upload/' . date('Y-m-d', time()) . '/' . $savename;
// $data['errno'] = 0;
$data['data'] = $savepath;
move_uploaded_file($_FILES["file"]["tmp_name"], $savepath);
print_r(json_encode($data));

$_SESSION['imgurl'] = $savepath;
setcookie("imgurl", $savepath, time() + 12 * 60 * 60);
//	$_SESSION['id']=$_COOKIE['id'];
//  setcookie("id",$_COOKIE['id'],time()+24*60*60);
?>