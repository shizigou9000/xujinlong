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
  var parkingHabits=config.parkingHabits;

  self.addRole = addRole;
  self.parking=parking;

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
  function parking(carNumber,pmanagerName){
	  var parkInfo=_parkingForManager(pmanagerName);
	  return parkInfo;
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

  function _addBoy(num, managerId) {
    var maxId = 0;
    if (managerId) {
      maxId = _getMaxId('boy');
    }
    if (num > 0) {
      var parkingBoyList = [];
      for (var i = 1; i <= num; i++) {
        var boyId = maxId + 1;
        var parkingBoyInfo = {
          Id: boyId,
          Name: _createName('boy') + '_' + managerId + '_' + boyId,
		  ParkingHabits:_getParkingHabits(),
          ParkingLots: [
            {
              ParkingLot: _addParkingLot(3, managerId, boyId)
            }
          ]
        }
        parkingBoyList.push(parkingBoyInfo);
        maxId++;
      }
      return parkingBoyList;
    }
  }

  function _addParkingLot(num, managerId,boyId) {
    var maxId = 0;
    if (boyId) {
      maxId = _getMaxId('lot');
    }
    if (num > 0) {
      var parkingLotList = [];
      for (var i = 1; i <= num; i++) {
        var lotId = maxId + 1;
        var parkingLotInfo = {
          Name: _createName('lot') + '_'+managerId+'_' +boyId+'_'+lotId,
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
	var Range = max - min;
    var Rand = Math.random();
    var num = min + Math.round(Rand * Range);
    return num;
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
  function _getParkingHabits(){
	var parkingHabitsLen=parkingHabits.length;
	var index=_getRandomNumber(0,parkingHabitsLen-1);
	return parkingHabits[index].id;
  }
  function _parkingForManager(pmanagerName){
	var parkingInfo={
		managerName:pmanagerName
	}; 
	var managerInfo={};
	if(pmanagerName){
		characterList.ParkingCEO.ParkingManagers[0].ParkingManager.forEach(function(manager){
			if(manager.Name===pmanagerName){
				managerInfo=manager;
			}
		})
	}else{
		var ParkingManagerNumber=characterList.ParkingCEO.ParkingManagers[0].ParkingManager.length;
		var ParkingManagerIndex=_getRandomNumber(0,ParkingManagerNumber-1);
		var managerInfo=characterList.ParkingCEO.ParkingManagers[0].ParkingManager[ParkingManagerIndex];
	}
	if(managerInfo.Name!==''){
		var parkingBoyInfo=_parkingForBoy(managerInfo);
		parkingInfo.managerName=managerInfo.Name;
		parkingInfo.boyName=parkingBoyInfo.boyName;
		parkingInfo.lotName=parkingBoyInfo.lotName;
	}
	return parkingInfo;
  }
  function _parkingForBoy(managerInfo){
	var parkingBoyInfo={};
	var ParkingBoyNumber=managerInfo.ParkingBoys[0].ParkingBoy.length;
	var ParkingBoyIndex=_getRandomNumber(0,ParkingBoyNumber-1);
	var BoyInfo=managerInfo.ParkingBoys[0].ParkingBoy[ParkingBoyIndex];
	parkingBoyInfo.boyName=BoyInfo.Name;
	parkingBoyInfo.lotName=_parkingLot(BoyInfo);
	return parkingBoyInfo;
  }

  function _parkingLot(BoyInfo){
	var ParkingLots=BoyInfo.ParkingLots[0].ParkingLot;
	var ParkingHabits=BoyInfo.ParkingHabits;
	var ParkingLotName='';
	ParkingLots.forEach(function(lot){
	  lot.pRate=parseInt(lot.Count/lot.Capacity*100);
	});
	  if(ParkingHabits==1){
		  ParkingLots=_sort(ParkingLots,'Count','desc');
	  }else if(ParkingHabits==2){
		ParkingLots=_sort(ParkingLots,'pRate','asc');
	  }else if(ParkingHabits==3){
		ParkingLots=_sort(ParkingLots,'Capacity','desc');
	  }
	  ParkingLots.forEach(function(lots){
		if(lots.Count<lots.Capacity){
			ParkingLotName=lots.Name;
		}
	  })
	  return ParkingLotName;
  }
  function _sort(ParkingLots,orderBy,sortBy){
	  return ParkingLots.sort(function(a,b){
		  if(sortBy==='desc'){
			return b[orderBy]-a[orderBy];
		  }else if(sortBy==='asc'){
			return a[orderBy]-b[orderBy];
		  }
            
	  });
  }
}
module.exports = character;
