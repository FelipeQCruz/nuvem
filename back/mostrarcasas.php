<?php
	include "db.php";
	
	$body = file_get_contents('php://input');
	$body = trim($body);
	$obj  = json_decode($body,true);
	
$aux = 0;
$sql = "SELECT * FROM imovel WHERE disponivel = true";
if($obj['bairro'] == NULL && $obj['tipo'] == NULL && $obj['n_quartos'] == NULL &&
 $obj['valor_min'] == NULL && $obj['valor_max'] == NULL && $obj['area'] == NULL)
{
	$sql = $sql . ";";
	
	$stmt = $pdo->prepare($sql);
	
	if(	$stmt -> execute()	)
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
	if($obj['bairro'] != NULL){
		$bairro = $obj['bairro'];
		$sql = $sql . " AND bairro = ?";
		$sql2[$aux] = $bairro;
		$aux++;
	}
	if($obj['tipo'] != NULL){
		$tipo = $obj['tipo'];
		$sql = $sql . " AND tipo = ?";
		$sql2[$aux] = $tipo;
		$aux++;
	}
	if($obj['n_quartos'] != NULL){
		$n_quartos = $obj['n_quartos'];
		$sql = $sql . " AND n_quartos >= ?";
		$sql2[$aux] = $n_quartos;
		$aux++;
	}
	if($obj['valor_min'] != NULL)
	{
		$valor_min = $obj['valor_min'];
		$sql = $sql . " AND preco >= ?";
		$sql2[$aux] = $valor_min;
		$aux++;
	}
	if($obj['valor_max'] != NULL)
	{
		$valor_max = $obj['valor_max'];
		$sql = $sql . " AND preco <= ?";
		$sql2[$aux] = $valor_max;
		$aux++;
	}
	if($obj['area'] != NULL){
		$area = $obj['area'];
		$sql = $sql . " AND area >= ?";
		$sql2[$aux] = $area;
		$aux++;
	}
	$sql = $sql . ";";

	$stmt = $pdo->prepare($sql);
	
	if(	$stmt -> execute($sql2)	)
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
	?>