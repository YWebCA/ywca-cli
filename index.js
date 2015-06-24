#! /usr/bin/env node
var async = require('async')
var fs = require('fs')
var path = require('path')
var yeoman = require('yeoman-environment')
global.env = yeoman.createEnv()

var command = process.argv[2]
var target = process.argv[3]

var registers = []

function getDirectories(srcpath) {
  
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory()
  });
}

env.register(__dirname + '/generators/app/index.js', 'ywca:app')
for (module of getDirectories(process.cwd() + '/node_modules/')) {
  if (module.indexOf('ywca-') === 0) {
    env.register(process.cwd() + "/node_modules/" + module + '/generators/app/index.js', module.replace('-', ':'))
  }
}


require('./tasks/' + command)(target)
try {
} catch (e) {
  console.log("No task was found for command [" + command + "] and target [" + target + "]!")
}