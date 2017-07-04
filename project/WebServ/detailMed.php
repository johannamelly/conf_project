<?php
header("Access-Control-Allow-Origin : *");
$data = file_get_contents("php://input");
  $request =$_GET['id'];
 // set up the connection variables
        $db_name  = 'gestionconf';
        $hostname = 'localhost';
        $username = 'root';
        $password = '';


        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
        $sql = "SELECT * FROM medecins WHERE id='".$request."'";
        $stmt = $dbh->prepare( $sql );
        $stmt->execute();
        $result = $stmt->fetchAll( PDO::FETCH_ASSOC );

        $json = json_encode( $result );
        echo $json;
?>