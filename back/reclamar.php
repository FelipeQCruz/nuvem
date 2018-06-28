<?php
	include "db.php";
	include "session.php";
	
	$body = file_get_contents('php://input');
	$body = trim($body);
	$obj  = json_decode($body,true);
	
	if($obj["id"] = $_SESSION["id"])
	{
		$resultado['resultado'] = false;
		$aux = 0;
		$sql = "SELECT * FROM contrato WHERE id_imovel = ? AND id_inquilino = ?;";
		$id_imovel = $obj['id_imovel'];
		$id_inquilino = $obj['id_user'];
		$reclamacao = $obj['reclamacao'];
		$stmt = $pdo->prepare($sql);
		$stmt -> execute([$id_imovel,$id_inquilino]);	
		$data = $stmt->fetchAll();		
		$id_contrato = $data[0]['id_contrato'];			
		$result = $stmt->rowcount();
		if($result < 1){
			http_response_code(403);
		}
		else
		{
			$sql2 = "INSERT INTO reclamacao(id_contrato,reclamacao) VALUES(?,?);";
			$stmt = $pdo->prepare($sql2);
			if(	$stmt -> execute([$id_contrato,$reclamacao])	)
			{	
				http_response_code(200);
				$resultado['resultado'] = true;
			}
			else
			{
				http_response_code(403);
			}
			echo json_encode($resultado);
		}
	}
	else
	{
		http_response_code(403);
	}
	?>