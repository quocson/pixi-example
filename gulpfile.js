var gulp = require("gulp"),
    tsc = require("gulp-typescript"),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify"),
    rev         = require('gulp-rev'),
    zip = require('gulp-zip'),
    revReplace  = require("gulp-rev-replace"),
    clean = require('gulp-clean'),
    http = require('http'),
    st = require('st');
var fs = require('fs');

var json = JSON.parse(fs.readFileSync('./package.json'));

var tsProject = tsc.createProject("tsconfig.json");
var outputFolder = "build/";
var distFolder = "dist";

gulp.task("default", function () {
    return tsProject.src().pipe(tsProject())
    .js.pipe(gulp.dest(outputFolder));
});

gulp.task('server', function(done) {
    http.createServer(
      st({ path: __dirname + '/build', index: 'index.html', cache: false })
    ).listen(8888, done);
});
gulp.task("run", ['default','server'],function(){
    gulp.watch(["script/**/**.ts"], ["default"]);
}),
gulp.task('compile', function () {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./')) // Now the sourcemaps are added to the .js file 
        .pipe(gulp.dest(outputFolder));
});

gulp.task("watch", ["default"], function () {    
    gulp.watch(["script/**/**.ts"], ["default"]);
});

gulp.task("clean", function () {
    return gulp.src('dist/**/*.*', { read: false })
        .pipe(clean());
});
gulp.task("revision", ["compile", "copy-config",  "copy-styles"], function () {
    return gulp.src(["build/**/default.css", "build/**/*.min.js", "build/script.js"])
        .pipe(rev())
        .pipe(gulp.dest(distFolder))
        .pipe(rev.manifest())
        .pipe(gulp.dest(distFolder));
});

gulp.task("revreplace", ["revision"], function () {
    var manifest = gulp.src("./dist/rev-manifest.json");

    return gulp.src("build/index.html")
        .pipe(revReplace({ manifest: manifest }))
        .pipe(gulp.dest(distFolder));
});

gulp.task("copy-assets", ["clean"], function () {
    return gulp.src("build/asset/**/*.*")
        .pipe(gulp.dest(distFolder + "/asset"));
});
gulp.task("copy-styles", ["clean"], function () {
    return gulp.src("build/css/**/*.css")
        .pipe(gulp.dest(distFolder + "/css"));
});
gulp.task("copy-config", ["clean"], function () {
    return gulp.src("build/cfg/**/*.json")
        .pipe(gulp.dest(distFolder + "/cfg"));
});

gulp.task("deploy", ["copy-assets", "revreplace"], function () {
    return gulp.src("./dist/**").pipe(zip(json.name + '-' + json.version + '.zip'))
        .pipe(gulp.dest('release'));
});

gulp.task("deploy-non-asset", ["revreplace"], function () {
    return gulp.src(["./dist/**", "!./dist/rev-manifest.json"])
        .pipe(zip(json.name + '-' + json.version + '.zip'))
        .pipe(gulp.dest('release'));
});
