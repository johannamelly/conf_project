<?php
header("Access-Control-Allow-Origin : *");
  $request =$_GET['id'];
 // set up the connection variables
        $db_name  = 'gestionconf';
        $hostname = 'localhost';
        $username = 'root';
        $password = '';



        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
        $sql = "SELECT * FROM conf WHERE id='".$request."'";
        $stmt = $dbh->prepare( $sql );
        $stmt->execute();
        $result = $stmt->fetchAll( PDO::FETCH_ASSOC );
		if($result!=null){
			$ret=1;
		}else{
			$ret=0;
		}
		
		
		
        $json = json_encode( $result );
        echo $ret;
?>
