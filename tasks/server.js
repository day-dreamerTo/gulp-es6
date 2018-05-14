import gulp from 'gulp';
import gulpif from 'gulp-if';
// 重启服务
import liveserver from 'gulp-live-server';
import args from './utils/args';

gulp.task('serve', (cb) => {
    console.log(args)
    if(!args.watch) return cb();
    // --harmony 指在当前命令行下执行后面的脚本server/bin/www
    var server = liveserver.new(['--harmony', 'server/bin/www'])
    server.start();
    // 浏览器刷新
    gulp.watch(['server/public/**/*.js', 'server/views/**/*.ejs'], function(file) {
      server.notify.apply(server, [file]);
    });
    // 重启服务
    gulp.watch(['server/routes/**/*.js', 'server/app.js'], function() {
        server.start.bind(server)()
    });
})