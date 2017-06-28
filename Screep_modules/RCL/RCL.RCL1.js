// JavaScript source code
class RCLMemoryManage {
    run(rm) {
        //Declare memory
        if(Memory.rooms[rm] == null)
            Memory.rooms[rm] = {}
        if(Memory.rooms[rm].build == null)
            Memory.rooms[rm].build = {}
        Memory.rooms[rm].build.policy = {
            extension: 1,
            container: 0,
        }
        if(Memory.rooms[rm].spawn == null)
            Memory.rooms[rm].spawn = {}
        Memory.rooms[rm].spawn.worker = {
            chance: 1,
            max: 10,
        }
        //Worker ratios
        if(Memory.rooms[rm].worker == null)
            Memory.rooms[rm].worker = {}
        Memory.rooms[rm].worker.policy = {
            construct: 0.2,
            upgrade: 0.5,
            harvest: 0.2,
            repair: 0.1,
        };
    }
}
module.exports = new RCLMemoryManage();