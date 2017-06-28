// JavaScript source code
class RCLMemoryManage {
    run(rm) {
        Memory.rooms[rm].build.policy = {
            extension: 1,
            container: 0,
        }
        Memory.rooms[rm].spawn.worker = {
            chance: 1,
            max: 10,
        }
        //Worker ratios
        Memory.rooms[rm].worker.policy = {
            construct: 0.2,
            upgrade: 0.5,
            harvest: 0.2,
            repair: 0.1,
        };
    }
}
module.exports = new RCLMemoryManage();