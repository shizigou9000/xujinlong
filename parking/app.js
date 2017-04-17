var repl = require('repl');
var fs = require('fs');
var parseString = require('xml2js').parseString;
var config = require('./config.json');
var system = require('./class/system');
var pceo = require('./class/pceo');
var currentDir=__dirname;//当前路径
var symbol='>';
var replServer=repl.start({prompt:symbol,eval: init});
function init(cmd){
	cmd=cmd.replace('\n','');
	pceo.addCeo('xjl');
	replServer.displayPrompt();
}
