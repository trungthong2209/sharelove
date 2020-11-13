view:
<?php
require_once("connection.php");
try {
  	echo "<div class='div-table'><h2>Danh sach san pham</h2><table style='width:100%;'>
  	<tr>
    		<th style='text-align: center; width:40pt'>No.</th>
    		<th style='text-align: center'>tên hàng</th>
    		<th style='text-align: center'>loại hàng</th>
    		<th style='text-align: center'>số lượng</th>
		<th style='text-align: center'>đơn giá</th>
		<th style='text-align: center'>thành tiền</th>
  	</tr>";
  	foreach($connection->query("SELECT * FROM sanpham") as $row) {
			echo "<tr><td style='text-align: center'>" .$row['id'] . "</td><td>" . $row['tenhang'] . "</td><td>" .$row['loaihang'] . "</td><td style='text-align: right'>" . $row['soluong'] . "</td><td style='text-align: center'>" . $row['dongia'] . "</td><td style='text-align: right'>" . $row['soluong']* $row['dongia'] . "</td></tr>";
			
  	}
	  echo "</table></div>";
	  

		
foreach($connection->query("SELECT count(id) ,sum(soluong),sum(dongia),sum(dongia)/count(dongia) as tb,sum(soluong*dongia) as tongtien,max(soluong),max(soluong*dongia) as tienmax FROM sanpham") as $row){
	echo"<tr> <br>
	<td style='text-align: center'> Tổng số lượng bản ghi</td> <td> ". $row['count(id)'] . "</td> <br>
	<td style='text-align: center'>tống sô lượng</td> <td> " . $row['sum(soluong)'] . "</td> <br>
	<td style='text-align: center'>Tổng dơn gia</td> <td> " . $row['sum(dongia)'] . "</td> <br>
	<td style='text-align: center'>dơn giá trung bình</td> <td> " . $row['tb'] . "</td> <br>
	<td style='text-align: center'>Tổng thanh tiền</td> <td> " . $row['tongtien'] . "</td> <br>
	<td style='text-align: center'>số lượng lớn nhất</td> <td> " . $row['max(soluong)'] . "</td> <br>
	<td style='text-align: center'>thành tiền cao nhất</td> <td> " . $row['tienmax'] . "</td> <br><br>
	</tr>";
	
}
foreach($connection->query("SELECT loaihang, sum(soluong), sum(soluong*dongia) FROM sanpham GROUP BY loaihang") as $row) {
	echo"<tr>
 <br>
	<td style='text-align: center'>Tên loại hàng:</td> <td> ". $row['loaihang'] . "</td> <br>
	<td style='text-align: center'>Tổng số lượng theo loại:</td> <td> ". $row['sum(soluong)'] . "</td> <br>
	<td style='text-align: center'>Tống thành tiền theo loại:</td> <td> " . $row['sum(soluong*dongia)'] . "</td>  <br>
	
	</tr>";
}
	  
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
?>
