<?php
	include "db.php";
	
	$body = file_get_contents('php://input');
	$body = trim($body);
	$obj  = json_decode($body,true);
	
$aux = 0;
$sql = "SELECT * FROM imovel WHERE id_imovel = ?;";

$id_imovel = $obj['id_imovel'];

$stmt = $pdo->prepare($sql);
	
	if(	$stmt -> execute([$id_imovel])	)
	{	
		$result = $stmt->rowcount();
		if($result = 0)		
		{
			http_response_code(204);
		}
		else
		{
			http_response_code(200);
			$data = $stmt->fetchAll();					
			echo json_encode($data);
		}
	}
	else
	{
		http_response_code(403);
	}
	?>