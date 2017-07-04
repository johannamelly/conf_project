<?php
header("Access-Control-Allow-Origin : *");
  $request =$_GET['id'];
 // set up the connection variables
        $db_name  = 'gestionconf';
        $hostname = 'localhost';
        $username = 'root';
        $password = '';

//$lesMed=array();

        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
        $sql = "SELECT titre FROM conf WHERE id='".$request."'";
        $stmt = $dbh->prepare( $sql );
        $stmt->execute();
        $result = $stmt->fetchAll( PDO::FETCH_ASSOC );
		/*
		$req=new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
		$sk="SELECT medecin FROM liste WHERE titre='".$result."'";
		$stamt = $dbh->prepare( $sql );
        $stamt->execute();
        $listeId = $stamt->fetchAll( PDO::FETCH_ASSOC );
		
		$po=new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
		for($i=0;$i<count($listeId);$i++){
			$sq="SELECT * FROM medecins WHERE id='".$listeId[$i]."'";
			$st = $dbh->prepare( $sql );
        $st->execute();
        $leMed = $stamt->fetchAll( PDO::FETCH_ASSOC );
		array_push($lesMed,$leMed);
		}
		
		*/
        $json = json_encode( $result );
        echo $json;
?>
