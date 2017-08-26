var colors = [
	'yellow',
	'purple',
	'green',
	'peach'
]

var color = colors[Math.floor(Math.random()*colors.length)];

$( 'body' ).addClass( color );

$( 'p' ).on( 'mouseover', function() {

	console.log($(this).attr("data-test"))
	var url = $(this).attr("data-test")
	// $( '.scrim' ).addClass( 'show' )
	$( '.insert' ).attr("src", url);
	console.log( img );
	$( 'scrim' ).append( img )

})