var concerns = require('./cfg/concerns.json')
var types = require('./cfg/types.json')

module.exports = function(target) {
  response += "If this was working, we would have just searched npm for "
  for (concern of concerns)
    for (type of types)
      response += "ywca-" + concern + "-" + type + "-" + target + ", "
  response = response.substr(0, response.length - 2)
  response = response.substr(0, response.lastIndexOf(",") + 1) + " and" + response.substr(response.lastIndexOf(",") + 1) + "."
  console.log(response)
}