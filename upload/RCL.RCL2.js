// JavaScript source code
class RCLMemoryManage {
    run(rm) {
        Memory.rooms[rm].build.policy = {
            extension: 1,
            container: 1,
        }
        Memory.rooms[rm].spawn.worker = {
            chance: 1,
            max: 20,
        }
        //Worker ratios
        Memory.rooms[rm].worker.policy = {
            construct: 0.5,
            upgrade: 0.2,
            harvest: 0.2,
            repair: 0.1,
        };
    }
}
module.export = RCLMemoryManage();