// JavaScript source code
class RCLMemoryManage {
    run(rm) {
        //Declare memory
        Memory.rooms[rm] = {}
        Memory.rooms[rm].build = {}
        Memory.rooms[rm].build.policy = {
            extension: 1,
            container: 0,
        }
        Memory.rooms[rm].spawn = {}
        Memory.rooms[rm].spawn.worker = {
            chance: 1,
            max: 20,
        }
        //Worker ratios
        Memory.rooms[rm].worker = {}
        Memory.rooms[rm].worker.policy = {
            construct: 0.5,
            upgrade: 0.2,
            harvest: 0.2,
            repair: 0.1,
        };
    }
}
module.exports = new RCLMemoryManage();