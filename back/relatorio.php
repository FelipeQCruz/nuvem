<?php
	include "db.php";
	
	$body = file_get_contents('php://input');
	$body = trim($body);
	$obj  = json_decode($body,true);

$aux = 0;
$sql = "SELECT tipo FROM autenticacao WHERE id_usuario = ?;";
$stmt = $pdo->prepare($sql);
$stmt -> execute([$obj['id_user']]);
$data = $stmt->fetchAll();
$tipo = $data[0]['tipo'];
if($tipo == 'Senhorio')
{
	$sql = "SELECT reclamacao.reclamacao FROM reclamacao INNER JOIN contrato ON contrato.id_contrato=reclamacao.id_contrato AND contrato.id_proprietario = ?;";
	
	$stmt = $pdo->prepare($sql);
	$stmt -> execute([$obj['id_user']]);
	$result = $stmt->rowcount();
	if($result > 0)	
	{
		//$sql = "SELECT * FROM imovel WHERE id_responsavel = ?;";
		$sql = "SELECT imovel.*, reclamacao.reclamacao FROM reclamacao INNER JOIN contrato ON contrato.id_contrato=reclamacao.id_contrato AND contrato.id_proprietario = ? INNER JOIN imovel ON contrato.id_imovel=imovel.id_imovel;";
		
		$stmt = $pdo->prepare($sql);
		
		if(	$stmt -> execute([$obj['id_user']])	)
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
	}
	else
	{
		$sql = "SELECT * FROM imovel WHERE id_responsavel = ?;";
		$stmt = $pdo->prepare($sql);
		
		if(	$stmt -> execute([$obj['id_user']])	)
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
	}
}
else
{	
	$sql = "SELECT reclamacao.reclamacao FROM reclamacao INNER JOIN contrato ON contrato.id_contrato=reclamacao.id_contrato AND contrato.id_inquilino = ?;";
	$stmt = $pdo->prepare($sql);
	$stmt -> execute([$obj['id_user']]);
	$result = $stmt->rowcount();
	if($result > 0)	
	{
		$sql = "SELECT id_imovel FROM contrato WHERE id_inquilino = ?;";
		$stmt = $pdo->prepare($sql);
		$stmt -> execute([$obj['id_user']]);
		$data = $stmt->fetchAll();
		$sql = "SELECT imovel.*, reclamacao.reclamacao FROM reclamacao RIGHT JOIN contrato ON contrato.id_contrato=reclamacao.id_contrato AND contrato.id_imovel = ? INNER JOIN imovel ON contrato.id_imovel=imovel.id_imovel;";
		//$sql = "SELECT * FROM imovel WHERE id_imovel = ?;";
		$stmt = $pdo->prepare($sql);
		$stmt -> execute([$data[0]['id_imovel']]);
		$data = $stmt->fetchAll();			
		http_response_code(200);	
		echo json_encode($data);
	}
	else
	{
		$sql = "SELECT id_imovel FROM contrato WHERE id_inquilino = ?;";
		$stmt = $pdo->prepare($sql);
		$stmt -> execute([$obj['id_user']]);
		$data = $stmt->fetchAll();
		//$sql = "SELECT imovel.*, reclamacao.reclamacao FROM reclamacao RIGHT JOIN contrato ON contrato.id_contrato=reclamacao.id_contrato AND contrato.id_imovel = ? INNER JOIN imovel ON contrato.id_imovel=imovel.id_imovel;";
		$sql = "SELECT * FROM imovel WHERE id_imovel = ?;";
		$stmt = $pdo->prepare($sql);
		$stmt -> execute([$data[0]['id_imovel']]);
		$data = $stmt->fetchAll();			
		http_response_code(200);	
		echo json_encode($data);		
	}
}
	?>