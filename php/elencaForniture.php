<?php
	//include la configurazione per la connessione al DBMS
	include("connetti.php");

	$start = $_REQUEST['start'];
	$limit = $_REQUEST['limit'];
	
	$task = '';

  	if(isset($_REQUEST['task'])) {
		$task = $_REQUEST['task'];
	}	
	
    if (isset($_GET['sort'])) {
		$sorters = ($_GET['sort']);
		$sorters = (json_decode($sorters));

		foreach ($sorters as $sort) {
				$sortField = $sort->property;
				$sortOrder = $sort->direction;
		};
	}
	
	if (isset($_GET['filter'])) {
		$filter = ($_GET['filter']);
		$filtro = (json_decode($filter));

	foreach ($filtro as $f)
	{
		$filterField = $f->property;
		print_r($filterField);
		$filterValue = $f->value;
		print_r($filterValue);
	};
	}	
	
	
	
	switch($task) {
		case "LISTING":
			$queryString = "SELECT * FROM anagrafica3 
						ORDER BY $sortField $sortOrder 
						LIMIT $start,  $limit";
							
		break;
		
		case "SEARCH":
			$queryString = "SELECT * FROM anagrafica3 WHERE $filterField LIKE '%".$filterValue."%'".
							" ORDER BY $sortField $sortOrder LIMIT $start, $limit";
		break;
		
		default:
			$queryString = "SELECT * FROM anagrafica3 LIMIT $start,  $limit";
		break;
	}

	//esegui la query sql
	$query = mysql_query($queryString) or die(mysql_error());

	//il ciclo crea un array contenente i record estratti dal db
	$forniture = array();
	while($fornitura = mysql_fetch_assoc($query)) {
	    $forniture[] = $fornitura;
	}

	//rileva il "numero" di record contenuti nel db
	$queryTotal = mysql_query('SELECT count(*) as num FROM anagrafica3') or die(mysql_error());
	$row = mysql_fetch_assoc($queryTotal);
	$total = $row['num'];

	//codifica i dati in formato JSON
	echo json_encode(array(
		"success" => mysql_errno() == 0,
		"total" => $total,
		"forniture" => $forniture
	));
?>