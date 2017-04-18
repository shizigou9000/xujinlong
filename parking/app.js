var repl = require('repl');
var path = require('path');
var config = require('./config.json');
var system = require('./class/system');
var character = require('./class/character');
var currentDir = __dirname;
var symbol = '>';
var replServer = repl.start({prompt: symbol, eval: init});
function init(cmd) {
  cmd = cmd.replace('\n', '');
  var dataFile = path.join(currentDir, config.dataName);
  var systemObj = new system(dataFile, config);
  if (cmd == 'add') {
    var characterObj = new character(systemObj.characterList, config);
    systemObj.characterList = (characterObj.addRole('manager', 2));
    systemObj.saveData();
  }
  replServer.displayPrompt();
}
