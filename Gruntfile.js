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
    }

  };

  grunt.initConfig(gruntConfig);

  grunt.registerTask('default', ['jshint', 'connect']);


};