<?php
	
	include("connetti.php");

	$info = $_POST['forniture'];

	$data = json_decode(stripslashes($info));

	$cavo = $data->cavo;
	$pod = $data->pod;
	$codice_cliente = $data->codice_cliente;
	$particella = $data->particella;
	$toponimo = $data->toponimo;
	$ncivico = $data->ncivico;
	$comune = $data->comune;
	$prov = $data->prov;
	$posizione = $data->posizione;
	$lettura = $data->lettura;
	$accensione = $data->accensione;
	$valore_tensione = $data->valore_tensione;
	$consegna = $data->consegna;
	$contatore_elettrico = $data->contatore_elettrico;
	$note = $data->note;
	$punti_luce = $data->punti_luce;
	$potenza = $data->potenza;
	
	//consulta sql
	$query = sprintf("INSERT INTO anagrafica3 
						(
						cavo, pod, codice_cliente, particella, toponimo, ncivico, 
						comune, prov, posizione, lettura, accensione, valore_tensione, 
						consegna, contatore_elettrico, note, punti_luce, potenza
						) 
						VALUES 
						(
						'%s', '%s','%s', '%s', '%s', '%s', 
						'%s', '%s', '%s', '%s', '%s', '%d', 
						'%s', '%s', '%s', '%d', '%d')",
						mysql_real_escape_string($cavo),
						mysql_real_escape_string($pod),
						mysql_real_escape_string($codice_cliente),
						mysql_real_escape_string($particella),
						mysql_real_escape_string($toponimo),
						mysql_real_escape_string($ncivico),
						mysql_real_escape_string($comune),
						mysql_real_escape_string($prov),
						mysql_real_escape_string($posizione),
						mysql_real_escape_string($lettura),
						mysql_real_escape_string($accensione),
						mysql_real_escape_string($valore_tensione),
						mysql_real_escape_string($consegna),
						mysql_real_escape_string($contatore_elettrico),
						mysql_real_escape_string($note),
						mysql_real_escape_string($punti_luce),
						mysql_real_escape_string($potenza));

	$rs = mysql_query($query);

	echo json_encode(array(
		"success" => mysql_errno() == 0,
		"forniture" => array(
			"id" => mysql_insert_id(),
			"cavo" => $cavo,
			"pod" => $pod,
			"codice_cliente" => $codice_cliente,
			"particella" => $particella,
			"toponimo" => $toponimo,
			"ncivico" => $ncivico,
			"comune" => $comune,
			"prov" => $prov ,
			"posizione" => $posizione,
			"lettura" => $lettura,
			"accensione" => $accensione,
			"valore_tensione" => $valore_tensione,
			"consegna" => $consegna,
			"contatore_elettrico" => $contatore_elettrico,
			"note" => $note,
			"punti_luce" => $punti_luce,
			"potenza" => $potenza
		)
	));
?>