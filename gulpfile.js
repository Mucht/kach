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
    gBabel = require( "gulp-babel" ),
    gUtil = require( "gulp-util" ),
    Mongo = require( "mongodb" ),
    ObjectID = Mongo.ObjectID,
    MongoClient = Mongo.MongoClient;

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

gulp.task( "reset-db", function( fNext ){
    // 1. verify that we are INSIDE the vagrant
    // 2. drop database
    // 3. parse & fill banks
    // 4. parse & fill terminals
} );

gulp.task( "watch", function(){
    gulp.watch( "src/**/*.js", [ "build" ] );
} );

gulp.task( "default", [ "build" ] );

gulp.task( "work", [ "build", "watch" ] );
