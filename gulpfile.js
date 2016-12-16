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
    gSass = require( "gulp-sass" ),
    gEslint = require( "gulp-eslint" ),
    gBabel = require( "gulp-babel" ),
    gUtil = require( "gulp-util" ),
    Mongo = require( "mongodb" ),
    browserify = require( "browserify" ),
    babelify = require( "babelify" ),
    sourceStream = require( "vinyl-source-stream" ),
    ObjectID = Mongo.ObjectID,
    MongoClient = Mongo.MongoClient;

gulp.task( "styles", function(){
    return gulp
        .src( "static/sass/**/*.scss" )
        .pipe( gSass( {
            "includePaths": [
                require( "bourbon" ).includePaths,
            ]
        } ).on( "error", gSass.logError ) )
        .pipe( gulp.dest( "static/css" ) )
} )

gulp.task( "lint", function(){
    return gulp
        .src( "src/**/*.js" )
        .pipe( gEslint() )
        .pipe( gEslint.format() );
} );

gulp.task( "build", function(){
    return gulp
        .src( "src/**/*.js" )
        .pipe( gBabel() )
        .pipe( gulp.dest( "bin" ) );
} );

gulp.task( "views", function(){
    return gulp
        .src( "src/views/**" )
        .pipe( gulp.dest( "bin/views" ) );
} );

gulp.task( "reset-db", function( fNext ){
    // 0. verify that we are INSIDE the vagrant
    if ( process.env.USER !== "vagrant" ) {
        gUtil.beep();
        gUtil.log( gUtil.colors.red( "This task must be runned from INSIDE the vagrant box!" ) );
        return fNext();
    }
    // 1. connect to mongodb
    MongoClient.connect( "mongodb://127.0.0.1:27017/kach", function( oError, oDB ){

        var fDataParser;

        if ( oError ) {
            gUtil.beep();
            return fNext( oError );
        }

        fDataParser = function( oElt ){
            // transform the _id into on objectID that mongodb understand
            oElt._id = new ObjectID( oElt._id.$oid );
            if ( oElt.bank && oElt.bank.$oid ) {
                oElt.bank = new ObjectID( oElt.bank.$oid );
            }

            //transform dates into format that mongodb understand
            oElt.created_at = new Date( oElt.created_at );
            oElt.updated_at = new Date( oElt.updated_at );
            if ( oElt.deleted_at ) {
                oElt.deleted_at = new Date( oElt.deleted_at );
            }
            return oElt;
        };

        // 2. drop database
        oDB
            .dropDatabase()
            .then( function(){
                // 3. parse & fill banks
                var aBanks = require( __dirname + "/_dev/banks.json" );

                return oDB.collection( "banks" ).insertMany( aBanks.map( fDataParser ) ); // map => better than foreach - Permet d'appeller pour chaque element du tableau chaque attribut
            } )
            .then( function(){
                // 4. parse & fill terminals
                var aTerminals = require( __dirname + "/_dev/terminals.json" );

                return oDB.collection( "terminals" ).insertMany( aTerminals.map( fDataParser ) );
            } )
            .then( function(){
                oDB.close();
                gUtil.log( gUtil.colors.green( "DB has been resetted!" ) );
                fNext();
            } )
            .catch( function( oError ){
                // if error we disconnect with the DB
                oDB.close();
                fNext( oError );
            } )

    } );
} );

gulp.task( "modules", function(){
    browserify( "static/modules/main.js" )
        .transform( babelify, {
            "presets": [ "es2015" ],
        } )
        .bundle()
        .pipe( sourceStream( "app.js" ) )
        .pipe( gulp.dest( "static/js/" ) );
} );

gulp.task( "watch", function(){
    gulp.watch( "src/**/*.js", [ "build" ] );
    gulp.watch( "src/views/**", [ "views" ] );
    gulp.watch( "static/sass/**/*.scss", [ "styles" ] );
    gulp.watch( "static/modules/**/*.js", [ "modules" ] );
} );

gulp.task( "default", [ "build", "views", "styles", "modules" ] );

gulp.task( "work", [ "default", "watch" ] );
