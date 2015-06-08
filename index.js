var command = process.argv[2]
var target = process.argv[3]

var concerns = [
  "core",
  "extra"
]
var types = [
  "demo",
  "exercise",
  "doc"
]

var response = "If this was working, we would have just "

var tasks = {
  new: {
    runner: function(target) {
      console.log(response + "generated a workspace in directory " + target + ".")
    },
    help: "new"
  },
  install: {
    runner: function(target) {
      console.log(response + "installed the module ywca-xxxx-xxxx-" + target + ".")
    },
    help: "install"
  },
  search: {
    runner: function(target) {
      response += "searched npm for "
      for (concern of concerns)
        for (type of types)
          response += "ywca-" + concern + "-" + type + "-" + target + ", "
      response = response.substr(0, response.length - 2)
      response = response.substr(0, response.lastIndexOf(",") + 1) + " and" + response.substr(response.lastIndexOf(",") + 1) + "."
      console.log(response)
    },
    help: "search"
  },
  help: {
    runner: function(target) {
      if (tasks[target])
        console.log(tasks[target].help)
      else
        console.log("No help documentation exists for " + target + ".")
    },
    help: "help"
  }
}

if (tasks[command])
  tasks[command].runner(target)
else 
	console.log("No task was found for command [" + command + "] and target [" + target + "]!")
