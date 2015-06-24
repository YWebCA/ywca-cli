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
  try {
    return fs.readdirSync(srcpath).filter(function(file) {
      return fs.statSync(path.join(srcpath, file)).isDirectory()
    });
  } catch (e) {
    return []
  }
}

env.register(__dirname + '/generators/app/index.js', 'ywca:app')
var modules = getDirectories(process.cwd() + '/node_modules/')
for (index in modules) {
  if (modules[index].indexOf('ywca-') === 0) {
    var module = process.cwd() + "/node_modules/" + modules[index] + '/generators/app/index.js'
    env.register(module, modules[index].replace('-', ':'))
  }
}


require('./tasks/' + command)(target)
try {
} catch (e) {
  console.log("No task was found for command [" + command + "] and target [" + target + "]!")
}