// JavaScript source code
class RCLMemoryManage {
    run(rm) {
        //Declare memory
        if(Memory.rooms[rm] == null)
            Memory.rooms[rm] = {}
        if(Memory.rooms[rm].build == null)
            Memory.rooms[rm].build = {}
        Memory.rooms[rm].build.policy = {
            extension: 0,
            WallHP: 1,
        }
        if(Memory.rooms[rm].spawn == null)
            Memory.rooms[rm].spawn = {}
        Memory.rooms[rm].spawn.worker = {
            max: 10,
            chance: 1,
            role: 'worker',
            body: [WORK,CARRY,MOVE,MOVE]
        }
        //Worker ratios
        if(Memory.rooms[rm].worker == null)
            Memory.rooms[rm].worker = {}
        Memory.rooms[rm].worker.policy = {
            construct: 0.2,
            upgrade: 0.2,
            transfer: 0.5,
            repair: 0.1,
            fortify: 0,
        };
    }
}
module.exports = new RCLMemoryManage();