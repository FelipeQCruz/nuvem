$(document).ready(function(){	
	if(sessionStorage.getItem('tipo')=='Senhorio')
	{
		$('#adicionar_imovel').show();
		//post mostrar casas snho
	}	
	var array = $("form").serializeArray();
	var jsonData = {};
	jQuery.each(array,function(){
		jsonData[this.name] = this.value;
	});
	var json = JSON.stringify(jsonData);   
	$.post("back/mostrarcasas",json,    
		function (data){
			$("#re").html("");
			var array = JSON.parse(data);
			for (var key in array) 
			{
				if (array.hasOwnProperty(key)) 
				{
					var id_imovel = array[key]["id_imovel"];
					var n_quartos = array[key]["n_quartos"];
					var n_banheiros = array[key]["n_banheiros"];
					var area = array[key]["area"];
					var cep = array[key]["cep"];
					var rua = array[key]["rua"];
					var bairro = array[key]["bairro"];
					var cidade = array[key]["cidade"];
					var email_contato = array[key]["email_contato"];
					var tel_contato = array[key]["tel_contato"];
					var preco = array[key]["preco"];
					var tipo = array[key]["tipo"];
					var imagem1 = array[key]["imagem1"];
					createCard(n_quartos,n_banheiros,area,cep,rua,bairro,cidade,email_contato,tel_contato,preco,tipo,imagem1,id_imovel)
				}
			}
		});
	});	
	
	if (typeof sessionStorage.getItem("id") !== 'string')
	{
		console.log(sessionStorage.getItem("id"));
		console.log("nao logado, mandando pra /index");
		window.location.replace("index");   
	}
	else
	{
		$('#username').html(sessionStorage.getItem('nome'));
		//console.log(sessionStorage.getItem('nome'));
	}
	
	$('#logout').on('click', function() {
		event.preventDefault();
		sessionStorage.removeItem("id");
		sessionStorage.removeItem("id_imovel");
		sessionStorage.removeItem("nome");
		sessionStorage.removeItem("tipo");
		window.location.replace("index");   
		//console.log("logout");
	})

	$('#avancada').on('click', function() {
		event.preventDefault();
		$('#div-busca-avancada').toggle();
		//console.log("ava");
	})
	
	$("#buscar").click(function(){
	var array = $("form").serializeArray();
	var jsonData = {};

	jQuery.each(array,function(){
		jsonData[this.name] = this.value;
	});
	//console.log(jsonData);

	var json = JSON.stringify(jsonData);   
	$.post("back/mostrarcasas",json,    
		function (data){
			//console.log(data);

			$("#re").html("");

			var array = JSON.parse(data);
			//console.log(array.length);
			//console.log(array);

			for (var key in array) 
			{
				if (array.hasOwnProperty(key)) 
				{
					var id_imovel = array[key]["id_imovel"];
					var n_quartos = array[key]["n_quartos"];
					var n_banheiros = array[key]["n_banheiros"];
					var area = array[key]["area"];
					var cep = array[key]["cep"];
					var rua = array[key]["rua"];
					var bairro = array[key]["bairro"];
					var cidade = array[key]["cidade"];
					var email_contato = array[key]["email_contato"];
					var tel_contato = array[key]["tel_contato"];
					var preco = array[key]["preco"];
					var tipo = array[key]["tipo"];
					var imagem1 = array[key]["imagem1"];

					createCard(n_quartos,n_banheiros,area,cep,rua,bairro,cidade,email_contato,tel_contato,preco,tipo,imagem1,id_imovel)
				}
			}
		});
});	

	function createCard(quartos,banheiros,area,cep,rua,bairro,cidade,email_contato,tel_contato,preco,tipo,imagem1,id_imovel){
		//seletor da seção de resultados
    	var results = $("#re");
		
     	var row = document.createElement("div"); 
     	row.classList.add("col-12");
     	row.classList.add("col-sm-12");
     	row.classList.add("col-md-6");
     	row.classList.add("col-lg-4");

    	var card = document.createElement("div");
		card.classList.add("card");
		card.setAttribute("style","width: 18rem; margin-top: 3rem;");
		//append no card da img <div>
		var img = document.createElement("img");
		img.setAttribute("src","data:image/jpeg;base64,"+imagem1);
		img.setAttribute("style","height: 255px");
		card.append(img);
		//append no card de card-body <div>
		var card_body = document.createElement("div");
		card_body.classList.add("card-body");
		card.append(card_body);
		//criando conteudo de card-body
		var card_title = document.createElement("h5");
		card_title.classList.add("card-title");
		card_title.append(tipo);
		card_body.append(card_title);
		//criar <ul> class="list-group list-group-flush"
		var ul = document.createElement("ul");
		ul.classList.add("list-group");
		ul.classList.add("list-group-flush");
		card.append(ul);
		//criar <li> list-group-item x7
		var li_quartos = document.createElement("li");
		var li_banheiros = document.createElement("li");
		var li_area = document.createElement("li");
		var li_endereco = document.createElement("li");
		var li_email = document.createElement("li");
		var li_tel = document.createElement("li");
		var li_preco = document.createElement("li");
		
		li_quartos.classList.add("list-group-item");
		li_banheiros.classList.add("list-group-item");
		li_area.classList.add("list-group-item");
		li_endereco.classList.add("list-group-item");
		li_email.classList.add("list-group-item");
		li_tel.classList.add("list-group-item");
		li_preco.classList.add("list-group-item");
		//append no <ul>
		ul.append(li_quartos);
		ul.append(li_banheiros);
		ul.append(li_area);
		ul.append(li_endereco);
		ul.append(li_email);
		ul.append(li_tel);
		ul.append(li_preco);
		//criar <b> , seus textos e spans x7
		var b_1 = document.createElement("b");
		var b_2 = document.createElement("b");
		var b_3 = document.createElement("b");
		var b_4 = document.createElement("b");
		var b_5 = document.createElement("b");
		var b_6 = document.createElement("b");
		var b_7 = document.createElement("b");

		var t_1 = document.createTextNode("Quartos: ");
		var t_2 = document.createTextNode("Banheiros: ");
		var t_3 = document.createTextNode("Área: ");
		var t_4 = document.createTextNode("Endereco: ");
		var t_5 = document.createTextNode("Email: ");
		var t_6 = document.createTextNode("Telefone: ");
		var t_7 = document.createTextNode("Preço: ");

		var s_1 = document.createElement("span");
		var s_2 = document.createElement("span");
		var s_3 = document.createElement("span");
		var s_4 = document.createElement("span");
		var s_5 = document.createElement("span");
		var s_6 = document.createElement("span");
		var s_7 = document.createElement("span");
	
		//texto dos spans
		s_1.append(quartos);
		s_2.append(banheiros);
		s_3.append(area);
		s_4.append(rua+", "+ cidade+", "+ bairro+", CEP: "+ cep);
		s_5.append(email_contato);
		s_6.append(tel_contato);
		s_7.append(preco);

		b_1.append(t_1);
		b_2.append(t_2);
		b_3.append(t_3);
		b_4.append(t_4);
		b_5.append(t_5);
		b_6.append(t_6);
		b_7.append(t_7);
		//append nos <li>
		li_quartos.append(b_1);
		li_quartos.append(s_1);
		li_banheiros.append(b_2);
		li_banheiros.append(s_2);
		li_area.append(b_3);
		li_area.append(s_3);
		li_endereco.append(b_4);
		li_endereco.append(s_4);
		li_email.append(b_5);
		li_email.append(s_5);
		li_tel.append(b_6);
		li_tel.append(s_6);
		li_preco.append(b_7);
		li_preco.append("R$ ");
		li_preco.append(s_7);
		//criar mais um card_body
		var card_body_2 = document.createElement("div");
		card_body_2.classList.add("card-body");
		
		var btn = document.createElement("button");
		btn.classList.add("btn");
		btn.classList.add("btn-primary");
		btn.onclick = function () {
			event.preventDefault;
			//console.log(array.id_imovel);
			console.log(id_imovel);
			sessionStorage.setItem('id_imovel', id_imovel);
			window.location.replace("user_detalhes");   
			return false;
};
		var t_btn = document.createTextNode("Detalhes");
		btn.append(t_btn);
		card_body_2.append(btn);
		card.append(card_body_2);

		row.append(card);
		
    	results.append(row);
}

	
	//Handler global de erros do Ajax
	$( document ).ajaxError(function(event, jqxhr, settings,thrownError ) {
		console.log("Erro Ajax:\n");
		console.log(jqxhr.status);

		switch(jqxhr.status){
			case 403:
				alert("Erro");
			break;

			case 204:
				alert("0 resultados");
			break;
		}
		
	});
	
//});
/*
  function get_resp_status(url) {
    $.ajax({
      url: url,
      complete: function (jqxhr, txt_status) {
        console.log ("Complete: [ " + txt_status + " ] " + jqxhr.status);
        // if (response code is 301) {
        //console.log ("Location: " + jqxhr.getResponseHeader("Location"));
        // }
      }
    });
  }
  $(document).ready(function(){
	$("#buscar").click(function(){
        get_resp_status('back/mostrarcasas');
      }
    );
  });
  */