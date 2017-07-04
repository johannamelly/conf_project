<?php
header("Access-Control-Allow-Origin : *");
header("Access-Control-Allow-Methods : GET,POST,PUT,DELETE,OPTIONS");
header("Access-Control-Allow-Headers : Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

 $postdata = file_get_contents("php://input");

$request=json_decode($postdata,true);

 // set up the connection variables
        $db_name  = 'gestionconf';
        $hostname = 'localhost';
        $username = 'root';
        $password = '';

		$liste='[{"debut":"03.05.2016"},{"debut":"02.05.2014"},{"debut":"25.10.2007"},3]';

        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
		for($i=0;i<count($liste-1),$i++){
		$sql = "SELECT COUNT(medecin) AS nbMedecins FROM liste WHERE a='37'";
        $stmt = $dbh->prepare( $sql );
        $stmt->execute();
        $result = $stmt->fetchAll( PDO::FETCH_ASSOC );
		}
		
        
        $json = json_encode( $result );
		$combien=count($result);
		for($i=0;$i<$combien;$i++){
			$ok=$result[$i];
			$sq="SELECT debut FROM conf WHERE titre='".$ok['conference']."'";
			$stat=$dbh->prepare($sq);
			$stat->execute();
			$res = $stat->fetchAll( PDO::FETCH_ASSOC );
			array_push($listeConfAn,$res[0]);
		}
		array_push($listeConfAn,$combien);
		
		$json=json_encode($listeConfAn);
		
       echo $json;

?>