#! /usr/bin/env node

var command = process.argv[2]
var target = process.argv[3]

try {
  require('./tasks/' + command)(target)
} catch (e) {
  console.log("No task was found for command [" + command + "] and target [" + target + "]!")
}