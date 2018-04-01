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
				string += '<p>Pokemon = <b>' + data.name.toUpperCase()  + '</b><p>';
	    		string += '<p>Peso</p><p>' + data.weight + '</p>';
	    		string += '<p>Imagen</p><img src="' + data.sprites.back_default + '" height="96" width="96">';
	 			information.html(string);
	  		})
	  		.fail(function(jqxhr, textStatus, error) {
	    		var message = textStatus + ', ' + error;
	    		console.log('Error generado en API, con mensaje: ' + message);				
		});
  	}

  	getPokemones('https://pokeapi.co/api/v2/pokemon/'); // Cargamos pirmeros 20 Pokemones
});

