<?php
header("Access-Control-Allow-Origin : *");
header("Access-Control-Allow-Methods : GET,POST,PUT,DELETE,OPTIONS");
header("Access-Control-Allow-Headers : Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

 $postdata = file_get_contents("php://input");

$request=json_decode($postdata,true);

        $db_name  = 'gestionconf';
        $hostname = 'localhost';
        $username = 'root';
        $password = '';

try {
	
$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
$conference=$request['conference'];
$tab=array();
$categorie=array();
if(ISSET($request['invite'])){
		$invite=$request['invite'];
		array_push($tab, $invite);
		array_push($categorie, "invite");
	}

if(ISSET($request['repondu'])){
		$repondu=$request['repondu'];
		array_push($tab, $repondu);
		array_push($categorie, "repondu");
	}

$longueur=count($tab);

for($i=0;$i<$longueur;$i++){
	
$sql = "UPDATE liste SET $categorie[$i]='".$tab[$i]."'WHERE conference='".$conference."'";
// Prepare statement
    $stmt = $dbh->prepare($sql);


    // execute the query
    $stmt->execute();
}



$statut=$request['statut'];
$medecin=$request['medecin'];
	
$sq = "UPDATE liste SET statut='".$statut."'WHERE conference='".$conference."' AND medecin='".$medecin."'";
// Prepare statement
    $stamt = $dbh->prepare($sq);


    // execute the query
    $stamt->execute();



	$json = json_encode( $request );
//echo $json;

//echo $json;
    // echo a message to say the UPDATE succeeded
    echo "success";
    }
catch(PDOException $e)
    {
    echo "Error: " . $e->getMessage();
    }
$conn = null;

?>