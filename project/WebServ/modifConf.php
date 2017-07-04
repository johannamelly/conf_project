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
if(ISSET($request['debut'])){
		$debut=$request['debut'];
		array_push($tab, $debut);
		array_push($categorie, "debut");
	}

if(ISSET($request['fin'])){
		$fin=$request['fin'];
		array_push($tab, $fin);
		array_push($categorie, "fin");
	}
	
if(ISSET($request['horaire'])){
		$horaire=$request['horaire'];
		array_push($tab, $horaire);
		array_push($categorie, "horaire");
	}

if(ISSET($request['ville'])){
		$ville=$request['ville'];
		array_push($tab, $ville);
		array_push($categorie, "ville");
	}

if(ISSET($request['pays'])){
		$pays=$request['pays'];
		array_push($tab, $pays);
		array_push($categorie, "pays");
	}	
	
	
	if(ISSET($request['organisateurs'])){
		$organisateurs=$request['organisateurs'];
		array_push($tab, $organisateurs);
		array_push($categorie, "organisateurs");
	}
/*		
	
	if(ISSET($request['nomresp'])){
		$nomresp=$request['nomresp'];
		array_push($tab, $nomresp, '1');
		array_push($categorie, "nomresp", "responsable");
	}
	
	if(ISSET($request['preresp'])){
		$preresp=$request['preresp'];
		array_push($tab, $preresp);
		array_push($categorie, "preresp");
	}
	
	
	if(ISSET($request['mailresp'])){
		$mailresp=$request['mailresp'];
		array_push($tab, $mailresp);
		array_push($categorie, "mailresp");
	}
	*/
$longueur=count($tab);

for($i=0;$i<$longueur;$i++){
	
$sql = "UPDATE conf SET $categorie[$i]='".$tab[$i]."'WHERE id='".$id."'";
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