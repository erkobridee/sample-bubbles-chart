module.exports = function(grunt) {  
  'use strict';

  // load all grunt tasks -> see package.json :: devDependencies
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  //---

  var gruntConfig = {
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: [
        'Gruntfile.js',
        'app/js/**/*.js'
      ]
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: 'app',
          keepalive: true
        }
      }
    },

    clean: {
      build: ['dist/']
    },

    copy: {
      build: {
        files: [
          {expand: true, cwd: 'app/', src: ['**'], dest: 'dist/'}
        ]
      }
    },

    build_gh_pages: {
      gh_pages: {
        
      }
    }    

  };

  grunt.initConfig(gruntConfig);

  grunt.registerTask('default', ['jshint', 'connect']);

  grunt.registerTask('build', ['jshint', 'clean', 'copy']);


};