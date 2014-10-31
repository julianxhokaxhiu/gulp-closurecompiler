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

var closureCompiler = require('closurecompiler'),
	gulpUtil = require('gulp-util'),
	through = require('through'),
	extend = require('extend'),
	Buffer = require('buffer').Buffer,
	path = require('path');

// Plugin level function(dealing with files)
module.exports = function (options, gccOptions) {

	// This will live our array of files
	var files = [],
		forEachFile = function (file) {
			files.push( file );
		},
		beforeEnd = function() {
			var filePaths = files.map(function(file){ return file.path; }),
				firstFile = files[0];

			// Run the GCC
			closureCompiler.compile( filePaths, gccOptions, function (error, data){
				if ( data ) {
					var outFile = new gulpUtil.File({
						base: firstFile.base,
						contents: new Buffer( data ),
						cwd: firstFile.cwd,
						path: path.join(firstFile.base, options.fileName)
					});

					this.emit( 'data', outFile );
					this.emit( 'end' );
				} else {
					this.emit( 'error', new gulpUtil.PluginError(PLUGIN_NAME, error) );
				}
			}.bind(this) );
		};

	// Check if at least a destionation directory have been given
	if (!options.fileName) {
		throw new gulpUtil.PluginError(PLUGIN_NAME, 'options.fileName is missing');
	}

	// Merge default options with the ones provided by the user
	gccOptions = extend({
		'compilation_level': 'SIMPLE_OPTIMIZATIONS'
	}, gccOptions);

	return through( forEachFile, beforeEnd );
};