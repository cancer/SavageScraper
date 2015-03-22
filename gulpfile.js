// modules
var gulp        = require('gulp');
var babel       = require('gulp-babel');
var mergeStream = require('merge-stream');

var path        = require('path');
var del         = require('del');
var spawn       = require('child_process').spawn;
var chalk       = require('chalk');
var server      = require('gulp-express');
var mocha       = require('gulp-mocha');
var espower     = require('gulp-espower');

var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var stubcell    = require('gulp-stubcell');
var fs          = require('fs');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var babelify    = require('babelify');
var concat      = require('gulp-concat');


// server
var service = null;


// paths
var docroot = path.resolve(__dirname, '/dist');
var scriptsPaths = {
  server: ['./app/server/**/*.js'],
  front:  ['./app/front/scripts/**/*.js']
};
var staticPaths = ['app/static/**/*'];
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
  del(docroot, { force: true }, cb)
})

gulp.task('scripts:server', function() {
  return gulp.src(scriptsPaths.server)
    .pipe(babel())
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('scripts:front', function(){
  browserify({
    debug: true,
    extensions: ['.js', '.jsx']
  })
    .transform(babelify.configure({
      compact: false
    }))
    .require('./app/front/scripts/app.js', { entry: true })
    .bundle()
    .on('error', function(err){ console.log(chalk.red("Error : " + err.message)); })
    .pipe(source('app.js'))
    .pipe(gulp.dest('dist/htdocs/scripts'));
});

gulp.task('static', function() {
  var index = gulp.src('./app/front/index.html')
    .pipe(gulp.dest('dist/htdocs'));

  var others = gulp.src(staticPaths)
    .pipe(gulp.dest('dist/htdocs/static'));

  return mergeStream(index, others);
});

gulp.task('css:vendor', function(){
  return gulp.src([
    './app/vendor/bootstrap/dist/css/bootstrap.min.css'
  ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('dist/htdocs/styles'))
});

gulp.task('server', function(cb){
  gulp.watch(scriptsPaths.server, function(){
    gulp.run('scripts:server');
    startServer(cb);
  });
  gulp.watch(scriptsPaths.front, function(){
    gulp.run('scripts:front');
    startServer(cb);
  });
  gulp.watch('app/static/**/*', function(){
    gulp.run('static');
    startServer(cb);
  });

  startServer(cb);
});

gulp.task('server:front', function(){
  gulp.watch(scriptsPaths.front, ['scripts:front', reload]);
  gulp.watch('app/front/index.html', ['static', reload]);

  browserSync({
    open: false,
    server: {
      baseDir: './dist/htdocs/',
      directory: true
    }
  });

  stubcell.start({
    entry: 'app/apimock/entry.yml',
    port: 3002
  });
});

gulp.task('build', [
  'clean',
  'scripts:server',
  'scripts:front',
  'css:vendor',
  'static',
  'static'
]);

gulp.task('build:server', [
  'clean',
  'scripts:server',
  'static'
]);

gulp.task('build:front', [
  'clean',
  'scripts:front',
  'css:vendor',
  'static'
]);

gulp.task('front',   ['build', 'server:front']);
gulp.task('default', ['build', 'server']);


function startServer(){
  if(service) {
    service.kill('SIGKILL');
    service = undefined;
    process.removeListener('exit', onProcessExit);
  }
  service = spawn('node', ['dist/scripts/app.js']);
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

