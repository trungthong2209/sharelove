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

    <script type="text/javascript" src="qrcode.min.js"></script>
    <?php
        require_once("connection.php");
	if($_SERVER['REQUEST_METHOD'] !== 'POST'){
        	$captcha_number = rand(10000,99999);
		$_SESSION["captcha"] = $captcha_number;
	}
	else {
        $captcha_number = $_SESSION["captcha"];
        unset($_SESSION["captcha"]);
	}
        echo "<script type='text/javascript'>
        function onReady()
        {
            var qrcode = new QRCode('id_qrcode', {
                text:'Captcha code: " . $captcha_number ."',
                width: 200,
                height: 200,
                colorDark:'#000000',
                colorLight:'#ffffff',
                correctLevel:QRCode.CorrectLevel.M
            });
        }
        </script>";
        if(isset($_POST["signin"])){
            $usr = $_POST["user_name"];
            $pass = MD5($_POST["password"]);
            $captcha = $_POST["captcha"];
		echo $captcha_number;
            if($captcha == ""){
                echo "<script>alert('Please enter captcha. To get the captcha key, you have to scan QR code')</script>";
            }
            else if($usr == "" || $pass == ""){
                echo "<script>alert('Please enter all of username and password')</script>";
            }
            else if($captcha != $captcha_number){
                echo "<script>alert('Wrong captcha. To get the captcha key, you have to scan QR code')</script>";
            }
            else{
                $query = "SELECT * FROM member WHERE username = MD5('" . $usr . "') AND password = MD5('" . $pass . "') LIMIT 1;";
                $result = $connection->query($query);
                if(mysqli_num_rows($result)==1){
                    $_SESSION["username"] = MD5($usr);
                    header("Location: index.php");
                }
                else{
                    echo "Wrong username or password";
                    header("Location: login.php");
                }
            }
            $connection->close();
        }
    ?>
    
</head>

<body onload=onReady()>
    <div class="main">
        <div class="container">
            <div class="signin-content">
                <div class="signin-image d-flex align-items-center justify-content-center">
                    <figure>
                        <div id="id_qrcode"></div>
                    </figure>                    
                </div>

                <div class="signin-form">
                    <h2 class="form-title">Login</h2>
                    <form method="POST" class="register-form" id="login-form">
                        <div id="login">
                            <div class="form-group">
                                <label for="user_name"><i class="ml-1 fa fa-user" aria-hidden="true"></i></label>
                                <input type="text" name="user_name" id="user_name" placeholder="User Name" />
                            </div>
                            <div class="form-group">
                                <label for="password"><i class="ml-1 fa fa-unlock" aria-hidden="true"></i></label>
                                <input type="password" name="password" id="password" placeholder="Password" />
                            </div>
                            <span>Scan QR code and enter the captcha number here:</span>
                            <div class="form-group">
                              <label for="captcha"><i class="ml-1 fa fa-key" aria-hidden="true"></i></label>
                              <input type="number" name="captcha" id="captcha" placeholder="Captcha" />
                          </div>
                        </div>

                        <div class="form-group form-button text-center">
                            <input type="submit" name="signin" id="signin" class="form-submit btn-bg-blue" value="Log in" />
                            <a href="register.php" class="form-submit btn-bg-red">Create an account</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- JS -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="js/main.js"></script>

    <!-- QR Code  -->
    <script src="js/qrcode.min.js"></script>
</body>

</html>