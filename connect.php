<?php
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$message = $_POST['message'];
//database connection
$conn = new mysqli('localhost', 'root', '', 'test');
if($conn)
