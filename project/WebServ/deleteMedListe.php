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


 $conference=$request['conference'];
 //$conference='twtw';
 $liste=$request['listeMed'];
 //$liste='[{"medecin":{"nom":"reger","prenom":"","statut":"Inconnu","id":"73"}},{"medecin":{"nom":"qwfwfew","prenom":"bbgbgg","statut":"Inconnu","id":"90"}}]';
 $longueur=count($liste);
 
 for($i=0;$i<$longueur;$i++){
	$indiv=$liste[$i];
	$med=$indiv['medecin'];
	$dbIdMed=$med['id'];
    $sql = ("DELETE FROM liste WHERE medecin='".$dbIdMed."' AND conference='".$conference."'");
	$dbh->exec($sql);
 }
 
 $json=json_encode($request);
 if($longueur!=0){
	 echo $json;
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