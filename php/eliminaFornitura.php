<?php
	//chama o arquivo de conexão com o bd
	include("connetti.php");

	$info = $_POST['forniture'];

	$data = json_decode(stripslashes($info));

	$id = $data->id;

	//consulta sql
	$query = sprintf("DELETE FROM anagrafica3 WHERE id=%d",
		mysql_real_escape_string($id));

	$rs = mysql_query($query);

	echo json_encode(array(
		"success" => mysql_errno() == 0
	));
?>