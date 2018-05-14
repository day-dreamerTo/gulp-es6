import gulp from 'gulp';
import gulpif from 'gulp-if';
// 处理文件拼接
import concat from 'gulp-concat';
import webpack from 'webpack';
// gulp是基于流来处理
import gulpWebpack from 'webpack-stream';
// 文件重命名
import named from 'vinyl-named';
// 热更新
import livereload from 'gulp-livereload';
// 处理文件信息流
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
// 命令行输出
import {log, colors} from 'gulp-util';
import args from './utils/args';

gulp.task('scripts', () => {
    return gulp.src(['app/js/index.js'])
        .pipe(plumber({
            errorHandle: function() {

            }
        }))
        // 对文件重新命名
        .pipe(named()) // vinyl-named用来保持输入和输出的文件名相同, 否则会自动生成一个hash.
        // 使用webpack来编译es6
        .pipe(gulpWebpack({
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel-loader'
                }]
            }
        }), null, (err, stats) => {
            log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
                chunks: false
            }))
        })
        // 指定存放路径
        .pipe(gulp.dest('server/public/js'))
        // 创建压缩副本
        .pipe(rename({
            basename: 'cp',
            extname: '.min.js'
        }))
        .pipe(uglify({
            compress: {
                properties: false,
            },
            output: {
                'quote_keys': true
            }
        }))
        .pipe(gulp.dest('server/public/js'))
        // 自动刷新
        .pipe(gulpif(args.watch, livereload()))
})

