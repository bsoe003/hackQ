module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            script: {
                src: ['dev/*.js'],
                dest: 'public/script.js'
            },
            libraries: {
                src: ['dev/libraries/*.js'],
                dest: 'public/libraries.js'
            },
            css: {
                src: ['dev/*.css'],
                dest: 'public/style.css'
            }
        },
        react: {
            reaction: {
                files: [
                    {
                        expand: true,
                        cwd: 'dev',
                        src: ['*.jsx'],
                        dest: 'dev',
                        ext: '.jsx.js'
                    }
                ]
            }
        },
        sass: {
            compile: {
                files: [{
                    expand: true,
                    cwd: 'dev',
                    src: ['queue.scss'],
                    dest: 'dev',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            minify: {
                files: {
                    'public/style.min.css': ['dev/*.css', '!dev/*.min.css']
                }
            }
        },
        uglify: {
            options: {
                mangle: {
                    except: ['jQuery', 'React', 'Firebase']
                }
            },
            libraries: {
                files: {
                    'public/libraries.min.js': ['dev/libraries/*.js']
                }
            },
            script: {
                files: {
                    'public/script.min.js': ['dev/*.js']
                }
            }
        },
        clean: ['dev/*.jsx.js', 'dev/*.css', 'dev/*.map', '.sass-cache'],
        watch: {
            script: {
                files: ['dev/*.jsx', 'dev/*.js'],
                tasks: ['react', 'uglify:script', 'clean']
            },
            libraries: {
                files: ['dev/libraries/*.js'],
                tasks: ['uglify:libraries', 'clean']
            },
            scss: {
                files: ['dev/main.scss'],
                tasks: ['sass', 'cssmin', 'clean']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-react');
    grunt.registerTask('dev', ['react', 'sass', 'concat', 'clean', 'watch']);
    grunt.registerTask('minify', ['react', 'sass', 'cssmin', 'uglify', 'clean']);
    grunt.registerTask('default', ['minify']);
}
