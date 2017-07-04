<?php
header("Access-Control-Allow-Origin : *");
header("Access-Control-Allow-Methods : GET,POST,PUT,DELETE,OPTIONS");
header("Access-Control-Allow-Headers : Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$request=$_GET['id'];
 // set up the connection variables
        $db_name  = 'gestionconf';
        $hostname = 'localhost';
        $username = 'root';
        $password = '';

		$listeConfAn=array();

        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
        $sql = "SELECT conference FROM liste WHERE medecin='".$request."' AND statut='Oui'";
        $stmt = $dbh->prepare( $sql );
        $stmt->execute();
        $result = $stmt->fetchAll( PDO::FETCH_ASSOC );
        $json = json_encode( $result );
		$combien=count($result);
		for($i=0;$i<$combien;$i++){
			$ok=$result[$i];
			$title=$ok['conference'];
			$sq="SELECT debut FROM conf WHERE titre='".$title."'";
			$stat=$dbh->prepare($sq);
			$stat->execute();
			$res = $stat->fetchAll( PDO::FETCH_ASSOC );
			array_push($listeConfAn,$res);
		}
		
		$json=json_encode($listeConfAn);
		
       echo $json;

?>