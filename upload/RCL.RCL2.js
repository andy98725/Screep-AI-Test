// JavaScript source code
class RCLMemoryManage {
    run(rm) {
        //Declare memory
        if(Memory.rooms[rm] == null)
            Memory.rooms[rm] = {}
        if(Memory.rooms[rm].build == null)
            Memory.rooms[rm].build = {}
        Memory.rooms[rm].build.policy = {
            extension: 5,
            WallHP: 100,
        }
        if(Memory.rooms[rm].spawn == null)
            Memory.rooms[rm].spawn = {}
        Memory.rooms[rm].spawn.worker = {
            max: 20,
            chance: 1,
            role: 'worker',
            body: [WORK,CARRY,MOVE,MOVE,CARRY,MOVE,WORK,MOVE]
        }
        //Worker ratios
        if(Memory.rooms[rm].worker == null)
            Memory.rooms[rm].worker = {}
        Memory.rooms[rm].worker.policy = {
            construct: 0.5,
            upgrade: .2,
            transfer: 1,
            repair: 0.1,
            fortify: 0.1,
        };
    }
}
module.exports = new RCLMemoryManage();