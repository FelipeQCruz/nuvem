<?php
	session_start();
	//echo $_SESSION["id"];

	//echo session_id();
	if(!(isset($_SESSION['id']))){
		http_response_code(403);
		exit("Usuario não logado");
	}
?>