var fs = require('fs')
module.exports = function(target) {
  fs.readFile('doc/' + target + '.md', function(err, data) {
  	if (err)
  		console.log("No help documentation exists for " + target + ".")
  	else
  		console.log(data)
  })
}