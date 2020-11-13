<!DOCTYPE html>
<html lang="en">
    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">
    
        <title>H3NM - Login</title>
    
        <!-- Bootstrap core CSS -->
        <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    
        <!-- Custom fonts for this template -->
        <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
        <link href='https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic' rel='stylesheet'
            type='text/css'>
        <link
            href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800'
            rel='stylesheet' type='text/css'>
    
        <!-- Custom styles for this template -->
        <link href="css/account.css" rel="stylesheet">
    
    </head>
<body>

<?php
    if (isset($_POST["btn_submit"])) {
        $crpass = $_SESSION["cr_password"];
        $pass = $_POST["pass"];
        $repass = $_POST["re_pass"];

        if ($crpass == "" || $pass == "" || $repass == "") {
            echo "<script>alert('Please enter completely information')</script>";
        }
        else if($pass !== $repass) {
            echo "<script>alert('Password not match!')</script>";
        }
        else{
            if(isset($_SESSION["username"])){
                require "connection.php";
                $query = "UPDATE users SET `password` = MD5('{$pass}') WHERE username = " .$_SESSION["username"]. " AND `password` = "{$crpass};
                try{
                    $connection->query($query);
                    echo "<script>alert('Change password success')</script>";
                    header("Location: index.php");
                }
                catch(Exception $e){
                    echo "<script>alert('Current password wrong!')</script>";
                }
            }
            else{
                echo "<script>alert('Fail to change password')</script>";
            }
        }
    }
        
    ?>

    <div class="main">
        <div class="container">
            <div class="signup-content">
                <div class="signup-form">
                    <h2 class="form-title">Change password</h2>
                    <form method="POST" class="register-form" id="register-form">
                        <div class="form-group">
                            <label for="cr_password"><i class="ml-1 fa fa-unlock" aria-hidden="true"></i></label>
                            <input type="password" name="cr_password" id="cr_password" placeholder="Current Password"/>
                        </div>
                        <div class="form-group">
                            <label for="pass"><i class="ml-1 fa fa-lock"></i></label>
                            <input type="password" name="pass" id="pass" placeholder="Password"/>
                        </div>
                        <div class="form-group">
                            <label for="re-pass"><i class="ml-1 fa fa-lock"></i></label>
                            <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password"/>
                        </div>
                        <div class="form-group form-button">
                            <input type="submit" name="btn_submit" id="signup" class="form-submit btn-bg-blue" value="Submit"/>
                        </div>
                    </form>
                </div>
                <div class="signup-image">
                    <figure><img src="img/home-bg.jpg" class="rounded" alt="sing up image"></figure>
                </div>
            </div>
        </div>
    </div>

    <!-- JS -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="js/main.js"></script>
</body>
</html>