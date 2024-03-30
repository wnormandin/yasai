module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-string-replace");

    grunt.initConfig({
        screeps: {
            dist: {
                src: ['dist/*.js']
            }
        },

        // Remove all files from the dist folder.
        clean: {
            'dist': ['dist']
        },

        // Copy all source files into the dist folder, flattening the folder structure by converting path delimiters to underscores
        copy: {
            // Pushes the game code to the dist folder so it can be modified before being send to the screeps server.
            screeps: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**',
                    dest: 'dist/',
                    filter: 'isFile',
                    rename: function (dest, src) {
                        // Change the path name utilize underscores for folders
                        return dest + src.replace(/\//g,'_');
                    }
                }],
            }
        },

        'string-replace': {
            inline: {
                files: {
                    'dist/': 'dist/**'
                },
                options: {
                    replacements: [{
                        pattern: /\.?\.\//,
                        replacement: ''
                    },{
                        pattern: /\//ig,
                        replacement: '_'
                    }]
                }
            }
        }
    })
    grunt.registerTask('default', ['clean', 'copy:screeps', 'string-replace']);
}