<!DOCTYPE html>
<html lang="en">
    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">
    
        <title>H3NM - Register</title>
    
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
        require_once("connection.php");        
        if (isset($_POST["signup"])) {
            $name = $_POST["name"];
            $username = $_POST["username"];
            $password = $_POST["pass"];
            $repass = $_POST["re_pass"];
            if ($username == "" || $password == "" || $name == "") {
                echo "<script>alert('Please enter completely information')</script>";
            }
            else if($password !== $repass) {
                echo "<script>alert('Password not match!')</script>";
            }
            else{
                $sql="select * from users where username=MD5('".$username."')";
                $kt=mysqli_query($connection, $sql);

                if(mysqli_num_rows($kt) > 0){
                    echo "<script>alert('Account exists!')</script>";
                }
                else{
                    $sql = "INSERT INTO Users(Username,Password,Full_Name) VALUES (MD5('$username'),MD5('$password'),'$name')";
                    mysqli_query($connection,$sql);
                    echo "<script>alert('Create account success!')</script>";
                }
            }
        }
    ?>


    <div class="main">
        <div class="container">
            <div class="signup-content">
                <div class="signup-form">
                    <h2 class="form-title">Create an account</h2>
                    <form  method="POST" class="register-form" id="register-form">
                        <div class="form-group">
                            <label for="name"><i class="ml-1 fa fa-user-circle" aria-hidden="true"></i></label>
                            <input type="text" name="name" id="name" placeholder="Your Name"/>
                        </div>
                        <div class="form-group">
                            <label for="username"><i class="ml-1 fa fa-user"></i></label>
                            <input type="text" name="username" id="username" placeholder="Your Username"/>
                        </div>
                        <div class="form-group">
                            <label for="pass"><i class="ml-1 fa fa-unlock"></i></label>
                            <input type="password" name="pass" id="pass" placeholder="Password"/>
                        </div>
                        <div class="form-group">
                            <label for="re-pass"><i class="ml-1 fa fa-unlock"></i></label>
                            <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password"/>
                        </div>
                        <div class="form-group">
                            <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                            <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                        </div>
                        <div class="form-group form-button">
                            <input type="submit" name="signup" id="signup" class="form-submit btn-bg-blue" value="Register"/>
                        </div>
                    </form>
                </div>
                <div class="signup-image">
                    <figure><img src="img/home-bg.jpg" class="rounded" alt="sing up image"></figure>
                    <a href="login.html" class="signup-image-link">I am already member</a>
                </div>
            </div>
        </div>
    </div>

    <!-- JS -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="js/main.js"></script>
</body>
</html>