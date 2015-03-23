// modules
var gulp        = require('gulp');
var babel       = require('gulp-babel');
var mergeStream = require('merge-stream');
var args        = require('yargs').argv;
var plumber     = require('gulp-plumber');
var runSequence = require('run-sequence');

var path        = require('path');
var rimraf      = require('rimraf');
var spawn       = require('child_process').spawn;
var chalk       = require('chalk');
var server      = require('gulp-express');
var mocha       = require('gulp-mocha');
var espower     = require('gulp-espower');

var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var connect     = require('gulp-connect');
var proxy       = require('proxy-middleware');
var url         = require('url');
var stubcell    = require('gulp-stubcell');
var fs          = require('fs');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var babelify    = require('babelify');
var concat      = require('gulp-concat');


// server
var service = null;


// paths
var docroot = __dirname + '/dist';
var scriptsPaths = './app/scripts/**/*.js';
var serverScripts = [
  './app/scripts/server.js',
  './app/scripts/routes.js',
  './app/scripts/server/**/*.js'
];
var staticPaths = 'app/static/**/*';
var specPath = 'specs/**/*.js';
var poweredPath = 'powered/**/*.js';
var poweredDest = 'powered/';


// tasks
gulp.task('power-assert', function(){
  return gulp.src(specPath)
    .pipe(babel())
    .pipe(espower())
    .pipe(gulp.dest(poweredDest));
});

gulp.task('test', ['build', 'power-assert'], function(){
  return gulp.src(poweredPath)
    .pipe(mocha({
      reporter: 'nyan'
    }));
});


gulp.task('clean', function(cb){
  rimraf(docroot, cb);
});

var browserifyConfig = {
  debug: true,
  extensions: ['.js', '.jsx']
};

gulp.task('scripts:browserify', function(){
  var entries = [
    'browser.js'
  ];
  entries.forEach(function(entry){
    browserify(browserifyConfig)
      .transform(babelify.configure({ compact: false }))
      .require('./app/scripts/' + entry, { entry: true })
      .bundle()
      .on('error', function(err){ console.log(chalk.red("Error : " + err.message)); })
      .pipe(source(entry))
      .pipe(gulp.dest('dist/scripts'));
  });
});

gulp.task('scripts:babel', function(){
  var files = [ scriptsPaths ];

  if(!args.server) {
    files.push('!./app/scripts/server/**/*');
  }

  return gulp.src(files)
    .pipe(babel())
    .pipe(gulp.dest('dist/scripts'));
})

gulp.task('scripts', ['scripts:babel', 'scripts:browserify']);

gulp.task('static', function() {
  var index = gulp.src('./app/template/index.html')
    .pipe(gulp.dest('dist/static'));

  var others = gulp.src(staticPaths)
    .pipe(gulp.dest('dist/static'));

  return mergeStream(index, others);
});

gulp.task('server', function(cb){
  gulp.watch(scriptsPaths, function(){
    gulp.run('scripts');
    startServer(cb);
  });
  gulp.watch('app/static/**/*', function(){
    gulp.run('static');
    startServer(cb);
  });

  startServer(cb);
});

gulp.task('server:front', ['build'], function(){
  gulp.watch(scriptsPaths, ['scripts']);
  gulp.watch('app/template/index.html', ['static']);

  stubcell.start({
    entry: 'app/apimock/entry.yml',
    port: 3002
  });

  connect.server({
    port: 3000,
    root: './dist/',
    middleware: function(connect) {
      var mock = connect();
      var browserJS = '/scripts/browser.js';

      return [
        mock.use('/api', proxy(url.parse('http://localhost:3002/api'))),
        mock.use(browserJS, function(req, res){
          res.setHeader('Content-Type', 'application/javascript');
          fs.readFile(__dirname + '/dist' + browserJS, function(err, data){
            if(err) throw err;
            res.end(data);
          });
        }),
        mock.use('/', function(req, res, next) {
          var React  = require('react');
          var Router = require('react-router');
          var routes = require('./dist/scripts/routes');

          res.setHeader('Content-Type', 'text/html');
          Router.run(routes, req.url, function(Handler){
            res.end(
              React.renderToString(
                React.createElement(Handler, { path: req.url })
              )
            );
          });
        })
      ];
    }
  });
});

gulp.task('build', function(cb){
  runSequence('clean', ['static', 'scripts'], cb);
});

gulp.task('default', function(){
  if(args.server) {
    gulp.run('server')
  }
  else {
    gulp.run('server:front')
  }
});


function startServer(){
  if(service) {
    service.kill('SIGKILL');
    service = undefined;
    process.removeListener('exit', onProcessExit);
  }
  service = spawn('node', ['dist/scripts/server.js']);
  service.stdout.setEncoding('utf8');
  service.stderr.setEncoding('utf8');
  service.stdout.on('data', log);
  service.stderr.on('data', log);
  service.on('exit', function(code, sig){
    console.log(chalk.blue('Service process exited with code', code, sig));
  });
  process.on('exit', onProcessExit);

  function log(data){
    console.log(data.trim());
  }

  function onProcessExit(){
    service.kill();
  }
}

function bsMiddleware(req, res, next) {
  var React  = require('react');
  var Router = require('react-router');
  var routes = require('./dist/scripts/routes');

  if(req.url === '/scripts/bundle.js') {
    res.setHeader('Content-Type', 'application/javascript');
    next();
  }
  else if(req.url.indexOf('/api') !== -1) {
    proxy(url.parse('http://localhost:3002/'))(req, res, next);
  }
  else {
    res.setHeader('Content-Type', 'text/html');
    Router.run(routes, req.url, function(Handler){
      res.end(
        React.renderToString(
          React.createElement(Handler, { path: req.url })
        )
      );
      next();
    });
  }
}

