<?php
	session_start();
	header("Content-type:text/html;charset=utf-8");
	require 'localDb.php';  //本地数据库连接

	//$con = mysqli_connect('localhost','root','150462','blog');
	//mysqli_set_charset($con,'utf-8');

	$id = $_POST['id'];
	$pwd = $_POST['pwd'];
	$loginTime = date("Y-m-d H:i:s");
	
	$sql_select="select aid,aname,password from admin where aid= ?";   
    $stmt=mysqli_prepare($con,$sql_select);
    mysqli_stmt_bind_param($stmt,'s',$id);
    mysqli_stmt_execute($stmt);
    $result=mysqli_stmt_get_result($stmt);
    $row=mysqli_fetch_assoc($result);

    if($row){

        if($pwd !=$row['password'] || $id !=$row['aid']){

            echo "<script>alert('密码错误，请重新输入');location.href='../login.html'</script>";
            exit;
        }
        else{
//      	//修改登录时间
//	    	$sql_update="update tuser set lastlogin=? where uid=?";
//	    	$temp=mysqli_prepare($con,$sql_update);
//      	mysqli_stmt_bind_param($temp,'ss',$loginTime,$id);
//      	mysqli_stmt_execute($temp);

            $_SESSION['id']=$row['aid'];
		    setcookie("id",$id,time()+24*60*60);
			$_SESSION['aname']=$row['aname'];
		    setcookie("aname",$row['aname'],time()+24*60*60);
            echo "<script>location.href='../admin.html'</script>";
        }
		

    }else{
        echo "<script>alert('您输入的ID不存在');location.href='../login.html'</script>";
        exit;
    };


?>