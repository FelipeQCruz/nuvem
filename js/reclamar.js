$(document).ready(function(){
	if(sessionStorage.getItem('tipo')=='Senhorio')
	{
		$('#adicionar_imovel').show();
		/*
		
		var jsonData = {};
		jsonData['id_user'] = sessionStorage.getItem('id');
		//console.log(jsonData);

		var json = JSON.stringify(jsonData);   
		$.post("back/relatorio",json,    
		function (data){
			//console.log(data);

			var array = JSON.parse(data);
			//console.log(array.length);
			//console.log(array);
		});*/
	}	
	else
	{
		/*
		var jsonData = {};
		jsonData['id_user'] = sessionStorage.getItem('id');
		//console.log(jsonData);

		var json = JSON.stringify(jsonData);   
		$.post("back/relatorio",json,    
		function (data){
			//console.log(data);

			var array = JSON.parse(data);
			//console.log(array.length);
			//console.log(array);
		});*/
	}
	});	

	$('#enviar').on('click', function() 
	{
	//	console.log(sessionStorage.getItem("id_imovel"));
		$('#erro').hide();
		$('#sucesso').hide();
		
		var array = $("form").serializeArray();
		var jsonData = {};

		jQuery.each(array,function(){
			jsonData[this.name] = this.value;
		});
		jsonData['id_user'] = sessionStorage.getItem('id');
		jsonData['id_imovel'] = sessionStorage.getItem('id_imovel');
		//jsonData['reclamacao'] = ;
		//falta colocar a reclamacao no json
		console.log(jsonData);

		var json = JSON.stringify(jsonData);   
		$.post("back/reclamar",json,    
		function (data){
			console.log(data);

			var array = JSON.parse(data);
			//console.log(array.length);
			//console.log(array);
			
			if(array.resultado == true)
			{
				$('#sucesso').show();
				window.setTimeout(function () {
				location.href = "user";
				}, 2500); 				
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