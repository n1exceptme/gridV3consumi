<?php

include("connetti.php");

// collect request parameters
$start  = isset($_GET['start'])  ? $_GET['start']  :  0;
$count  = isset($_GET['limit'])  ? $_GET['limit']  : 50;
$sort   = isset($_GET['sort'])   ? json_decode($_GET['sort'])   : null;
$filters = isset($_GET['filter']) ? $_GET['filter'] : null;

$sortProperty = $sort[0]->property; 
$sortDirection = $sort[0]->direction;




//GridFilters sends filters as an Array if not json encoded
if (is_array($filters)) {
    $encoded = false;
} else {
    $encoded = true;
    $filters = json_decode($filters);
}
$filters = json_decode($filters);

$where = ' 0 = 0 ';
$qs = '';

// loop through filters sent by client
if (is_array($filters)) {
    for ($i=0;$i<count($filters);$i++){
        $filter = $filters[$i];

        // assign filter data (location depends if encoded or not)
         if ($encoded) {
            $field = $filter->field;
            $value = $filter->value;
            $compare = isset($filter->comparison) ? $filter->comparison : null;
            $filterType = $filter->type;
        } else {
            $field = $filter['field'];
            $value = $filter['data']['value'];
            $compare = isset($filter['data']['comparison']) ? $filter['data']['comparison'] : null;
            $filterType = $filter['data']['type'];
        } 
		$field = $filter->field;
		$value = $filter->value;
		$compare = isset($filter->comparison) ? $filter->comparison : null;
		$filterType = $filter->type;		

        switch($filterType){
            case 'string' : $qs .= " AND ".$field." LIKE '%".$value."%'"; Break;
            case 'list' :
                if (strstr($value,',')){
                    $fi = explode(',',$value);
                    for ($q=0;$q<count($fi);$q++){
                        $fi[$q] = "'".$fi[$q]."'";
                    }
                    $value = implode(',',$fi);
                    $qs .= " AND ".$field." IN (".$value.")";
                }else{
                    $qs .= " AND ".$field." = '".$value."'";
                }
            Break;
            case 'boolean' : $qs .= " AND ".$field." = ".($value); Break;
            case 'numeric' :
                switch ($compare) {
                    case 'eq' : $qs .= " AND ".$field." = ".$value; Break;
                    case 'lt' : $qs .= " AND ".$field." < ".$value; Break;
                    case 'gt' : $qs .= " AND ".$field." > ".$value; Break;
                }
            Break;
            case 'date' :
                switch ($compare) {
                    case 'eq' : $qs .= " AND ".$field." = '".date('Y-m-d',strtotime($value))."'"; Break;
                    case 'lt' : $qs .= " AND ".$field." < '".date('Y-m-d',strtotime($value))."'"; Break;
                    case 'gt' : $qs .= " AND ".$field." > '".date('Y-m-d',strtotime($value))."'"; Break;
                }
            Break;
        }
    }
    $where .= $qs;
}

	$queryString = "SELECT * FROM consumi6 \nWHERE ".$where;
	$queryString .= " \nORDER BY ".$sortProperty." ".$sortDirection;
	$queryString .= " \nLIMIT ".$start.",".$count;

	//print_r($queryString);
	
	//esegui la query sql
	$query = mysql_query($queryString) or die(mysql_error());
	
	//il ciclo crea un array contenente i record estratti dal db
	$consumi = array();
	while($consumo = mysql_fetch_assoc($query)) {
	    $consumi[] = $consumo;
	}

	//rileva il "numero" di record contenuti nel db
	$queryTotal = mysql_query('SELECT COUNT(*) as num FROM consumi6') or die(mysql_error());
	$row = mysql_fetch_assoc($queryTotal);
	$total = $row['num'];
	
	echo json_encode(Array(
		"total"=>$total,
		"consumi" => $consumi
	));
?>