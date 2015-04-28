<?php
    require_once(__DIR__ . "/../model/config.php");
    
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

    $query = $_SESSION["connection"]->query("SELECT salt, password FROM users WHERE username= '$username'");
    
    if($query->num_rows == 1){
        $row = $query->fetch_array();
        
        if($row["password"] === crypt($password, $row["salt"])) {
            $_SEESSION["authenticated"] = true;
            echo "<p><button><a href='post.php'>Create Post</a></button><button><a href='login.php' >Login</a></button>
                <button><a href='http://localhost/Cantero-Blog/post.php'>Create Post</a></button>
                <button><a href='index.php'>Blog</a></button>
                <button><a href='http://localhost/Cantero-Blog/view/register-form.php'>Register</a></button>"
              .  " <br> Login Succesful!</p>";
        }
        else {
            echo "<p>Invalid username and password</p>";
        }
    }
    else {
        echo "<p>Invalid username and password</p>";
    }
    