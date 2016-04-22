/*
	muestro la respuesta actual ya introducida cuando tiramos atrás y adelante (l: 181-185)
	evitamos q por error, en las respuestas se baje hasta -1 l:231-235
*/

//para implementar el botón siguiente
var counter=0;

var palabrasClave, palabrasMemorizar;
var respuestas = [];
var numeroTest=-1;
var contador = -1;
var contadorImg = 1;

//compribar  q la lista está entre 5 y 450...
function enviarLongitudLista(){
	// pillamos la longitud del formulario
	var longitudLista = (document.getElementById("longitudLista").value);
	console.log(name);
	// aseguramos q se introduce longitud incorrecta
	if(longitudLista < 1 || longitudLista > 470 || isNaN(longitudLista)){
		console.log("longitud incorrecta");
		return false;
	// entrada correcta
	}else{
		// si la longitud es entre 5-470
		cargarListas(longitudLista);
	}
}

function cargarListas (longitudLista) {
	console.log("longitud correcta!!!");

	//escondemos el formulario con el numero de palabras entradas
	$("#formularioLongitudLista").hide();

	//pasamos el numero de palabras para obtner las claves necesarias
 	var xmlhttpPalabrasClave = new XMLHttpRequest();
    // var palabrasClave;
    xmlhttpPalabrasClave.onreadystatechange = function() {
        if (xmlhttpPalabrasClave.readyState == 4 && xmlhttpPalabrasClave.status == 200) {
			palabrasClave = JSON.parse(xmlhttpPalabrasClave.responseText);
			// console.log(palabrasClave[0]);
			for (var i = 0; i < palabrasClave.length; i++) {
				// console.log( "Palabra[" + (i+1) + "] = " + palabrasClave[i] );
			}
        }
    };
    xmlhttpPalabrasClave.open("GET", "php/obtenerPalabrasClave.php?q=" + longitudLista, false);
    // xmlhttpPalabrasClave.responseType = "json";  
    xmlhttpPalabrasClave.send();

	
	//palabras a MEMORIZAR
	var xmlhttp = new XMLHttpRequest();
    // var palabrasMemorizar;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			palabrasMemorizar = JSON.parse(xmlhttp.responseText);
			// console.log(palabrasMemorizar[0]);
			for (var i = 0; i < palabrasMemorizar.length; i++) {
				// console.log( "Palabra[" + (i+1) + "] = " + palabrasMemorizar[i] );
			}
        }
    };
    xmlhttp.open("GET", "php/obtenerPalabrasMemorizar.php?q=" + longitudLista, false);
    // xmlhttp.responseType = "json";  
    xmlhttp.send();


    //pasamos los listados a la funcion de mostrar en pantalla
    mostrarPalabras(palabrasClave, palabrasMemorizar);
    // console.log( "Palabra[" + (1) + "] = " + palabrasMemorizar );
}

function anterior () {
	counter--;
	counter--;
	siguiente();
}

//mostrar la lista de palabras una a una
function siguiente() {
	contadorImg = 0;
	// si se llega al final de la longitud de la lista
	if (counter+1 >= palabrasClave.length) {
		// console.log("NO MÁS PALABRAS");
		$("#listaCompletada").show();
		$("#memorizarPalabras").hide();
		$("#comenzarTest").show();
	}else{//mientras no se llegue al final de la longitud de la lista
		counter++;
		console.log("counterSiguiente" + counter);
		mostrarPalabras(palabrasClave, palabrasMemorizar);
	}
}

//mostrar palabra clave a la izquierda y palabra a memorizar a la derecha
function mostrarPalabras (palabrasClave, palabrasMemorizar) {
	console.log("mostrarPalabras???	");
	$("#memorizarPalabras").show();

	// console.log("counter: " + counter);    
	$("#palabrasClave").html("Palabra clave #" + (counter+1) + " = <span id='memo' style='color:red'>"  + palabrasClave[counter] + "</span>");	
	console.log("[counter]" + counter);
	console.log("palabraClacve[counter]" + palabrasClave[counter]);
	$("#palabrasMemorizar").html("Palabra a memorizar #" + (counter+1) + " = <span id='memo' style='color:red'>"  + palabrasMemorizar[counter] + "</span>");	
	// $("#imagenesMemorizar").html("<img src='scriptsData/fotosMemorizar/" + palabrasMemorizar[counter] + "' alt=''/>");	
	palabrasMemorizar[counter] = palabrasMemorizar[counter].replace('\n','');
	palabrasClave[counter] = palabrasClave[counter].replace('\n','');

    
    //checkear tamaño imagen antes de mostrar
	$("#imagenesMemorizar").show();
	$("#imagenesClave").show();

	$(".botonSiguienteImagen").show();
    $("#imagenesClave").attr("src","scriptsData/fotosClave/" + (counter+1) + "/" +  palabrasClave[counter] + "/" + palabrasClave[counter] + "_1");
    console.log("CounterClave: " + (counter+1));
	$("#imagenesMemorizar").attr("src","scriptsData/fotosMemorizar/" + palabrasMemorizar[counter] + "/" + palabrasMemorizar[counter] + "_" + contadorImg );
    var ruta = "fotosMemorizar/" + palabrasMemorizar[counter] + "/" + palabrasMemorizar[counter] + "_" + contadorImg;
    comprobarSizeImagen(ruta);

	// console.log(palabrasMemorizar[counter]);
	console.log("contadorImg : " + contadorImg);

	// console.log(palabrasMemorizar[counter]);
}

//cambiar las difrentes imagenes de cada palabra 
function siguienteImg () {
    contadorImg++;
    // contadorImg = (contadorImg >= 10 ? 1 : contadorImg) ;
    //q no se quede dando bueltas a las imagenes cuando ninguna vale
    var filePath;
    if (contadorImg>10) {
		filePath = "fotosMemorizar/noDisponible/noDisponible_1";
		contadorImg=0;
		console.log(filePath);
		$("#imagenesMemorizar").attr("src","scriptsData/fotosMemorizar/noDisponible/noDisponible_10" );
		comprobarSizeImagen(filePath);
    }else{
	    $("#imagenesMemorizar").attr("src","scriptsData/fotosMemorizar/" + palabrasMemorizar[counter] + "/" + palabrasMemorizar[counter] + "_" + contadorImg );
		// console.log("contadorImg : " + contadorImg);
		// console.log(("scriptsData/fotosMemorizar/" + palabrasMemorizar[counter] + "/" + palabrasMemorizar[counter] + "_" + contadorImg));
		filePath = "fotosMemorizar/" + palabrasMemorizar[counter] + "/" + palabrasMemorizar[counter] + "_" + contadorImg;
		comprobarSizeImagen(filePath);
	}
}

//cambiar las difrentes imagenes de cada palabra  cuando se apreta la tecla 5(aqui si q ha de hacer loop en las imagenes)
function siguienteImgButton5 () {
    contadorImg++;
    console.log("button5");
    contadorImg = (contadorImg >= 10 ? 1 : contadorImg) ;
    $("#imagenesMemorizar").attr("src","scriptsData/fotosMemorizar/" + palabrasMemorizar[counter] + "/" + palabrasMemorizar[counter] + "_" + contadorImg );
	console.log("contadorImg : " + contadorImg);
	console.log(("scriptsData/fotosMemorizar/" + palabrasMemorizar[counter] + "/" + palabrasMemorizar[counter] + "_" + contadorImg));
	var filePath = "fotosMemorizar/" + palabrasMemorizar[counter] + "/" + palabrasMemorizar[counter] + "_" + contadorImg;
	comprobarSizeImagenButton5(filePath);
}

function comprobarSizeImagen (filePath) {
	console.log("filePath: " + filePath);
		//comprobar tamaño de la imagen para no mostrar fotos vacías
	$.ajax({
		type: 'get',
		url: 'http://localhost/mentalismo/scriptsData/comprobarSize.php',
		data: {file : filePath},
		success: function(data){	//que no concuerde con fotosMemorizar/palabra/
			console.log(data);
			//si la imagen pesa menos de 3682bytes se supone q no existe o q es una imagen de interrogacion o está vacía y se ha de saltar
			if (data < 3682 || (isNaN(data))) {
				console.log("foto vacía: " + data);
				siguienteImg();
			}else
			{
				console.log("SIZE CORRECTA!!");
        		console.log("url: " + this.url);
			}
	    },error: function (xhr, ajaxOptions, thrownError) {
        	console.log(xhr.status);
        	console.log("url: " + this.url);

        	// alert(thrownError);
      	}
	});

}

//la misma q comprobarSize pero especifica para el siguienteImgButton5
function comprobarSizeImagenButton5 (filePath) {
	console.log("filePath: " + filePath);
		//comprobar tamaño de la imagen para no mostrar fotos vacías
	$.ajax({
		type: 'get',
		url: 'http://localhost/mentalismo/scriptsData/comprobarSize.php',
		data: {file : filePath},
		success: function(data){	//que no concuerde con fotosMemorizar/palabra/
			console.log(data);
			//si la imagen pesa menos de 3682bytes se supone q no existe o q es una imagen de interrogacion o está vacía y se ha de saltar
			if (data < 3682 || (isNaN(data))) {
				console.log("foto vacía: " + data);
				siguienteImgButton5();
			}else
			{
				console.log("SIZE CORRECTA!!");
        		console.log("url: " + this.url);
			}
	    },error: function (xhr, ajaxOptions, thrownError) {
        	console.log(xhr.status);
        	console.log("url: " + this.url);

        	// alert(thrownError);
      	}
	});

}

// <!-- entrada de las respuestas -->
function comenzarPrueba () {
	// console.log("comenzarPrueba");
	$("#mensajeListaCompleta").hide();
	$("#respuestas").show();

	contador++;
	// console.log("contador: " + contador);
	$("#numeroRespuesta").html("Palabra #"+(contador+1));
	document.getElementById("valorRespuesta").focus();

	// ocultamos imagenes memo
	$("#imagenesMemorizar").hide();
	$(".botonSiguienteImagen").hide();


    $("#imagenesClave").attr("src","scriptsData/fotosClave/" + (contador+1) + "/" +  palabrasClave[contador] + "/" + palabrasClave[contador] + "_1");

	// $("#valorRespuesta").attr("placeholder", "Palabra número"+(i+1));
}

//
function siguientePalabraTest() {
	$("#valorRespuesta").attr("placeholder", "Respuesta actual: undefined");
	//pone el nombre en la casilla si ya se ha respondido
	numeroTest++;
	$("#valorRespuesta").attr("placeholder", "Respuesta actual: " + respuestas[numeroTest]);
	console.log(respuestas[contador]);

	// console.log("respuesta: " + respuestas[numeroTest]);

	//comprobar q el input NO está vacío
	if (document.getElementById("valorRespuesta").value=== "") {
		numeroTest--;
		contador--;
		console.log("vacio");
		// comenzarPrueba();
	}else
	{
		respuestas[numeroTest]= (document.getElementById("valorRespuesta").value);
		/*do this*/
	}
	//vaciamos el input
	$("#valorRespuesta").val("");

	if (numeroTest+1 >= palabrasClave.length) {
		console.log("FIN LISTA");
		$("#respuestas").hide();
		// alert(respuestas);
		comprobarResultados();
	}else
	{
		contador++;
		console.log("contador: " + contador);
		console.log("respuestas: " + respuestas[numeroTest]);
		$("#numeroRespuesta").html("Palabra #"+(contador+1));
		document.getElementById("valorRespuesta").focus();

		// mostramos la imagen clave para facilitar el recuerdo
    	$("#imagenesClave").attr("src","scriptsData/fotosClave/" + (contador+1) + "/" +  palabrasClave[contador] + "/" + palabrasClave[contador] + "_1");

	}
}

//tirar atrás en las respuestas
function anteriorPalabraTest () {
	
	//vaciamos antes para evitar el error de cuando darle a saltar habiendo escrito algo
	$("#valorRespuesta").val("");

	numeroTest--;
	contador--;

	//comprobar q no baja a menos del indice 0
	if (contador === -1) {
		contador++;
		numeroTest++;
	}

	siguientePalabraTest();
}

function saltarPalabraTest () {
	//vaciamos antes para evitar el error de cuando darle a saltar habiendo escrito algo
	$("#valorRespuesta").val("");

	numeroTest++;
	contador++;
	siguientePalabraTest();
}


function comprobarResultados() {
	var numeroErrores=0;
	var errores= [];
	
	// mostrar resultados
	$("#imagenesClave").hide();

	$("#resultadosDiv").show();
	var testPerfecto = true;

	// $("#resultadosDiv").append("<p>ERRORES</p>");
	for (var j = 0; j < palabrasClave.length; j++) {
		//remove \n para comparar bien
		palabrasMemorizarOK = palabrasMemorizar[j].replace(/\n/,"");
		if (respuestas[j] != palabrasMemorizarOK) {
			numeroErrores++;
			$( "#resultadoIntroducido" ).append( "<p> #" + (j+1) +" Palabra introducida: " +respuestas[j] + "</p>");
			$( "#resultadosMemorizar" ).append( "<p> Palabra correcta: " + palabrasMemorizar[j] + "</p>");
			testPerfecto = false;
		}
	}
	// checkear si ha habido algún error
	if (testPerfecto === true) {
		$(".erroresP").hide();
		$( "#resultadoIntroducido" ).append( "<p>FELICIDADES! no cometiste ningún error</p>");
	}
		// $("#resultadoIntroducido").append("FELICIDADES! no cometiste ningún error")
}


