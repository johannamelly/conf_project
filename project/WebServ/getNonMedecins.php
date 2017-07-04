<?php
header("Access-Control-Allow-Origin : *");
header("Access-Control-Allow-Methods : GET,POST,PUT,DELETE,OPTIONS");
header("Access-Control-Allow-Headers : Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$request =$_GET['id'];
 // set up the connection variables
        $db_name  = 'gestionconf';
        $hostname = 'localhost';
        $username = 'root';
        $password = '';
//$request='[{"id": "73"},{"id":"90"}]';


$tab=array();
$liste=json_decode($request,true);
$liste=$liste['liste'];

$longueur=count($liste);
for($i=0;$i<$longueur;$i++){
	$variable=$liste[$i];
	$donnee=$variable["id"];
	array_push($tab,$donnee);
}

$ids=implode(',', $tab);

        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
        $sql = "SELECT * FROM medecins WHERE id NOT IN ($ids)";
        $stmt = $dbh->prepare( $sql );
        $stmt->execute();
        $result = $stmt->fetchAll( PDO::FETCH_ASSOC );
		
		
		
        $json = json_encode( $result );
        echo $json;

?>