<?php
header("Access-Control-Allow-Origin : *");
  $request =$_GET['listeMed'];
 // set up the connection variables
        $db_name  = 'gestionconf';
        $hostname = 'localhost';
        $username = 'root';
        $password = '';

		
		//$request='{"arrayList":[{"medecin":"39","statut":"Oui"},{"medecin":"43","statut":"Inconnu"},{"medecin":"51","statut":"Oui"},{"medecin":"45","statut":"Oui"}]}';
		//$lesMed=array();
		$tab=array();
        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
        
        $request=json_decode($request,true);
		$liste=$request['medListe'];
		$longueur=count($liste);
		
		for($i=0;$i<$longueur;$i++){
		
			$indiv=$liste[$i];
			$medecin=$indiv['medecin'];
			$sql = "SELECT nom,prenom FROM medecins WHERE id='".$medecin."'";
			$stmt = $dbh->prepare( $sql );
			$stmt->execute();
			$result = $stmt->fetchAll( PDO::FETCH_ASSOC );
			$test=reset($result);
			array_push($tab,$test);
 }
 
		$json = json_encode( $tab );
        echo $json;
?>