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

	$titre=$request['titre'];
	
	$stamt = $dbh->prepare("SELECT * FROM conf WHERE titre='".$titre."'");
	$stamt->execute();
	$result = $stamt->fetchAll( PDO::FETCH_ASSOC );
	
	if(count($result)==0){
		// prepare sql and bind parameters
    $stmt = $dbh->prepare("INSERT INTO conf (titre,descriptif,debut,fin,horaire,ville,pays,organisateurs) 
    VALUES (:titre,:descriptif,:debut,:fin,:horaire,:ville,:pays,:organisateurs)");
	



	if(ISSET($request['description'])){
		$descriptif=$request['description'];
	}else{
		$descriptif='';
	}
	
	if(is_null($request['debut'])){
		$debut='';
	}else{
		$debut=$request['debut'];
	}
	
	if(ISSET($request['fin'])){
		$fin=$request['fin'];
	}else{
		$fin='';
	}

	if(ISSET($request['horaires'])){
		$horaire=$request['horaires'];
	}else{
		$horaire='';
	}
	
	if(ISSET($request['ville'])){
		$ville=$request['ville'];
	}else{
		$ville='';
	}
	if(ISSET($request['pays'])){
		$pays=$request['pays'];
	}else{
		$pays='';
	}
	
	if(ISSET($request['organisateurs'])){
		$organisateurs=$request['organisateurs'];
	}else{
		$organisateurs='';
	}

    $stmt->execute(array(':titre'=>$titre, ':descriptif'=>$descriptif, ':debut'=>$debut, ':fin'=>$fin, ':horaire'=>$horaire, ':ville'=>$ville,
	':pays'=>$pays, ':organisateurs'=>$organisateurs));
	

 $json = json_encode( $result );
echo "La conférence a été ajoutée avec succès.";
	}else{
		echo "Vous avez déjà ajouté cette conférence.";
	}
	
    
  }
catch(PDOException $e)
    {
    echo "Error: " . $e->getMessage();
    }
$conn = null;

?>