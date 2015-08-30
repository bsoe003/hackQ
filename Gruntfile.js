module.exports = function(grunt) {
    grunt.initConfig({
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
                    src: ['main.scss'],
                    dest: 'dev',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            target: {
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
            jsx: {
                files: ['dev/*.jsx'],
                tasks: ['react', 'uglify:script', 'clean']
            },
            libraries: {
                files: ['dev/libraries/*.js'],
                tasks: ['uglify:libraries', 'clean']
            },
            script: {
                files: ['dev/*.js'],
                tasks: ['uglify:script', 'clean']
            },
            scss: {
                files: ['dev/main.scss'],
                tasks: ['sass', 'cssmin', 'clean']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-react');
    grunt.registerTask('default', ['react', 'sass', 'cssmin', 'uglify', 'clean']);
}