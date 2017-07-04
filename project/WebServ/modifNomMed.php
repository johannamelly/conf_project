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

$id=$request['id'];
$tab=array();
$categorie=array();

if(ISSET($request['prenom'])){
		$prenom=$request['prenom'];
		array_push($tab, $prenom);
		array_push($categorie, "prenom");
	}

	if(ISSET($request['nom'])){
		$nom=$request['nom'];
		array_push($tab, $nom);
		array_push($categorie, "nom");
	}

	
$longueur=count($tab);

for($i=0;$i<$longueur;$i++){
	
$sql = "UPDATE medecins SET $categorie[$i]='".$tab[$i]."'WHERE id='".$id."'";
// Prepare statement
    $stmt = $dbh->prepare($sql);


    // execute the query
    $stmt->execute();
}


    


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