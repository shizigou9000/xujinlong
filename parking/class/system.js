var fs = require('fs');
var xml2js = require('xml2js');
var xml2jsBuilder = new xml2js.Builder();
var parseString = xml2js.parseString;
function system(path, config) {
  var self = this;

  self.characterList = [];
  self.printReport = printReport;
  self.saveData = saveData;

  _init();

  function printReport(ceoId, managerId, boyId) {

  }

  function saveData() {
    var content=_characterList2XmlString();
    fs.writeFile(path, content);
  }

  function _characterList2XmlString() {
    var xmlString=xml2jsBuilder.buildObject(self.characterList);
    return xmlString;
  }

  function _formatCharacterList(result) {
    return result;
  }

  function _getCharacterList() {
    var xmlContent = fs.readFileSync(path);
    parseString(xmlContent, function (error, result) {
      if (!error) {
        self.characterList = _formatCharacterList(result);
      }
    })
  }

  function _init() {
    if (_isXmlFileDataExist()) {
      _getCharacterList();
    } else {
      _initCharacterList();
    }
  }

  function _initCharacterList() {
    self.characterList = {
      ParkingCEO: {
        Id: 1,
        Name: 'ParkingCEO'
      }
    };
    saveData();
  }

  function _isXmlFileDataExist() {
    return fs.existsSync(path);
  }
}
module.exports = system;
