<?php
      require "connect.php";
      $p_id=(int)$_GET['p_id'];
      $sql = "Delete FROM  'POST' where 'p_id' ={'$p_id'}";
      $result =mysqli_query($conn,$sql);
      if(!$result){
        die('Lỗi :'. mysqli_error($conn));
      }
      header("Location: dashboard.php");
      ?>