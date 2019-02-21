const webpackConfig = require('./webpack.config.js');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require('./aws-credentials.json');

module.exports = function(grunt) {
    grunt.initConfig({
        webpack: {
            options: {
                stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            },
            prod: webpackConfig,
            dev: Object.assign({ watch: false }, webpackConfig)
        },
        cssmin: {
            target: {
                src:  './client/src',
                dest: ''
            }
        },
        s3: {
            options: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY,
                bucket: 'suggestions-module',
                region: 'us-west-1',
                headers: {
                    'Cache-Control': 'max-age=630720000, public',
                    'Expires': new Date(Date.now() + 63072000000).toUTCString()
                },
            },
            build:  {
                cwd: './client/dist',
                src: '**'
            }
        }
    });
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-aws');
    grunt.registerTask('default', ['webpack', 's3']);
}