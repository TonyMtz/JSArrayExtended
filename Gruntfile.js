module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! JSArrayExtended :D */\n'
      },
      dist: {
        files: {
          'dist/JSArrayExtended.min.js': ['src/JSArrayExtended.js']
        }
      }
    },
    jshint: {
      files: ['src/*.js'],
      options: {
        globals: {
          console: true,
          module: true,
          document: true
        },
        jshintrc: '.jshintrc'
      }
    },
    watch: {
      js: {
        files: ['src/**/*.js', 'spec/**/*.spec.js'],
        tasks: ['test']
      }
    },
    jasmine_node: {
      options: {
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: 'spec',
        jUnit: {
          report: true,
          savePath : "./build/reports/jasmine/",
          useDotNotation: true,
          consolidate: true
        }
      },
      all: ['spec/']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jasmine-node');

  grunt.registerTask('test', ['jshint', 'jasmine_node']);
  grunt.registerTask('default', ['jshint', 'test', 'uglify']);
}
