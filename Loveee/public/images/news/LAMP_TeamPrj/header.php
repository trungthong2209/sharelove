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
  <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-info" id="mainNav">
    <div class="container">
      <a class="navbar-brand" href="index.html">H3NM</a>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        Menu
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="index.php">Home</a>
          </li>
          <?php            
            if(isset($_SESSION["username"])){
                require "connection.php";
                $query = "SELECT * FROM users WHERE username = " .$_SESSION["username"]. "";
                foreach($connection->query($query) as $row){
                    if($row["role"]==1){
                        echo "<li class='nav-item'>
                        <a class='nav-link' href='manage.php'>Manage</a>
                      </li>";
                    }
                    echo "
                    <li class='nav-item'>
                      <a class='nav-link' href='createPost.php'>Create Post</a>
                    </li>
                    <li class='nav-item'>
                      <a class='nav-link' href='changePassword.php'>Change Password</a>
                    </li>";
                }
            }
            else{
                echo "<li class='nav-item'>
                <a class='nav-link' href='login.php'>Login / Register</a>
              </li>";
            }
          ?>
        </ul>
      </div>
    </div>
  </nav>