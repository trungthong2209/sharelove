<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>H3NM Blog</title>

  <!-- Bootstrap core CSS -->
  <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

  <!-- Custom fonts for this template -->
  <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
  <link href='https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>

  <!-- Custom styles for this template -->
  <link href="css/styles.css" rel="stylesheet">

</head>


<body>

  <!-- Navigation -->
  <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
    <div class="container">
      <a class="navbar-brand" href="index.html">H3NM</a>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        Menu
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="index.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="manage.html">Manage</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="createPost.html">Create Post</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="editProfile.html">Edit Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="login.html">Login / Register</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
 <?php
  require "connection.php";
  $sql = "SELECT * FROM post";
  $result =mysqli_query($conn,$sql);
  if(!$result){
    die('Loiiiiiiiiiiiiiiii :'. mysqli_error($conn));
  }
  ?>


  <!-- Page Header -->
  <header class="masthead" style="background-image: url('img/home-bg.jpg')">
    <div class="overlay"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="site-heading">
            <h1>H3MN Blog</h1>
            <span class="subheading">An amazing IT blog.</span>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- content -->
  <div class="content">
    <!-- Animated -->
                        <div class="card-body">
                            <h4 class="box-title">Blog </h4>
                        </div>
                        <div class="card-body--">
                            <div class="table-stats order-table ov-h">
                                <table class="table " style="border: 1;" style="text-align: center">
                                    <thead>
                                        <tr>
                                            <th style="text-align: center">#</th>
                                            <th style="text-align: center">Title</th>
                                            <th style="text-align: center">SubTitle</th>
                                            <th style="text-align: center">Content</th>
                                            <th style="text-align: center">Time</th>
                                            <th style="text-align: center">ID_Author</th>
                                            <th style="text-align: center"> ID_Category</th>
                                            <th style="text-align: center" >Image</th>
                                            <th style="text-align: center">Status</th>
                                            <th style="text-align: center" > Tool</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php
                                        if(mysql_num_row($result)>0){
                                        while($row =mysqli_fetch_asoc($result)){
                                          ?>
                                          <tr>
                                            <td ><?php echo $row['p_id']?></td>
                                            <td ><?php echo $row['title']?></td>
                                            <td ><?php echo $row['subtitle']?></td>
                                            <td ><?php echo $row['content']?></td>
                                            <td ><?php echo $row['time']?></td>
                                            <td ><?php echo $row['id_author']?></td>
                                            <td ><?php echo $row['id_category']?></td>
                                            <td ><?php echo $row['image']?></td>
                                            <td ><?php echo $row['status']?></td>
                                            <td>
                                                 <a href="admin/edit_post.php?id=<?php echo $row['id'];?>"><button style="background-color: green;color: black"><b> duyệt</button></a>
                                                  <a href="admin/deletenew.php?id=<?php echo $row['id'];?>"><button style="background-color: green;color: black"><b> xóa</button></a>
                                            </td>
                                        </tr>
                                        <?php
                                        }
                                      }
                                      ?>
                                        
                                    </tbody>
                                </table>
                            </div> <!-- /.table-stats -->
                        </div>
        <hr>
        <br>
        <?php
        require "connect.php";
        $sql = "SELECT * FROM 'Users'";
        $result =mysqli_query($conn,$sql);
        if(!$result){
          die('Lỗi'.mysqli_error($conn));
        }
        ?>
      <div class="user">
                        <div>
                            <h4 class="box-title">User</h4>
                        </div>
                        <div class="card-body">
                            <div class="table-stats">
                                <table class="table" style="border: 1;" style="text-align: center"> 
                                    <thead>
                                        <tr>
                                            <th class="serial" style="text-align: center">#</th>
                                            <th style="text-align: center">Username</th>
                                            <th style="text-align: center">Password</th>
                                            <th style="text-align: center">Full_name</th>
                                            <th style="text-align: center">Role</th>
                                            <th style="text-align: center"> Tool</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php
                                    if(mysql_num_row($result)>0){
                                        while($row =mysqli_fetch_asoc($result)){
                                          ?>
                                          <tr>
                                          <td  style="text-align: center"><?php echo $row['id']?></td>
                                            <td style="text-align: center" ><?php echo $row['Username']?></td>
                                            <td style="text-align: center" ><?php echo $row['Password']?></td>
                                            <td  style="text-align: center"><?php echo $row['Full_Name']?></td>
                                            <td style="text-align: center"><?php echo $row['Role']?></td>
                                            <td style="text-align: center">
                                            <a href="admin/edituser1.php?id=<?php echo $row['id'];?>"><button style="background-color: green;color: black"><b> Writer</button></a>
                                            <a href="admin/edituser2.php?id=<?php echo $row['id'];?>"> <button style="background-color: red;color: black"><b> Admin</button></a>
                                            </td>
                                        </tr>
                                        <?php
                                        }
                                    }
                                    ?>
                                    </tbody>
                                </table>
                            </div> <!-- /.table-stats -->
                          </div>

              
       
         </div><!--/ user -->

      </div> <!-- ./content -->
  <hr>

  <!-- Footer -->
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <ul class="list-inline text-center">
            <li class="list-inline-item">
              <a href="mailto:hoanvn1999@gmail.com" target="_blank">
                <span class="fa-stack fa-lg">
                  <i class="fas fa-circle fa-stack-2x"></i>
                  <i class="fab fa-google fa-stack-1x fa-inverse"></i>
                </span>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="https://github.com/hoanvn1999" target="_blank">
                <span class="fa-stack fa-lg">
                  <i class="fas fa-circle fa-stack-2x"></i>
                  <i class="fab fa-github fa-stack-1x fa-inverse"></i>
                </span>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="https://fb.com/hoan.glad" target="_blank">
                <span class="fa-stack fa-lg">
                  <i class="fas fa-circle fa-stack-2x"></i>
                  <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                </span>
              </a>
            </li>
          </ul>
          <p class="copyright text-muted">Copyright &copy; Hoan Pham Le 2020</p>
        </div>
      </div>
    </div>
  </footer>

  <!-- Bootstrap core JavaScript -->
  <script src="vendor/jquery/jquery.min.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

  <!-- Custom scripts for this template -->
  <script src="js/main.js"></script>
</body>
</html>
