// JavaScript source code
class ManageSpawns{
    run() {
        for (var sp in Game.spawns) {
            var spawn = Game.spawns[sp];
            this.spawnUnits(spawn);
            this.makeConstructions(spawn.room);
        }
    }

    spawnUnits(spawn) { //Spawns needed units
        if(_(Game.creeps).size() < 
        (Memory.rooms[spawn.room].spawn.map(function (element) { return element.chance })).reduce(
        function (a, b) { return a + b;})) {
            console.log("It works");
        }


    }
    makeConstructions(rm) { //Generates needed construction sites

    }
}
module.exports = new ManageSpawns();