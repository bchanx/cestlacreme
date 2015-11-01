var gulp = require('gulp');
var path = require('path');
var nodemon = require('gulp-nodemon');
var order = require('gulp-order');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var stylus = require('gulp-stylus');
var spawn = require('child_process').spawn;

gulp.task('stylus', function() {
  gulp.src('stylesheets/stylus/root.styl')
    .pipe(stylus())
    .pipe(rename('stylus.css'))
    .pipe(gulp.dest('stylesheets'));
});

gulp.task('stylesheets', ['stylus'], function() {
  gulp.src('stylesheets/**/*.css')
    .pipe(order([
      'lib/normalize.css',
      'lib/*.css',
      'stylus.css',
      '*.css'
    ]))
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('static/dist'))
    .pipe(cssmin())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('static/dist'));
});

gulp.task('scripts', function() {
  gulp.src('scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('static/dist'))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('static/dist'));
});

gulp.task('start', ['stylesheets', 'scripts'], function() {
  nodemon({
    script: 'app.js',
    ext: 'js html css',
    env: {
      NODE_ENV: 'development'
//      NODE_ENV: 'production'
    },
    ignore: ['stylesheets/', 'scripts/']
  });

  gulp.watch('stylesheets/**/*.*', ['stylesheets']);
  gulp.watch('scripts/**/*.*', ['scripts']);
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
