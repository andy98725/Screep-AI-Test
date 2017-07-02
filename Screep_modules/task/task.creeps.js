const roles = {
    worker: require('role.worker'),
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
module.exports = new CreepManagement();