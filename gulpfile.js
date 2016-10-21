/* ria/kach
 *
 * /gulpfile.js - gulp tasks
 *
 * Coded by Mathieu Claessens
 * started at 21/10/2016
*/

/* eslint-disable */

"use strict";

var
    gulp = require( "gulp" ),
    gEslint = require( "gulp-eslint" ),
    babel = require("gulp-babel");

gulp.task( "lint", function(){
    return gulp
        .src( "src/**/*.js" )
        .pipe( gEslint() )
        .pipe( gEslint.format() );
} );

gulp.task( "build", function(){
  return gulp
    .src( "src/**/*.js" )
    .pipe( babel() )
    .pipe( gulp.dest( "bin" ) );
} );

gulp.task( "watch", function(){
    gulp.watch( "src/**/*.js", [ "build" ] );
} );

gulp.task( "default", [ "build" ] );

gulp.task( "work", [ "build", "watch" ] );
