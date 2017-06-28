var path = 'RCL.RCL';
const RCL = [require(path + '0'), require(path + '1'), require(path + '2'), require(path + '3'), require(path + '4'), require(path + '5'), require(path + '6'), require(path + '7'), require(path + '8')];

class SpawnerManage {
    run() {
        //Initialize room data
        if (Memory.rooms == null) {
            Memory.rooms = {};
        }
        //Set room data for owned rooms
        _.forEach(Game.spawns, spawn => RCL[spawn.room.controller.level].run(spawn);
    }
}
module.exports = new SpawnerManage();