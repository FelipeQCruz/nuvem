<?php
	include "db.php";
	include "session.php";
	
	$body = file_get_contents('php://input');
	$body = trim($body);
	$obj  = json_decode($body,true);
	
	if($obj["id"] = $_SESSION["id"])
	{
		$sql = "SELECT tipo FROM autenticacao WHERE id_usuario = ?;";
		$id_usuario = $obj['id'];
		$stmt = $pdo->prepare($sql);
		$stmt -> execute([$id_usuario]);	
		$data = $stmt->fetchAll();	
		
		if($data[0]['tipo'] == 'Inquilino')
		{
			$resultado['resultado'] = false;
			$aux = 0;
			$sql = "SELECT * FROM imovel WHERE id_imovel = ? AND disponivel = true;";
			$id_imovel = $obj['id_imovel'];
			$stmt = $pdo->prepare($sql);
			$stmt -> execute([$id_imovel]);	
			$result = $stmt->rowcount();
			if($result < 1){
				http_response_code(403);
			}
			$data = $stmt->fetchAll();

			$id_proprietario = $data[0]['id_responsavel'];
			$valor = $data[0]['preco'];

			$sql2 = "UPDATE imovel SET disponivel = false WHERE id_imovel = ?;";
			$stmt = $pdo->prepare($sql2);
			$stmt -> execute([$id_imovel]);

			$sql3 = "INSERT INTO contrato(id_proprietario, id_inquilino, id_imovel, valor) VALUES(?,?,?,?);";
			$stmt = $pdo->prepare($sql3);
			if(	$stmt -> execute([$id_proprietario,$_SESSION["id"],$id_imovel,$valor])	)
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