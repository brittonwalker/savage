var assign = require( 'lodash.assign' );
var	autoprefixer = require( 'autoprefixer' );
var	babel = require( 'babelify' );
var	browserify = require( 'browserify' );
var	buffer = require( 'vinyl-buffer' );
var cssnano = require( 'gulp-cssnano' );
var	gulp = require( 'gulp' );
var	gutil = require( 'gulp-util' );
var importCss = require( 'postcss-import' );
var	livereload = require( 'gulp-livereload' );
var	notify = require( 'gulp-notify' );
var	postcss = require( 'gulp-postcss' );
var	rename = require( 'gulp-rename' );
var	sass = require( 'gulp-sass' );
var	sassGlob = require( 'gulp-sass-glob' );
var	source = require( 'vinyl-source-stream' );
var	sourcemaps = require( 'gulp-sourcemaps' );
var uglify = require( 'gulp-uglify' );
var	watch = require( 'gulp-watch' );
var	watchify = require( 'watchify' );

// Custom browserify options

var config = {
		themePath: './',
		npmPath: './node_modules'
	},
	customOpts = {
			entries: ['./js/main.js'],
			debug: true
	},
	opts = assign( {}, watchify.args, customOpts ),
	b = watchify( browserify( opts ) )
;

gulp.task( 'browserify', function() {

	return b.bundle()
	// log errors if they happen
	.on( 'error', gutil.log.bind( gutil, 'Browserify Error' ) )
	.pipe( source( 'bundle.js' ) )
	// optional, remove if you don't need to buffer file contents
	.pipe( buffer() )
	// optional, remove if you dont want sourcemaps
	.pipe( sourcemaps.init( { loadMaps: true } ) ) // loads map from browserify file
	// Add transformation tasks to the pipeline here.
	.pipe( uglify() )
	.pipe( sourcemaps.write( './' ) ) // writes .map file
	.pipe( gulp.dest( './assets' ) );

} );

gulp.task( 'sass', function () {
    return gulp.src( './scss/main.scss' )
        .pipe( sourcemaps.init() )
        .pipe( sassGlob() )
        .pipe( sass( {
            includePaths: [
                config.npmPath,
                config.npmPath + '/bootstrap/scss/'
            ]
        } ) )
        .pipe( postcss( [
            importCss(),
            autoprefixer( {
                browsers: [
                    'iOS >= 8',
                    'Android >= 4',
                    'Safari >= 9',
                    'Firefox >= 41',
                    'Chrome >= 46',
                    'Explorer >= 9'
                ]
            } )
        ] ) )
        .on( 'error', notify.onError( function ( error ) {
            return 'Error ' + error.message;
        } ) )
        .pipe( sourcemaps.write() )
        .pipe( rename( 'styles.css' ) )
        .pipe( gulp.dest( config.themePath + '/assets/css' ) )
        .pipe( cssnano( {
            discardComments: {
                removeAll: true
            }
        } ) )
        .pipe( rename( 'site.min.css' ) )
        .pipe( gulp.dest( config.themePath + '/assets/css' ) )
        .pipe( livereload() );

} );

gulp.task( 'watch', function () {
    livereload.listen( { quiet: true } );
    gulp.watch( [
        config.themePath + '/js/main.js',
        config.themePath + '/js/app/**/*.js'
    ], [
        'browserify'
    ] );

    gulp.watch( [
        config.themePath + '/scss/**/*.scss'
    ], [
        'sass'
    ] );
} );

gulp.task( 'default', [ 'browserify', 'sass', 'watch' ] );