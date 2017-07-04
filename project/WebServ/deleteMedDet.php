<?php
header("Access-Control-Allow-Origin : *");
header("Access-Control-Allow-Methods : GET,POST,PUT,DELETE,OPTIONS");
header("Access-Control-Allow-Headers : Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

 $postdata = file_get_contents("php://input");
 //$postdata='{"listToDel":[{"idMed":"30"},{"idMed":"31"}]}';
$request=json_decode($postdata,true);


        $db_name  = 'gestionconf';
        $hostname = 'localhost';
        $username = 'root';
        $password = '';

try {
$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

$dbIdMed=$request['id'];
 $json = json_encode($request);

    $sql = ("DELETE FROM medecins WHERE id='".$dbIdMed."'");
	$dbh->exec($sql);
 

    $sq = ("DELETE FROM liste WHERE medecin='".$dbIdMed."'");
	$dbh->exec($sq);
	echo $json;
 }catch(PDOException $e)
    {
    echo "Error: " . $e->getMessage();
    }
$conn = null;

?>