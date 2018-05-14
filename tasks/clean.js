import gulp from 'gulp';
import del from 'del';
import args from './utils/args';

gulp.task('clean', () => {
    return del(['server/public', 'server/views']);
})