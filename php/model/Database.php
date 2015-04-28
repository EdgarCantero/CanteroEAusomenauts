<?php
class Database {
    private $connection;
    private $host;
    private $username;
    private $password;
    private $database;
    public  $error;
    
    public function __construct($host, $username, $password, $database){
    $this->host = $host; 
    $this->username = $username;
    $this->password = $password;
    $this->database = $database;
    
    $connection = new mysqli($host, $username, $password);
    
    if ($connection->connect_error) {
        die("<p>Error: " . $connection->connect_error . "</p>");
    }
    
    $exists = $connection->select_db($database);
    
    if (!$exists) {
    $query = $connection->query("CREATE DATABASE $database");
    
    if ($query) {
        echo"<P>Successfully created database: " . $database ." </P>";
      }
    }    
    }
    
    public function openConnection() {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);
    
        
    if ($this->connection->connect_error) {
        die("<p>Error: " . $this->connection->connect_error . "</p>");
    }
                }
    
    public function closeConnection(){
       if(isset($this->connection)) {
           $this->connection->close();
       } 
    }
    
    public function query($string){
        $this->openConnection();
        
        $query = $this->connection->query($string);
        
        if(!$query) {
            $this->error = $this->connection->error;
        }
        
        $this->closeConnection();
        
        return $query;
    }
}

