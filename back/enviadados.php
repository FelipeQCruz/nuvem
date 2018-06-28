<?php
include "db.php";

include "session.php";

	$body = file_get_contents('php://input');
	$body = trim($body);
	$obj  = json_decode($body,true);

	if($obj["id"] = $_SESSION["id"])
	{
		$id_responsavel = $_SESSION["id"];
		$n_quartos = $obj["n_quartos"];
		$n_banheiros = $obj["n_banheiros"];
		$area = $obj["area"];
		$cep = $obj["cep"];
		$rua = $obj["rua"];
		$bairro = $obj["bairro"];
		$cidade = $obj["cidade"];
		$preco = $obj["preco"];
		$tipo = $obj["tipo"];
		if(!empty($_FILES['imagem1']['tmp_name']) && file_exists($_FILES['imagem1']['tmp_name'])) {
		   // $imagem1= addslashes(file_get_contents($_FILES['imagem1']['tmp_name']));
			$imagem1= base64_encode(file_get_contents($_FILES['imagem1']['tmp_name']));
		}
		else {
				$imagem1= NULL;
		};
		if(!empty($_FILES['imagem2']['tmp_name']) && file_exists($_FILES['imagem2']['tmp_name'])) {
			$imagem2= base64_encode(file_get_contents($_FILES['imagem2']['tmp_name']));
		}
		else {
				$imagem2= NULL;
		};
		if(!empty($_FILES['imagem3']['tmp_name']) && file_exists($_FILES['imagem3']['tmp_name'])) {
			$imagem3= base64_encode(file_get_contents($_FILES['imagem3']['tmp_name']));
		}
		else {
				$imagem3= NULL;
		};

		$stmt = $pdo->prepare("SELECT email_contato, tel_contato FROM cliente WHERE id_usuario = ?;");

		$stmt -> execute([$id_responsavel]);

		$data = $stmt->fetchAll();
		//var_dump($data);

		$result['add'] = false;	
		
		$stmt = $pdo->prepare("INSERT INTO imovel(id_responsavel, n_quartos, n_banheiros, area, cep, rua,
		 bairro, cidade, email_contato, tel_contato, preco, tipo, imagem1, imagem2, imagem3) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);");

		if(	$stmt -> execute([$id_responsavel, $n_quartos, $n_banheiros, $area, $cep, $rua, $bairro,
		$cidade, $data[0]['email_contato'], $data[0]['tel_contato'], $preco, $tipo, $imagem1, $imagem2, $imagem3])	)	
		{
			http_response_code(201);
			$result['add'] = true;	
		}
		else 
		{
			http_response_code(403);
		}
		echo json_encode($result);
	}
	else 
	{
		http_response_code(403);
	}
?>
