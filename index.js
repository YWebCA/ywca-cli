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
  new: function(target) {
    console.log(response + "generated a workspace in directory " + target + ".")
  },
  install: function(target) {
    console.log(response + "installed the module ywca-xxxx-xxxx-" + target + ".")
  },
  search: function(target) {
    response += "searched npm for "
    for (concern of concerns)
      for (type of types)
        response += "ywca-" + concern + "-" + type + "-" + target + ", "
    response = response.substr(0, response.length - 2)
    response = response.substr(0, response.lastIndexOf(",") + 1) + " and" + response.substr(response.lastIndexOf(",") + 1) + "."
    console.log(response)
  }
}

if (tasks[command])
  tasks[command](target)
else 
	console.log("No task was found for command [" + command + "] and target [" + target + "]!")
