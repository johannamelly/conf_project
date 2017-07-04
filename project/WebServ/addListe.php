<?php
header("Access-Control-Allow-Origin : *");
header("Access-Control-Allow-Methods : GET,POST,PUT,DELETE,OPTIONS");
header("Access-Control-Allow-Headers : Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

 $postdata = file_get_contents("php://input");
//$postdata='{"arrayMed":[{"idMed":"39","nomMed":"uuuu","prenomMed":"zzzz","statutInv":"Oui","invitation":"10.05.2016","reponse":"11.05.2016"}],"conference":"conf2"} ';
$request=json_decode($postdata,true);


        $db_name  = 'gestionconf';
        $hostname = 'localhost';
        $username = 'root';
        $password = '';

try {
$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    // prepare sql and bind parameters
    $stmt = $dbh->prepare("INSERT INTO liste (conference,medecin,statut,invite, repondu)VALUES (:conference,:medecin,:statut, :invite, :repondu)");

	
 $liste=$request['arrayMed'];
 $longueur=count($liste);
 
 for($i=0;$i<$longueur;$i++){
	$indiv=$liste[$i];
	$statut=$indiv['statutInv'];
	$medecin=$indiv['idMed'];
	$conference=$request['conference'];
	$invite=$indiv['invitation'];
	$repondu=$indiv['reponse'];
	$stmt->execute(array(':conference'=>$conference, ':medecin'=>$medecin, ':statut'=>$statut, ':invite'=>$invite, ':repondu'=>$repondu));
 }
	
 $json = json_encode( $request );
echo $json;
  }
catch(PDOException $e)
    {
    echo "Error: " . $e->getMessage();
    }
$conn = null;

?>