var gulp = require('gulp');
var path = require('path');
var browserify = require('browserify');
var babelify = require('babelify');
var envify = require('envify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var merge = require('merge-stream');
var nodemon = require('gulp-nodemon');
var order = require('gulp-order');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var stylus = require('gulp-stylus');
var streamify = require('gulp-streamify');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var spawn = require('child_process').spawn;
var config = require('./config');

const PRODUCTION = 0;
const STATIC = 'static/dist';
const VENDOR_DEPS = [
  'react',
  'react-dom',
  'react-router',
  'superagent'
];

///// STYLESHEETS /////

gulp.task('stylus', function() {
  var styls = ['splash', 'main'].map(function(s) {
    return gulp.src('stylesheets/stylus/' + s + '.styl')
      .pipe(stylus())
      .pipe(rename(s + '.css'))
      .pipe(gulp.dest('stylesheets'));
  });
  return merge(styls);
});

gulp.task('css', function() {
  var css = ['splash', 'main'].map(function(c) {
    return gulp.src('stylesheets/' + c + '.css')
      .pipe(autoprefixer({
        browsers: ['last 2 version'],
        cascade: false
      }))
      .pipe(gulp.dest(STATIC))
      .pipe(cssmin())
      .pipe(rename({
        extname: '.min.css'
      }))
      .pipe(gulp.dest(STATIC));
  });
  return merge(css);
});

gulp.task('fonts', function() {
  return gulp.src('bower_components/Ionicons/fonts/*')
    .pipe(gulp.dest('static/fonts'));
});

gulp.task('deps.css', ['fonts'], function() {
  return gulp.src([
    'bower_components/normalize-css/normalize.css',
    'bower_components/Ionicons/css/ionicons.css'
  ]).pipe(concat('deps.css'))
    .pipe(gulp.dest(STATIC))
    .pipe(cssmin())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(STATIC));
});

gulp.task('stylesheets', ['deps.css', 'stylus', 'css']);


///// SCRIPTS /////

gulp.task('deps.js', function() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js'
  ]).pipe(concat('deps.js'))
    .pipe(gulp.dest(STATIC))
    .pipe(uglify({ mangle: true }))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(STATIC));
});

gulp.task('js', function() {
  return gulp.src('scripts/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest(STATIC))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(STATIC));
});

gulp.task('vendor', function() {
  var envs = ['development', 'production'];
  envs = envs.map(function(env) {
    var vendor = browserify({ debug: false })
      .require(VENDOR_DEPS)
      .transform(envify, {
        NODE_ENV: env
      })
      .bundle()
      .pipe(source('vendor.js'));
    if (env === 'production') {
      vendor = vendor.pipe(streamify(uglify({ mangle: true })))
      .pipe(rename({
        extname: '.min.js'
      }));
    }
    vendor = vendor.pipe(gulp.dest(STATIC));
    return vendor;
  });
  return merge(envs);
});

gulp.task('browserify', function() {
  var bundler = watchify(browserify('app/main.js', { debug: false }))
    .external(VENDOR_DEPS)
    .transform(babelify, {
      presets: ['es2015', 'react']
    })
    .transform(envify, config.all())
    .on('update', rebundle);
  return rebundle();

  function rebundle() {
    var start = Date.now();
    return bundler.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.toString()));
      })
      .on('end', function() {
        gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(STATIC))
      .pipe(streamify(uglify({ mangle: true })))
      .pipe(rename({
        extname: '.min.js'
      }))
      .pipe(gulp.dest(STATIC));
  }
});

gulp.task('server', function() {
  gulp.src('app.js')
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(rename('server.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('scripts', ['deps.js', 'js', 'vendor', 'browserify', 'server']);

///// WATCH && RUN /////

gulp.task('watch', function() {
  gulp.watch('stylesheets/stylus/*.*', ['stylus']);
  gulp.watch('stylesheets/**/*.css', ['css']);
  gulp.watch('scripts/**/*.js', ['js']);
  gulp.watch('app.js', ['server']);
});

gulp.task('start', ['stylesheets', 'scripts', 'watch'], function() {
  nodemon({
    script: 'server.js',
    ext: 'js html css',
    env: {
      NODE_ENV: !PRODUCTION ? 'development' : 'production'
    },
    ignore: ['stylesheets/', 'scripts/', 'app/', 'static/dist/*.min.*', 'app.js']
  });
});

gulp.task('default', function() {
  var process;
  var restart = function() {
    if (process) {
       process.kill();
    }
    process = spawn('gulp', ['start'], {
      stdio: 'inherit'
    });
  }

  gulp.watch('gulpfile.js', restart);
  restart();
});
