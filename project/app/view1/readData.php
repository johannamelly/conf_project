<?php
header('Content-Type: application/json');


	$con = mysqli_connect("EIFRWSE01058","root","","test");
	$res= mysqli_query($con,"SELECT * FROM tabletest");
	$result = array();
	while($row=mysqli_fetch_assoc($res)){
		$result[] = $row;
	}
	echo json_encode($result);
?>