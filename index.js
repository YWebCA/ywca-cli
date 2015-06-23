#! /usr/bin/env node

var yeoman = require('yeoman-environment')
global.env = yeoman.createEnv()

var command = process.argv[2]
var target = process.argv[3]

env.register(__dirname + '/generators/app/index.js', 'ywca:app')

try {
  require('./tasks/' + command)(target)
} catch (e) {
  console.log("No task was found for command [" + command + "] and target [" + target + "]!")
}