var colors = [
	'yellow',
	'purple',
	'green',
	'peach'
]

var color = colors[Math.floor(Math.random()*colors.length)];

$( 'body' ).addClass( color );

$( 'p' ).on( 'mouseenter', function() {

	console.log($(this).attr("data-test"))
	var url = $(this).attr("data-test")
	$(this).css('z-index', 3000);
	$(this).css('position', 'relative');
	$( '.scrim' ).addClass( 'show' )
	$( '.insert' ).attr("src", url);
	console.log( img );
	$( 'scrim' ).append( img )

})

$( 'p' ).on( 'mouseleave', function() {

	var url = $(this).attr("data-test")
	$(this).css('z-index', 0);
	$(this).css('position', 'relative');
	$( '.scrim' ).removeClass( 'show' )
	$( '.insert' ).attr("src", '');

})