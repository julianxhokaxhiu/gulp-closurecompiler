gulp-closurecompiler
====================

The ClosureCompiler.js Gulp Task (port of https://github.com/dcodeIO/grunt-closurecompiler)

## Usage

First, install `gulp-closurecompiler` as a dependency:

```shell
npm install gulp-closurecompiler
```

Then, add it to your `gulpfile.js`:

```javascript
var gulpCC = require("gulp-closurecompiler");

gulp
.src( './src/*.js' )
.pipe(
	gulpCC({
		dest: './dest/scripts.min.js'
	})
)
```

## API

### gulp-closurecompiler(options)

#### options.dest
Type: `String` (Required)

Destination to write the compiled assets

All other options for [ClosureCompiler.js](https://github.com/dcodeIO/ClosureCompiler.js) are passed through.

## License

See [LICENSE](https://github.com/julianxhokaxhiu/gulp-closurecompiler/blob/master/LICENSE)