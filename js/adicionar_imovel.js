//$(document).ready(function(){
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
//});
	$('#logout').on('click', function() {
		event.preventDefault();
		sessionStorage.removeItem("id");
		sessionStorage.removeItem("id_imovel");
		sessionStorage.removeItem("nome");
		sessionStorage.removeItem("tipo");
		window.location.replace("index");   
		//console.log("logout");
	})

	$("#enviar").click(function(){
	event.preventDefault();
	//console.log('poaefpaoeww');
	var array = $("form").serializeArray();
	var jsonData = {};

	jQuery.each(array,function(){
		jsonData[this.name] = this.value;
	});
	//console.log(jsonData);
	jsonData['id'] = sessionStorage.getItem('id');
	
	//console.log( imagem1.files.length == 0 );
	//console.log( imagem2.files.length == 0 );
	//console.log( $('#imagem2').files.length == 0 );
	//console.log($('#imagem3') == null);
	jsonData['imagem1'] = encodeImageFileAsURL(imagem1);
	//jsonData['imagem2'] = encodeImageFileAsURL(imagem2);
	//jsonData['imagem3'] = encodeImageFileAsURL(imagem3);
	var json = JSON.stringify(jsonData);   
	console.log(json);
	
	$.post("back/enviadados",json,    
		function (data){
			console.log(data);

			var array = JSON.parse(data);
			if(array.result)
				alert('imovel adicionado');
			//console.log(array.length);
			//console.log(array);
			
			window.setTimeout(function () {
			location.href = "user";
			}, 1500);
			
		});

			return false;
});	

function encodeImageFileAsURL(element) {
	if (element.files.length == 0)
	{
		return;
	}
	else
	{		
		var file = element.files[0];
		var reader = new FileReader();
		reader.onloadend = function() {
			//console.log('RESULT', reader.result)
			//console.log(reader.result)
			//console.log(typeof element);
			//console.log( element.files.length == 0 );
		}
		reader.readAsDataURL(file);
			return reader.result.replace(/^data:image\/(png|jpg);base64,/, "");
			//return 'asd';
	}
};
  
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