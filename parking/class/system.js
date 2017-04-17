var fs = require('fs');
var parseString = require('xml2js').parseString;
var system = {}
system.promptMessage = {
  'message': 'test'
};
system.printReport = function (ceoId, managerId, boyId) {

}
system.getCharacterList = function (path) {
  if (fs.existsSync(path)) {
    fs.readFile(path, function (error, file) {
      if (!error) {
        parseString(file, function (err, result) {
          if (!err) {
            _formatCharacterList(result);
          }
        })
      }
    })
  }
}
system.saveData = function (content, path) {
  fs.writeFile(path, content);
}
function _formatCharacterList(result) {
  var ParkingCEOList = result.ParkingCEO;
  ParkingCEOList.ParkingManagers.ParkingManager;
  console.log(ParkingCEOList.ParkingManagers[0].ParkingManager);
}
list = [
  {
    name: ''
    ParkingManagers: [
      {
        name: '',
        ParkingBoys: [
          {
            name: ''
            ParkingLots: [
              {
                Name: ''
                Count: ''
                Capacity: ''
              }
            ]
          }
        ]
      }
    ]
  }
]
module.exports = system;
