<?php
header("Content-type:text/html;charset=utf-8");
session_start();
//清除session
$id = $_SESSION['id'];
$_SESSION = array();
session_destroy();
//清除cookie
setcookie("id",'',time() - 1);
echo "<script>location.href='../index.html'</script>";

?>