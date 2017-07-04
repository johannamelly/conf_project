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
if(ISSET($request['lieu'])){
		$lieu=$request['lieu'];
		array_push($tab, $lieu);
		array_push($categorie, "lieu");
	}

if(ISSET($request['specialisation'])){
		$specialisation=$request['specialisation'];
		array_push($tab, $specialisation);
		array_push($categorie, "specialisation");
	}
	
if(ISSET($request['naissance'])){
		$naissance=$request['naissance'];
		array_push($tab, $naissance);
		array_push($categorie, "naissance");
	}

if(ISSET($request['sexe'])){
		$sexe=$request['sexe'];
		array_push($tab, $sexe);
		array_push($categorie, "sexe");
	}
	
if(ISSET($request['mail'])){
		$mail=$request['mail'];
		array_push($tab, $mail);
		array_push($categorie, "mail");
	}	
	
	
	if(ISSET($request['numero'])){
		$numero=$request['numero'];
		array_push($tab, $numero);
		array_push($categorie, "numero");
	}
	
	
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