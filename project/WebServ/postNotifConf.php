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
$tab=$request['notif'];

if(ISSET($tab['titre'])){
	$conference=$tab['titre'];
	}else{
		$conference='';
	}

if(ISSET($tab[0]['nom'])){
	$nom=$tab[0]['nom'];
	}else{
		$nom='';
	}
	
if(ISSET($tab[0]['prenom'])){
	$prenom=$tab[0]['prenom'];
	}else{
		$prenom='';
	}
	
	if(ISSET($request['date'])){
	$date=$request['date'];
	}else{
		$date='';
	}
	
	$nomNotif="conf";
	$statut='1';
	
	
$stmt = $dbh->prepare("SELECT COUNT(nomNotif) AS combien FROM notifications WHERE nomNotif='".$nomNotif."'
 AND conference='".$conference."'");
$stmt->execute();
$result = $stmt->fetchAll( PDO::FETCH_ASSOC );

$tableau=array();


if($result[0]['combien']==0){
	// prepare sql and bind parameters
    $stamt = $dbh->prepare("INSERT INTO notifications (date, nomNotif, nom, prenom, conference, statut) 
	VALUES (:date, :nomNotif,:nom, :prenom, :conference,:statut)");
	


    $stamt->execute(array('date'=>$date, ':nomNotif'=>$nomNotif, ':nom'=>$nom, ':prenom'=>$prenom,
	':conference'=>$conference,	'statut'=>$statut));
	$resultat = $stmt->fetchAll( PDO::FETCH_ASSOC );

$result[0]['combien']=0;
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