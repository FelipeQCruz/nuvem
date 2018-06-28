$(document).ready(function(){

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
		//console.log(json); 
			$.post("back/register",json,    
			function (data){
			//console.log(data);
			

			var array = JSON.parse(data);
			if(array.signup == true)
			{
				$('#sucesso').show();
				//console.log("criado");
				//window.location.replace("index");
					window.setTimeout(function () {
					location.href = "index";
					}, 3500);
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
				console.log("usuario nao criado");
			break;

			case 201:
				//alert("criado");
				console.log("criado");
			break;
		}
		
	});
});