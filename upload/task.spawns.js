// JavaScript source code
class ManageSpawns{
    run() {
        for (var sp in Game.spawns) {
            var spawn = Game.spawns[sp];
            this.spawnUnits(spawn);
        }
    }

    spawnUnits(spawn) { //Spawns needed units
        //If total creeps is under total amount needed
        if(_(Game.creeps).size() < 
        _.sum(_.map(Memory.rooms[spawn.room.name].spawn, element => element.max)) ){
            //Missing creeps. Choose randomly until a valid is found
            var job = this.chooseType(Memory.rooms[spawn.room.name].spawn);
            if(job != -1){//Spawn creep
                var body = Memory.rooms[spawn.room.name].spawn[job].body;
                while(this.calculateBodyCost(body) > spawn.room.energyCapacityAvailable){
                    body.pop();
                }
                if(spawn.canCreateCreep(body) == OK){
                    var creep = spawn.createCreep(body);
                    Memory.creeps[creep].role = Memory.rooms[spawn.room.name].spawn[job].role;
                }
            }
            else{
                console.log("Desync between creeps and creep requirement.");
            }
        }
    }

    chooseType(data) {
            while(Object.keys(data).length > 0){
                var sum = _.sum(_.map(data, element => element.chance));
                var rand = Math.random() * sum;
                sum = 0;
                for(var type in data){
                    sum += data[type].chance;
                    if (sum > rand){ //Chosen job
                        //Check if creeps are missing here
                        if(_(Memory.creeps).filter( { role: data[type].role } ).size() < data[type].max){
                            return type;
                        }
                        else{
                            //Remove from list and start over
                            delete data[type];
                            break;
                        }
                    }
                }
            }
            //All jobs taken. failsafe.
            return -1;
    }

    calculateBodyCost(body){
        var buildcost = 0;
        for(var bodypart in body){
            switch(bodypart){
                case "MOVE":
                case "CARRY":
                buildCost+=50;
                break;
                case "WORK":
                buildCost+=20;
                break;
                case "HEAL":
                buildCost+=200;
                break;
                case "TOUGH":
                buildCost+=20;
                break;
                case "ATTACK":
                buildCost+=80;
                break;
                case "RANGED_ATTACK":
                buildCost+=150;
                break;
            }
        }
        return buildcost;
    }
}
module.exports = new ManageSpawns();