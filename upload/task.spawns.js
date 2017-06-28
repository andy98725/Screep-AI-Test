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
        //If total creeps is under total amount needed
        if(_(Game.creeps).size() < 
        _(_(Memory.rooms[spawn.room.name].spawn).map(function (element) { return element.max })).reduce(
        function (a, b) { return a + b;})) {
            
        }


    }
    makeConstructions(rm) { //Generates needed construction sites

    }
}
module.exports = new ManageSpawns();