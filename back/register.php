<?php
include "db.php";
	
	$body = file_get_contents('php://input');
	$body = trim($body);
	$obj  = json_decode($body,true);

$username = $obj['username'];
$password = $obj['password'];
$email = $obj['email'];
$tipo = $obj['tipo'];

	$stmt = $pdo->prepare("SELECT * FROM autenticacao WHERE nome = ? OR email = ?;");

	$stmt -> execute([$username, $email]);
	
	$data = $stmt->fetchAll();
	
	$result['signup'] = false;	
	
	if($data)
	{
		http_response_code(403);
		exit("Usuario ou email ja cadastrado");
	}
	else
	{
		$stmt = $pdo->prepare("INSERT INTO autenticacao(nome, email, senha, tipo) VALUES (?, ?, ?, ?);");

		$stmt -> execute([$username, $email, md5($password), $tipo]);
		
		http_response_code(201);
		
		$result['signup'] = true;		
	}
	echo json_encode($result);
	//$result = $stmt->rowcount();
?>

