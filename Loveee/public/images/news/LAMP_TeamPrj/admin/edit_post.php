<?php
require "connect.php";
$p_id=(int)$_GET['p_id'];
$sql ="select * from post where p_id={$p_id}";
$result = mysql_query($sql);
while($row = mysql_fetch_assoc($result)){
    $status=$row['status'];
}
if($status=="1")
    {
        echo " Bài này đã được duyệt";
    }
else{
    $sql="update post set status='1' where p_id={$p_id}";
}

header("Location: dashboard.php");
?>