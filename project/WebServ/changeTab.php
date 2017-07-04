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
 $liste=$request['listeASuppr'];

 /*$liste='[{"cetId":"6"},{"cetId":"13"}] ';
 $liste=json_decode($liste,true);*/
 
 $longueur=count($liste);
 
 for($i=0;$i<$longueur;$i++){
	$indiv=$liste[$i];
	$dbIdNotif=$indiv['cetId'];
    $sql = ("UPDATE notifications SET statut='0'WHERE id='".$dbIdNotif."'");
	// Prepare statement
    $stmt = $dbh->prepare($sql);


    // execute the query
    $stmt->execute();
 }
 
 
 if($longueur!=0){
	 echo("Lignes modifiées avec succès!");
 }else{
	 echo("Vous n'avez coché aucune notification.");
 }

  }
catch(PDOException $e)
    {
    echo "Error: " . $e->getMessage();
    }
$conn = null;

?>