# Sample Bubbles Chart

generate one bubbles chart (highcharts) with the words parsed in a text

## Project Organization

By Erko Bridee


Move codes to `/app` directory


**Require:**

* [Node.js](http://nodejs.org/) >= 0.8.0

* [Grunt.js](http://gruntjs.com/)

	`sudo npm install -g grunt-cli` 


**Created:** 

* README.md 

  `touch README.md`

* package.json

  `npm init`

* Gruntfile.js

```
touch Gruntfile.js

npm install \
  matchdep \
  grunt \
  grunt-contrib-jshint \
  grunt-contrib-connect \
  --save-dev  
```  


**Added:**

* Grunt.js to project

* gh-page, updated by grunt-build-gh-pages

### Commands

* `grunt` - jshint project and start local server, looking /app directory

  `http://localhost:9001`


### Cloned from GitHub

Execute command: `npm install`


## MIT License

Copyright (C) 2013 Janderson F. Cardoso

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.