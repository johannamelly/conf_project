<?php
header("Access-Control-Allow-Origin : *");
header("Access-Control-Allow-Methods : GET,POST,PUT,DELETE,OPTIONS");
header("Access-Control-Allow-Headers : Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

 $postdata = file_get_contents("php://input");
 //$postdata='{"listToDel":[{"idMed":"30"},{"idMed":"31"}]}';
$request=json_decode($postdata,true);


        $db_name  = 'gestionconf';
        $hostname = 'localhost';
        $username = 'root';
        $password = '';

try {
$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);


 $json = json_encode( $request );
 $liste=$request['listToDel'];
 $longueur=count($liste);
 
 
 
 for($i=0;$i<$longueur;$i++){
	$indiv=$liste[$i];
	$dbIdConf=$indiv['idConf'];
	$dbTitreConf=$indiv['titre'];
    $sql = ("DELETE FROM conf WHERE id='".$dbIdConf."'");
	$dbh->exec($sql);
	
	$sq=("DELETE FROM liste WHERE conference='".$dbTitreConf."'");
	$dbh->exec($sq);
	
 }
 
 if($longueur!=0){
	 echo("Lignes supprimées avec succès!");
 }else{
	 echo("Vous n'avez coché aucune conférence.");
 }

  }
catch(PDOException $e)
    {
    echo "Error: " . $e->getMessage();
    }
$conn = null;

?>