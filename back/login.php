<?php
	include "db.php";
	
	$body = file_get_contents('php://input');
	$body = trim($body);
	$obj  = json_decode($body,true);
	
	
	$username = $obj['username'];
	$password = $obj['password'];

	$stmt = $pdo->prepare("SELECT id_usuario, nome, senha, tipo FROM autenticacao WHERE nome = ? AND senha = ?;");

	$stmt -> execute([$username, md5($password)]);
	$data = $stmt->fetchAll();
	//var_dump($data);
	$result['login'] = false;	
		
	if ($data)
	{
		session_start();
		$_SESSION['id'] = $data[0]['id_usuario'];
	//	echo $_SESSION['id'];
		//echo '<br>';
		http_response_code(200);
		$result['login'] = true;	
		$result['nome'] = $username;
		$result['tipo'] = $data[0]['tipo'];
		$result['id'] = $_SESSION['id'];	
	}
	else
	{
		http_response_code(403);
	}		
	echo json_encode($result);
?>
