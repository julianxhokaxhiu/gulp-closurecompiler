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
	gulpCC(
		{
			fileName: 'scripts.min.js'
		},
		{
			// ClosureCompiler.js options here...
		}
	)
)
.pipe(
	gulp.dest( './dest/' )
)
```

## API

### gulp-closurecompiler( options, gccOptions )

#### options.fileName
Type: `String` (Required)

The name of the file that you can want to be created

#### gccOptions
See [ClosureCompiler.js](https://github.com/dcodeIO/ClosureCompiler.js) options.

## License

See [LICENSE](https://github.com/julianxhokaxhiu/gulp-closurecompiler/blob/master/LICENSE)