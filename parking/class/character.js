function character(characterList, config) {
  var self = this;

  var ceoId = 1;//因为系统默认只有一个CEO,现将CEOId默认赋值为1
  var isAddChildCharacter = true;//是否默认自动下级角色
  var roles = {
    ceo: 'ceo',
    manager: 'manager',
    boy: 'boy',
    lot: 'lot'
  }
  var pManager2pBoy = config.pManager2pBoy;
  var ParkingLot = config.ParkingLot;

  self.addRole = addRole;

  function addRole(role, num, parentId) {
    if (role === roles.ceo) {
      console.log('系统默认支持一个CEO,暂不支持！')
    } else if (role === roles.manager) {
      parentId = ceoId;
      _addManager(num, parentId);
    } else if (role === roles.boy) {

    }
    return characterList;
  }

  function _addManager(num, parentId) {
    if (num > 0) {
      if (!characterList.ParkingCEO.ParkingManagers) {
        characterList.ParkingCEO.ParkingManagers = [{
          ParkingManager: []
        }]
      }
      var maxId = _getMaxId('manager');
      for (var i = 1; i <= num; i++) {
        var managerId = maxId + 1;
        var parkingManagerList = {
          Id: managerId,
          Name: _createName('manager') + '_' + managerId
        }
        if (isAddChildCharacter) {
          parkingManagerList.ParkingBoys = [
            {
              ParkingBoy: _addBoy(pManager2pBoy, managerId)
            }
          ];
        }
        characterList.ParkingCEO.ParkingManagers[0].ParkingManager.push(parkingManagerList);
        maxId++;
      }
    }
  }

  function _addBoy(num, parentId) {
    var maxId = 0;
    if (parentId) {
      maxId = _getMaxId('boy');
    }
    if (num > 0) {
      var parkingBoyList = [];
      for (var i = 1; i <= num; i++) {
        var boyId = maxId + 1;
        var parkingBoyInfo = {
          Id: boyId,
          Name: _createName('boy') + '_' + parentId + '_' + boyId,
          ParkingLots: [
            {
              ParkingLot: _addParkingLot(3, boyId)
            }
          ]
        }
        parkingBoyList.push(parkingBoyInfo);
        maxId++;
      }
      return parkingBoyList;
    }
  }

  function _addParkingLot(num, boyId) {
    var maxId = 0;
    if (boyId) {
      maxId = _getMaxId('lot');
    }
    if (num > 0) {
      var parkingLotList = [];
      for (var i = 1; i <= num; i++) {
        var lotId = maxId + 1;
        var parkingLotInfo = {
          Name: _createName('lot') + boyId,
          Count: 0,
          Capacity: _getRandomNumber(parseInt(ParkingLot.min), parseInt(ParkingLot.max))
      }
        parkingLotList.push(parkingLotInfo);
        maxId++;
      }
      return parkingLotList;
    }
  }

  function _createName(role) {
    var timeString = new Date().getTime();
    return role + timeString;
  }

  function _getMaxId(role) {
    var maxId = 0;
    if (role === roles.manager) {
      if (characterList.ParkingCEO && characterList.ParkingCEO.ParkingManagers[0].ParkingManager) {
        maxId = _getMaxManagerId();
      } else {
        maxId = 0;
      }
    } else if (role === roles.boy) {
      return 0;
    } else if (role === roles.lot) {
      return 0;
    }
    return maxId;
  }

  function _getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function _getMaxManagerId() {
    var id = 0;
    characterList.ParkingCEO.ParkingManagers[0].ParkingManager.forEach(function (manager) {
      id = parseInt(manager.Id[0]) > id ? parseInt(manager.Id[0]) : id;
    })
    return id
  }

  function _getMaxBoyId() {

  }
}
module.exports = character;
