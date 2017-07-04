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
	$dbIdMed=$indiv['idMed'];
    $sql = ("DELETE FROM medecins WHERE id=$dbIdMed");
	$dbh->exec($sql);
 }
 
 
 for($j=0;$j<$longueur;$j++){
	$seul=$liste[$j];
	$dbIdMed=$seul['idMed'];
    $sq = ("DELETE FROM liste WHERE medecin=$dbIdMed");
	$dbh->exec($sq);
 }
 
 if($longueur!=0){
	 echo("Lignes supprimées avec succès!");
 }else{
	 echo("Vous n'avez coché aucun médecin.");
 }

  }
catch(PDOException $e)
    {
    echo "Error: " . $e->getMessage();
    }
$conn = null;

?>