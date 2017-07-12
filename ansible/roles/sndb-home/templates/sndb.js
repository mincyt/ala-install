function separarMiles(nStr, separadorMiles, separadorDecimal) {
    if (!separadorMiles)
	separadorMiles = '.';
    if (!separadorDecimal)
	separadorDecimal = ',';
    nStr += '';
    var x = nStr.split(separadorDecimal);
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + separadorMiles + '$2');
    }
    return x1 + x2;
}

function totalRecord(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '{{biocache_service_context_path}}/occurrences/search?q=*:*&facet=off&pageSize=0');
	xhr.addEventListener('readystatechange', function() {
	if (xhr.readyState === 4) {
		var response = JSON.parse(xhr.responseText);
		totalRecord = separarMiles(response.totalRecords, ' ');
		$('#totalRecord').text(totalRecord);
	}
	}, false);
	xhr.send(null);
}
function totalDataset(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '{{collectory_context_path}}/ws/dataResource/');
	xhr.addEventListener('readystatechange', function() {
	if (xhr.readyState === 4) {
		var response = JSON.parse(xhr.responseText);
		totalDataset = separarMiles(response.length, ' ');
		$('#totalDataset').text(totalDataset);
	}
	}, false);
	xhr.send(null);
}

/**
 *
 *
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}

function mostrarImagenes(cuales) {
	console.log(cuales);
	$.each(cuales, function(key,value) {
	  console.log('key -> '+key + '; value -> ' + value);
	  $('#' + key)
	    .attr('src', 'galeria/'+key+'/'+randomInt(1,value).toString().lpad('0',3)+'.jpg')
	    .show();
	});
}

$( document ).ready(function() {
	totalRecord();
	mostrarImagenes( { 'georeferenciados':23, 'datasets':30, 'colecciones': 35 } );
});

