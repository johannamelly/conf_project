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
$prenom=$request['prenom'];
	$nom=$request['nom'];
$stamt = $dbh->prepare("SELECT * FROM medecins WHERE nom='".$nom."' AND prenom='".$prenom."'");
$stamt->execute();
$result = $stamt->fetchAll( PDO::FETCH_ASSOC );
if(count($result)==0){
	// prepare sql and bind parameters
    $stmt = $dbh->prepare("INSERT INTO medecins (nom,prenom,specialisation,naissance,sexe,lieu,mail,numero,responsable,nomresp,preresp,mailresp) 
    VALUES (:nom,:prenom,:specialisation,:naissance,:sexe,:lieu,:mail,:numero,:responsable,:nomresp,:preresp,:mailresp)");
	

	

	if(ISSET($request['specialisation'])){
		$specialisation=$request['specialisation'];
	}else{
		$specialisation='';
	}
	
	if(is_null($request['naissance'])){
		$naissance='';
	}else{
		$naissance=$request['naissance'];
	}
	
	if(ISSET($request['sexe'])){
		$sexe=$request['sexe'];
	}else{
		$sexe='';
	}

	if(ISSET($request['lieu'])){
		$lieu=$request['lieu'];
	}else{
		$lieu='';
	}
	if(ISSET($request['mail'])){
		$mail=$request['mail'];
	}else{
		$mail='';
	}
	if(ISSET($request['numero'])){
		$numero=$request['numero'];
	}else{
		$numero='';
	}
	
	if(ISSET($request['responsable'])){
		if($request['responsable']=="Oui"){
			$responsable=1;
		}else{
			$responsable=0;
		}
	}else{
		$responsable=0;
	}

	if(ISSET($request['nomresp'])){
		$nomresp=$request['nomresp'];
	}else{
		$nomresp='';
	}
	if(ISSET($request['preresp'])){
		$preresp=$request['preresp'];
	}else{
		$preresp='';
	}
	if(ISSET($request['mailresp'])){
		$mailresp=$request['mailresp'];
	}else{
		$mailresp='';
	}


    $stmt->execute(array(':nom'=>$nom, ':prenom'=>$prenom, ':specialisation'=>$specialisation, ':naissance'=>$naissance, ':sexe'=>$sexe, ':lieu'=>$lieu,
	':mail'=>$mail, ':numero'=>$numero, ':responsable'=>$responsable, ':nomresp'=>$nomresp, ':preresp'=>$preresp, ':mailresp'=>$mailresp));
	

 $json = json_encode( $request );
echo "Le médecin a été ajouté avec succès!";
}else{
	echo "Désolé, ce médecin existe déjà.";
}

  }
catch(PDOException $e)
    {
    echo "Error: " . $e->getMessage();
    }
$conn = null;

?>