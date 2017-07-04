<?php
header("Access-Control-Allow-Origin : *");
  $request =$_GET['titre'];
 // set up the connection variables
        $db_name  = 'gestionconf';
        $hostname = 'localhost';
        $username = 'root';
        $password = '';

$id=$request['id'];
$statut=$request['statut'];

        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
        $sql = "SELECT statut FROM liste WHERE medecin='".$id."' AND ";
        $stmt = $dbh->prepare( $sql );
        $stmt->execute();
        $result = $stmt->fetchAll( PDO::FETCH_ASSOC );
		if($result==null){
			echo 0;
		}elseif($result==$statut){
			echo 1;
		}else{
			echo 2;
		}
		
		
		
        $json = json_encode( $result );
        echo $json;
?>
