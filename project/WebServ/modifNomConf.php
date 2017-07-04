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
$ancienTitre=$request['ancienTitre'];
$tab=array();
$categorie=array();

if(ISSET($request['titre'])){
		$titre=$request['titre'];
		array_push($tab, $titre);
		array_push($categorie, "titre");
	}

$title=$request['titre'];
$longueur=count($tab);


$sk="SELECT COUNT(*) AS combien FROM conf WHERE titre='".$title."'";

// Prepare statement
    $statmt = $dbh->prepare($sk);


    // execute the query
    $statmt->execute();
	$result = $statmt->fetchAll( PDO::FETCH_ASSOC );





if($result[0]['combien']==0){
	

for($i=0;$i<$longueur;$i++){
	
$sql = "UPDATE conf SET $categorie[$i]='".$tab[$i]."'WHERE id='".$id."'";
// Prepare statement
    $stmt = $dbh->prepare($sql);


    // execute the query
    $stmt->execute();
}

$sq="UPDATE liste SET conference='".$title."' WHERE conference='".$ancienTitre."'";

$stamt = $dbh->prepare($sq);
    $stamt->execute();


	$json = json_encode( $ancienTitre );
//echo $json;

//echo $json;
    // echo a message to say the UPDATE succeeded
    echo $title;
    
}else{
	$json = json_encode( $ancienTitre );
//echo $json;

//echo $json;
    // echo a message to say the UPDATE succeeded
    echo $ancienTitre;
}}
catch(PDOException $e)
    {
    echo "Error: " . $e->getMessage();
    }
$conn = null;

?>