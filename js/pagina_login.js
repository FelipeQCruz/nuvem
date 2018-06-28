$(document).ready(function(){	
	if (typeof sessionStorage.getItem("id") == 'string')
	{
		console.log(sessionStorage.getItem("id"));
		console.log("ja logado, mandando pra /user");
		window.location.replace("user");   
	}
		
	$("#botao").click(function(){
		event.preventDefault();
		$('#erro').hide();
		$('#sucesso').hide();
		var array = $("form").serializeArray();
		var jsonData = {};

		jQuery.each(array,function(){
			jsonData[this.name] = this.value;
		});
		//console.log(jsonData);
			
		var json = JSON.stringify(jsonData);   
			$.post("back/login",json,    
			function (data){
				//console.log(data);

				var array = JSON.parse(data);
				if(array.login == true)
				{
					//console.log(array.id);
					$('#sucesso').show();
					sessionStorage.setItem('id', array.id);
					sessionStorage.setItem('nome', array.nome);
					sessionStorage.setItem('tipo', array.tipo);
					//console.log("logado");
					
					console.log(sessionStorage.getItem("id"));
					//window.location.replace("index");   
					
					window.setTimeout(function () {
					location.href = "user";
					}, 350);
					
				}
			});
	});
	
	
	$( document ).ajaxError(function(event, jqxhr, settings,thrownError ) {
		console.log("Erro Ajax:\n");
		console.log(jqxhr.status);

		switch(jqxhr.status){
			case 403:
				//alert("Erro");
				$('#erro').show();
				console.log("usuario nao logado");
			break;

			case 200:
				console.log("logado");
			break;
		}
		
	});
});