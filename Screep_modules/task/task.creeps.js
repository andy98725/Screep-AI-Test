const roles = {
    harvester: require('role.harvester.js'),
    worker: require('role.worker.js'),
};

class CreepManagement {
    run() {
        _.forEach(Game.creeps, creep => {
            try {
                roles[creep.memory.role].run(creep);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
module.exports = new CreepManagement