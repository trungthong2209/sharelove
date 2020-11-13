<?php
require "connect.php";
$u_id=(int)$_GET['id'];
$sql ="select * from Users where u_id={$u_id}";
$result = mysql_query($sql);
while($row = mysql_fetch_assoc($result)){
    $role=$row['role'];
}
if($role=="0")
    {
        echo "User này đã là Writer";
    }
else{
    $sql="update user set status='0' where p_id={$id}";
}

header("Location: dashboard.php");
?>