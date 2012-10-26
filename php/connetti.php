<?php
 
$host = "localhost";
 
//$user = "commessa";
$user = "root";
 
//$psw = "";
$psw = "zinedine21";

//$db = "my_commessa";
$db = "pod";

//effettua una connessione al DBMS. in caso contrario mostra l'errore occorso 
$connessione = mysql_connect($host,$user,$psw) or die (mysql_error());

//seleziona lo specifico database per la connessione
$database = mysql_select_db($db, $connessione) or die(mysql_error());
 
?>