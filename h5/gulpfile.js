/*
    ** 美疯啦前端自动化构建工具 
    ** author luliangshu(523994707@qq.com)
    ** 2015-06-03
    ** 对外暴露的命令
        gulp create 合并压缩mayfle所有基础文件
        gulp watch  启动web服务
        gulp build  -env 环境(dev:开发环境 test:测试环境 production:生产环境) -v 版本号(20150511-1)
        gulp deploy 部署到测试服务器
*/
var gulp          = require('gulp');
var fileinclude   = require('gulp-file-include');
var browserSync   = require('browser-sync');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var shell         = require('gulp-shell');
var using         = require('gulp-using');
var argv          = require('yargs').argv;
var replace       = require('gulp-replace');
var minifyHTML    = require('gulp-minify-html');
var clean         = require('gulp-clean');
var cheerio       = require('gulp-cheerio');
var order         = require('gulp-order');
var sftp          = require('gulp-sftp');
var colors        = require('colors');
var v,condition;

var env = {
    "production" : {
        "dir"                 : "./dist",
        "mayfleApi"           : "http://api.mayfle.com/v2/amiee/",
        "xiaodouApi"          : "http://api.mayfle.com/v2/finance/v2.0/",
        "H5BaseUrl"           : "http://h5.mayfle.com/"
    },
    "dev" : {
        "dir"                 : "./",
        "mayfleApi"           : "",
        "xiaodouApi"          : "",
        "H5BaseUrl"           : "",
        "webresourceBaseUrl"  : ""    
    },
    "test" : {
        "dir"                 : "./test",
        "mayfleApi"           : "http://192.168.253.107/api/amiee/",
        "xiaodouApi"          : "http://192.168.253.107/api/finance/v2.0/",
        "H5BaseUrl"           : "http://192.168.253.107/h5/"
    }
};


//  按依赖顺序压缩合并
gulp.task('create',function(){
    return gulp.src([
            './js/lib/underscore-min.js',
            './js/lib/zepto-min.js',
            './js/lib/backbone-min.js',
            './js/lib/frozen.js',
            './js/common/mayfle.js',
            './js/lib/require.js',
            './js/config/config.js'
        ])
        .pipe(order([
            "underscore-min.js",
            "zepto-min.js",
            "backbone-min.js",
            "frozen.js",
            "mayfle.js",
            "require.js",
            "config.js"
        ]))
        .pipe(concat('mayfle-min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(env.dev.dir + "js/base"));
});
//远程部署
gulp.task('deploy',function(){
    return gulp.src(['./test/*','./test/*/**'])
        .pipe(sftp({
            host: '192.168.253.107',
            user: 'mayfle',
            pass: 'mayfle',
            remotePath: '/home/mayfle/deployment/apps/amiee-h5/main'
        }));
});

// 启动web服务器
gulp.task('watch',['_compileHTML'],function(){
    browserSync({server: {
        baseDir: "./"
    } }, function(err, bs) {
        gulp.run("_watchResourse")
    });
});

// 构建到环境
gulp.task('build',['_clean'],function(){

    var arguments  = argv.v;
    var currentEnv = arguments[0];
    v              = arguments[1];

    condition = env[currentEnv];

    if(condition){
        return gulp.run(['_moveHTML','_moveCss','_moveFonts','_moveImage','_moveJS'],function(){
            console.log("=================================".green)
            console.log("========   build done   =========".green)
            console.log("=================================".green)
        });
    }else{
        console.log("========  构建失败，当前环境不存在  =========".red)
    }

});


//编译静态模板
gulp.task('_compileHTML',function(){
    gulp.src(['./templates/**/*','!./templates/partial','!./templates/partial/**'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('./webapp'));
});


// 监听资源变动
gulp.task('_watchResourse',function(){
    gulp.watch(['css/**/*','js/**/*'],function(file){
        browserSync.reload();
    })

    gulp.watch(['templates/**/*'],function(){
        gulp.run('_compileHTML',function(){
            browserSync.reload();
        })
    })


});

gulp.task('_clean',function(){
    return gulp.src(['./dist','./test'],{read: false})
        .pipe(clean())
});

gulp.task('_moveHTML',function(){
    return gulp.src('./webapp/**/*')
        .pipe(cheerio(function ($, file) {
            $("meta[name=mayfleApi]").attr('content',condition['mayfleApi']);
            $("meta[name=xiaodouApi]").attr('content',condition['xiaodouApi']);
            $("meta[name=H5BaseUrl]").attr('content',condition['H5BaseUrl']);
            $("#mayfleBaseCss").attr('href', condition['H5BaseUrl'].substring(0,condition['H5BaseUrl'].length-1) + $("#mayfleBaseCss").attr('href') )
            $("#mayfleBaseJs").attr('src', condition['H5BaseUrl'].substring(0,condition['H5BaseUrl'].length-1) + $("#mayfleBaseJs").attr('src') )
        }))
        .pipe(using())
        .pipe(minifyHTML())
        .pipe(replace('mayfle-min.js','mayfle-min.js?v='+ v))
        .pipe(gulp.dest(condition['dir'] + "/webapp"));
});

gulp.task('_moveCss',function(){
    return gulp.src('./css/**/*')
        .pipe(using())
        .pipe(gulp.dest(condition['dir'] + '/css'))
});

gulp.task('_moveFonts',function(){
    return gulp.src('./fonts/**/*')
        .pipe(using())
        .pipe(gulp.dest(condition['dir'] + '/fonts'))
});

gulp.task('_moveImage',function(){
    return gulp.src('./img/**/*')
        .pipe(using())
        .pipe(gulp.dest(condition['dir'] + '/img'))
});

gulp.task('_moveJS',function(){
    return gulp.run('_addVersionToResource')
});

gulp.task('_cleanBuildDir',function(){
    gulp.src('./build')
        .pipe(clean())
});

gulp.task('_compileRequireJs',
    shell.task(['node js/lib/r.js -o js/config/build.js'])
);

gulp.task('_addVersionToResource',['_compileRequireJs'],function(){
    gulp.src(['./build/**/*'])
        .pipe(gulp.dest(condition['dir'] + '/js'));

    gulp.src(['./js/base/mayfle-min.js'])
        .pipe(uglify())
        .pipe(replace('Date.now()','"'+v+'"'))
        .pipe(gulp.dest(condition['dir'] + '/js/base'));
});
