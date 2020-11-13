<?php
require "connect.php";
$u_id=(int)$_GET['u_id'];
$sql ="select * from Users where u_id={$id}";
$result = mysql_query($sql);
while($row = mysql_fetch_assoc($result)){
    $role=$row['role'];
}
if($role=="1")
    {
        echo "User này đã là Admin";
    }
else{
    $sql="update user set status='1' where p_id={$id}";
}

header("Location: dashboard.php");
?>