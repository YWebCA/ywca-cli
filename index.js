var command = process.argv[2]
var target = process.argv[3]

var concerns = require('./cfg/concerns.json')
var types = require('./cfg/types.json')

var tasks = {
  new: {
    runner: require('./tasks/new')
  },
  install: {
    runner: require('./tasks/install')
  },
  search: {
    runner: require('./tasks/search')
  },
  help: {
    runner: require('./tasks/help')
  }
}

if (tasks[command])
  tasks[command].runner(target)
else 
	console.log("No task was found for command [" + command + "] and target [" + target + "]!")
