class Worker {
    
    run(creep) {
        if (!creep.memory.job) {
            if (creep.carry.energy == 0) {
                this.needMoreEnergy(creep);
            }
            else {
                this.nextJob(creep);
            }
        }

        if (creep.memory.job == 'energize') {
            this.doCollectEnergy(creep);
        } else if (creep.memory.job == 'construct') {
            this.doConstructionJob(creep);
        } else if (creep.memory.job == 'transfer') {
            this.doEnergyTransferJob(creep);
        } else if (creep.memory.job == 'upgrade') {
            this.doUpgradeControllerJob(creep);
        } else if (creep.memory.job == 'repair') {
            this.doRepairJob(creep);
        } else if (creep.memory.job == 'fortify'){
            this.doFortifyJob(creep);
        } else {
            // creep has an unknown job
            this.nextJob(creep);
        }
    }

    needMoreEnergy(creep) {
        var flags = findColoredFlags(COLOR_YELLOW,COLOR_YELLOW);
        //find least used, then nearest
        var counter = {};
        for(var i = 0; i < flags.size(); i++){ counter[i] = 0;}
        //Count em
        Game.creeps.forEach(cr => {if(cr.memory.job == 'energize') counter[cr.memory.target]++});
        //Now sort
        var targ = creep.pos.findClosestByPath(flags.filter(function(ele,index){
            return counter[index] == Math.min.apply(Math, counter);
        }));
        if(targ)
            creep.memory.target = flags.indexOf(targ);
        else   
            creep.memory.target = 0;
        creep.memory.job = 'energize';
        //console.log(creep.name + '\'s job: ' + creep.memory.job);
    }

    nextJob(creep) {
        creep.memory.job = undefined;
        var hasConstructionJobs = true;
        var hasTransferJobs = true;
        var hasRepairJobs = true;
        var hasFortificationJobs = true;
        while (!creep.memory.job) {
            var job = this.getJob(Memory.rooms[creep.room.name].worker.policy);
            if (job == 'construct' && hasConstructionJobs) {
                //Get construction location; prioritize extensions
                var construction = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
                    filter: site => site.structureType == STRUCTURE_EXTENSION
                });
                if (!construction) construction = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if (construction) {
                    creep.memory.job = 'construct';
                    creep.memory.target = construction.id;
                }
                else {
                    hasConstructionJobs = false;
                }
            }
            else if (job == 'transfer' && hasTransferJobs) {
                var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: function(s) {
                    return ((s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_TOWER || s.structureType == STRUCTURE_EXTENSION) && (s.energy < s.energyCapacity));
                }});
                if (structure) {
                    creep.memory.job = 'transfer';
                    creep.memory.target = structure.id;
                }
                else {
                    hasTransferJobs = false;
                }
            }
            else if (job == 'upgrade') {
                creep.memory.job = 'upgrade';
                creep.memory.target = undefined;
            }
            else if (job == 'repair' && hasRepairJobs) {
                var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
                });
                if (structure) {
                    creep.memory.job = 'repair';
                    creep.memory.target = structure.id;
                }
                else {
                    hasRepairJobs = false;
                }
            
            }
            else if (job == 'fortify' && hasFortificationJobs){
                var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.hits < Memory.rooms[creep.room.name].build.policy.WallHP && s.structureType == STRUCTURE_WALL
                });
                if (!structure)
                    structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => s.hits < Memory.rooms[creep.room.name].build.policy.WallHP && s.structureType == STRUCTURE_WALL
                    });
                if(structure){
                    creep.memory.job = 'fortify';
                    creep.memory.target = structure.id;
                }
            }
        }
        //console.log(creep.name + '\'s job: ' + creep.memory.job);
    }

    getJob(policy) {
        var sum = _.sum(_.map(policy, n => n));
        var rnd = Math.random() * sum;
        sum = 0;
        for (var name in policy) {
            sum += policy[name];
            if (rnd < sum) return name;
        }
    }

    doCollectEnergy(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            // Prioritize finding dropped energy
            var energy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (energy) {
                // Found dropped energy nearby. Pick it up
                if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
                    //Move to targeted flag
                    var fl = findColoredFlags(COLOR_YELLOW,COLOR_YELLOW)[target];
                    if(fl)
                        creep.moveTo(fl);
                    else{
                        console.log("No yellow harvester flags present");
                        this.needMoreEnergy(creep);
                    }
                }
            }
            else {
                // Find closest energy container or source
                var target = this.findClosestContainerOrSource(creep);
                if (target instanceof StructureContainer) {
                    // Withdraw energy from Container
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else if (target instanceof Source) {
                    // Harvest energy from Source
                    if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
        else {
            this.nextJob(creep);
        }
    }

    doConstructionJob(creep) {
        if (creep.carry.energy > 0) {
            var construction = Game.getObjectById(creep.memory.target);
            if (construction == null) {
                // Construction no longer exists
                this.nextJob(creep);
            }
            else if (creep.build(construction) == ERR_NOT_IN_RANGE) {
                creep.moveTo(construction, {visualizePathStyle: {stroke: '#ffffff'}});
            } 
            else if (construction.progress >= construction.progressTotal) {
                // Target has been constructed
                this.nextJob(creep);
            }
        }
        else {
            this.needMoreEnergy(creep);
        }
    }

    doEnergyTransferJob(creep) {
        if (creep.carry.energy > 0) {
            var target = Game.getObjectById(creep.memory.target);
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            else if (target.energy >= target.energyCapacity) {
                // Target is fully charged
                this.nextJob(creep);
            }
        }
        else {
            this.needMoreEnergy(creep);
        }
    }

    doUpgradeControllerJob(creep) {
        if (creep.carry.energy > 0) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            this.needMoreEnergy(creep);
        }
    }

    doRepairJob(creep) {
        if (creep.carry.energy > 0) {
            var target = Game.getObjectById(creep.memory.target);
            if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            else if (target.hits >= target.hitsMax) {
                // Target is fully repaied
                this.nextJob(creep);
            }
        }
        else {
            this.needMoreEnergy(creep);
            
        }
    }

    doFortifyJob(creep){
        if (creep.carry.energy > 0) {
            var target = Game.getObjectById(creep.memory.target);
            if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            else if (target.hits >= Memory.rooms[creep.room.name].build.policy.WallHP) {
                // Target is fortified
                this.nextJob(creep);
            }
        }
        else {
            this.needMoreEnergy(creep);
            
        }
    }

    findClosestContainerOrSource(creep) {
        var containers = creep.room.find(FIND_MY_STRUCTURES, {filter: function(structure) {
            // Find containers that contains enough energy to fully top up this creep
            return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] >= creep.carryCapacity);
        }});
        var sources = creep.room.find(FIND_SOURCES);
        var targets = containers.concat(sources);
        return targets.length == 1 ? targets[0] : creep.pos.findClosestByPath(targets);
    }

    findColoredFlags(primary,secondary){
        return Gamepad.flags.filter(function(fl){
            return(fl.color == primary && fl.secondaryColor == secondary);
        });
    }

}

module.exports = new Worker();