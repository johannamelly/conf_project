<?php
header("Access-Control-Allow-Origin : *");

 // set up the connection variables
        $db_name  = 'test';
        $hostname = 'localhost';
        $username = 'root';
        $password = '';



        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
        $sql = 'SELECT * FROM tabletest';
        $stmt = $dbh->prepare( $sql );
        $stmt->execute();
        $result = $stmt->fetchAll( PDO::FETCH_ASSOC );
        $json = json_encode( $result );
        echo $json;

?>