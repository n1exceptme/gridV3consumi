<?php

include("connetti.php");

// collect request parameters
$start  = isset($_REQUEST['start'])  ? $_REQUEST['start']  :  0;
$count  = isset($_REQUEST['limit'])  ? $_REQUEST['limit']  : 50;
$sort   = isset($_REQUEST['sort'])   ? json_decode($_REQUEST['sort'])   : null;
$filters = isset($_REQUEST['filter']) ? $_REQUEST['filter'] : null;

$sortProperty = $sort[0]->property; 
$sortDirection = $sort[0]->direction;

$filters = json_decode($filters);

$where = ' 0 = 0 ';
$qs = '';

// loop through filters sent by client
if (is_array($filters)) {
    for ($i=0;$i<count($filters);$i++){
        $filter = $filters[$i];

		$field = $filter->field;
		$value = $filter->value;
		$compare = isset($filter->comparison) ? $filter->comparison : null;
		$filterType = $filter->type;		

        switch($filterType){
            case 'string' : 
				$qs .= " AND ".$field." LIKE '%".$value."%'"; 
			break;

            case 'list' :
                if (strstr($value,',')){
                    $fi = explode(',',$value);
                    for ($q=0;$q<count($fi);$q++){
                        $fi[$q] = "'".$fi[$q]."'";
                    }
                    $value = implode(',',$fi);
                    $qs .= " AND ".$field." IN (".$value.")";
                } else {
                    $qs .= " AND ".$field." = '".$value."'";
                }
            break;		
			
            case 'boolean' : 
				$qs .= " AND ".$field." = ".($value); 
			break;
			
            case 'numeric' :
                switch ($compare) {
                    case 'eq' : $qs .= " AND ".$field." = ".$value; Break;
                    case 'lt' : $qs .= " AND ".$field." < ".$value; Break;
                    case 'gt' : $qs .= " AND ".$field." > ".$value; Break;
                }
            break;
			
            case 'date' :
                switch ($compare) {
                    case 'eq' : $qs .= " AND ".$field." = '".date('Y-m-d',strtotime($value))."'"; Break;
                    case 'lt' : $qs .= " AND ".$field." < '".date('Y-m-d',strtotime($value))."'"; Break;
                    case 'gt' : $qs .= " AND ".$field." > '".date('Y-m-d',strtotime($value))."'"; Break;
                }
            break;
        }
    }
    $where .= $qs;
}

	$queryString = "SELECT * FROM consumi6 WHERE ".$where;
	$queryString .= " ORDER BY ".$sortProperty." ".$sortDirection;
	$queryString .= " LIMIT 1000"/*.$start.",".$count*/;

	//print_r($queryString);
	
	//esegui la query sql
	$query = mysql_query($queryString) or die(mysql_error());
	$consumi = array();
	
	//il ciclo crea un array contenente i record estratti dal db
	$consumi = array();
	while($consumo = mysql_fetch_assoc($query)) {
	    $consumi[] = $consumo;
	}

	//rileva il "numero" di record contenuti nel db
	$queryTotal = mysql_query('SELECT COUNT(id) as num FROM consumi6') or die(mysql_error());
	$row = mysql_fetch_assoc($queryTotal);
	$total = $row['num'];
	
	echo json_encode(Array(
		"success" => mysql_errno() == 0,
		"total"=>$total,
		"consumi" => $consumi
	));
	
	$info = "-----------" . date('Y-m-d H:i:s', time()) . "-----------" .
	"\n queryString : " . $queryString .
	"\n total : " . $total . 
	"\n start : " . $start . 
	"\n count : " . $count . 
	"\n sortProperty : " . $sortProperty . 
	"\n sortDirection : " . $sortDirection . 
	"\n where : " . $where . 
	"\n qs : " . $qs . 	
	"\n\n";

	$log = fopen ('LOG.log', 'a') or die("can't open file");
	fwrite($log, $info );
	fclose($log);	

?>