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
  var characterObj = new character(systemObj.characterList, config);
  if (cmd == 'add') {
    systemObj.characterList = (characterObj.addRole('manager', 2));
    systemObj.saveData();
  }else if(cmd=='parking'){
	var carNumber='123456';
	var parkingInfo=characterObj.parking(carNumber);
	console.log(parkingInfo);
  }
  replServer.displayPrompt();
}
