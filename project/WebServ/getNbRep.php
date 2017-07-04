<?php
header("Access-Control-Allow-Origin : *");
$request =$_GET['titre'];
 // set up the connection variables
        $db_name  = 'gestionconf';
        $hostname = 'localhost';
        $username = 'root';
        $password = '';



        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
        $sql = "SELECT  COUNT(statut) as oui FROM liste WHERE conference='".$request."' AND statut='Oui'";
        $sq = "SELECT  COUNT(statut) as non FROM liste WHERE conference='".$request."' AND statut='Non'";
        $sc = "SELECT  COUNT(statut) as inconnu FROM liste WHERE conference='".$request."' AND statut='Inconnu'";
        $stmt = $dbh->prepare( $sql );
        $statmt = $dbh->prepare( $sq );
        $stmts = $dbh->prepare( $sc );
        $stmt->execute();
        $statmt->execute();
        $stmts->execute();
        $result = $stmt->fetchAll( PDO::FETCH_ASSOC );
        $results = $statmt->fetchAll( PDO::FETCH_ASSOC );
        $res = $stmts->fetchAll( PDO::FETCH_ASSOC );
		$tab=array()
	;
	array_push($tab,$result,$results,$res);
        $json = json_encode( $tab );
        echo $json;

?>