class GarbageCollection {

    run() {
        for (var creep in Memory.creeps) {
            if (!Game.creeps[creep])
                delete Memory.creep[creep];
        }
    }
}

module.exports = new GarbageCollection;