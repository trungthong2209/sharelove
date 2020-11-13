<?php

session_start();

$server = "localhost";
$username = "admin";
$password = "123456";
$db = "cs366";

$connection = new mysqli($server, $username, $password, $db);
if($connection->connect_error){
    die("Connection error" . $connection->connect_error);
}?>