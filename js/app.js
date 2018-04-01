$(function() {
	/* DOM cargado completo */
	// Obtener información desde API (Servidor)
	getPokemones = function(url) {
		$.getJSON(url)			
			// Respuesta correcta del API
			.done(function(data) {
				var table = $('.table tbody');
				table.html(''); // Cargar nuevos registros a tabla
	    		$.each(data.results, function(key, value) {
	 				// Añadir registros a tabla
	 				table.append('<tr><td>' + key + '</td><td>' + value.name.toUpperCase() + '</td><td><a href="#" onclick=showPokemon("' + 
	 					value.url + '")>Ver...</a></td></tr>')
				});	
				// Añadir siguiente listado
				$('#pagination').html('<button class="button" onclick=getPokemones("' + data.next + '")>Siguiente</button>');
	  		})
	  		// Respuesta incorrecta del API
	  		.fail(function(jqxhr, textStatus, error) {
	    		var message = textStatus + ', ' + error;
	    		console.log('Error generado en API, con mensaje: ' + message);				
		});
  	}

  	showPokemon = function(url) {
  		$.getJSON(url)			
			.done(function(data) {
				var information = $('#information');
				var string = ''
				information.html(''); // Cargar nuevo Pokemon
				string += '<h2>Pokemon = <small>' + data.name.toUpperCase()  + '</small></h2>';
	    		string += '<h3>Peso</h3><br><p>' + data.weight + '</p><br>';
	    		console.log(data.weight);
	 			information.html(string);
	  		})
	  		.fail(function(jqxhr, textStatus, error) {
	    		var message = textStatus + ', ' + error;
	    		console.log('Error generado en API, con mensaje: ' + message);				
		});
  	}

  	getPokemones('https://pokeapi.co/api/v2/pokemon/'); // Cargamos pirmeros 20 Pokemones
});

