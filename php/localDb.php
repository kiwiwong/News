<?php
	header('Content-Type:text/html;charset=utf-8');
	
	define('DB_HOST', 'localhost');
	define('DB_USER', 'root'); 
	define('DB_PWD','150462'); 
	define('DB_NAME', 'news');
	
	$con= @mysqli_connect(DB_HOST,DB_USER, DB_PWD,DB_NAME) or die('数据库链接失 败：'.mysqli_error($con));
	
	
	mysqli_set_charset($con, 'utf-8');
?>