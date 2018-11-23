function agregartweet(autor,tweet,enlace,fecha){
	var autoreE=$("<p/>",{
		"class":"col-12 col-md-12 font-weight-bold text-center",
		html:autor
	});
	var imagenE=$("<img/>",{
		"src":"./img/logo.png"
	});
	var tweetE=$("<p/>",{
		"class":"col-12 col-md-9 text-justify",
		html:tweet
	});
	var enlaceE=$("<a/>",{
		"class":"col-12 col-md-8 text-left",
		"href":enlace,
		"target":"_blank",
		html:enlace
	});
	var fechaE=$("<p/>",{
		"class":"col-12 col-md-12 text-right",
		html:fecha
	});
	var contenedorImagen=$("<div/>",{
		"class":"col-12 col-md-3  img-fluid rounded",
	})
	var contenedor=$("<div/>",{
		"class":"row justify-content-center border-bottom m-2 border-info container datos"
	});
	autoreE.appendTo(contenedor);
	imagenE.appendTo(contenedorImagen);
	contenedorImagen.appendTo(contenedor);
	tweetE.appendTo(contenedor);
	enlaceE.appendTo(contenedor);
	fechaE.appendTo(contenedor);
	contenedor.appendTo('#tweets');
}
function cargartweets (texto) {
	$.ajax({
		type:"GET",
		url:"https://twitrss.me/twitter_search_to_rss/?term="+texto,
		dataType:"xml",
		success:function(xml){
			$(xml).find('item').each(function(){
				var autor=$(this).find('dc\\:creator').text().slice(2,-1)+", dijo:";
				var tweet=$(this).find('description').text();
				var enlace=$(this).find('link').text();
				var fecha=$(this).find('pubDate').text().slice(0,-6);
				agregartweet(autor,tweet,enlace,fecha);
			})
		},
		error:function() {
			alert("error al cargar")
		}
	});
}

$(document).ready(function() {
	$("button").click(function(event) {
		event.preventDefault();
		var buscado=$('input#buscador').val().toString();
		$(".buscar").text(buscado);
		$(".datos").remove();
		cargartweets(buscado);
	});
});