var path = 'RCL.RCL';
const RCL = [require(path + '0.js'), require(path + '1.js'), require(path + '2.js'), require(path + '3.js'), require(path + '4.js'), require(path + '5.js'), require(path + '6.js'), require(path + '7.js'), require(path + '8.js')];

class SpawnerManage {
    run() {
        //Initialize room data
        if (Memory.rooms == null) {
            Memory.rooms = {};
        }
        //Set room data for owned rooms
        _.forEach(Game.spawns, spawn => RCL[spawn.room.controller.level].run(spawn.room));
    }
}
module.export = new SpawnerManage();