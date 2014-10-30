/*
	The MIT License (MIT)

	Copyright (c) 2014 Julian Xhokaxhiu

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

const PLUGIN_NAME = 'gulp-closurecompiler';

var gulpUtil = require('gulp-util'),
	through = require('through2'),
	extend = require('extend'),
	closureCompiler = require("closurecompiler"),
	fs = require('fs'),
	compileScripts = function(files, dest, options){
		closureCompiler.compile( files, options, function (error, result){
			if ( result ) {
				fs.writeFile( dest , result );
			} else {
				throw new gulpUtil.PluginError(PLUGIN_NAME, error);
			}
		})
	},
	compilerTaskTimeoutId = null;

// Plugin level function(dealing with files)
module.exports = function (options) {

	// Merge default options with the ones provided by the user
	options = extend({
		'compilation_level': 'SIMPLE_OPTIMIZATIONS'
	}, options);

	// Check if at least a destionation directory have been given
	if (!options.dest) {
		throw new gulpUtil.PluginError(PLUGIN_NAME, 'options.dest is missing');
	}

	// Create a stream where all the files will be read
	var files = [],
		stream = through.obj(function(file, enc, callback) {
		files.push( file.path );

		// Not really satisfied with this but actually works
		if ( compilerTaskTimeoutId ) clearTimeout( compilerTaskTimeoutId );
		compilerTaskTimeoutId = setTimeout( function(){
			var dest = options.dest;
			delete options['dest'];
			compileScripts( files, dest, options );
		}, 1000 );

		this.push(file);
		return callback();
	});

	return stream;
};