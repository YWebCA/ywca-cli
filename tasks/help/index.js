module.exports = function(target) {
  if (tasks[target])
    console.log(tasks[target].help)
  else
    console.log("No help documentation exists for " + target + ".")
}