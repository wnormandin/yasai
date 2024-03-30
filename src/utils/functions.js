const spawnControl = require("../controllers/spawnControl");
const turretControl = require("../controllers/turretControl");
const constants = require("./constants");
const builder = require("../roles/builder");
const repairer = require("../roles/repairer");
const harvester = require("../roles/harvester");

function parseSpawnError(error, creepName) {
    switch(error) {
            case -1:
                console.log('You do not own this spawner');
                break;
            case -3:
                console.log(`A creep already exists with name ${creepName}, skipping`);
                break;
            case -4:
                break;
            case -6:
                console.log('Spawner needs more energy');
                break;
            case -10:
                console.log('Invalid creep creation parameters');
                break;
            case -14:
                console.log('Need more RCL');
                break;
            default:
                console.log(`An unknown error was encountered: ${error}`);
        }
}


module.exports = {
    parseSpawnError: parseSpawnError,
    spawnCreeps: function(spawnName, count, creepDefinition) {
        var creepRole = creepDefinition[0];
        var creepBody = creepDefinition[1];
        for (let n = count; n > 0; n--) {
            var creepName = `${creepRole} ${n}`;
            console.log('Spawning creep ' + creepName);
            var result = Game.spawns[spawnName].spawnCreep(creepBody, creepName, {memory: {role: creepRole}});
            
            if (constants.DEBUGGING && result != 0) {
                parseSpawnError(result, creepName);
            } else if (constants.DEBUGGING === true) {
                console.log(`Spawned ${creepName} using spawn ${spawnName}`);
            }
        }
    },
    harvestEnergy: function(creep, sourceObjectId) {
        // make an easy reference to the energy source
        var source = Game.getObjectById(sourceObjectId);
        // move my creep to the energy source and harvest energy
        creep.moveTo(source);
        creep.harvest(source);
    },
    upgradeRoomController: function(creep) {
        // make an easy reference to the room's controller
        var controller = creep.room.controller;
        // move my creep to the controller and upgrade it
        creep.moveTo(controller);
        creep.upgradeController(controller);
    },
    repairBuilding: function(creep) {
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        });
        
        targets.sort((a,b) => a.hits - b.hits);
        
        if(targets.length > 0) {
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
    },
    gameLoop: function () {
        // Spawn any missing creeps (creep list defined in spawnControl module)
        for (var spawn in Game.spawns) {
            spawnControl.run(Game.spawns[spawn].name);
        }

        // Attack invaders if necessary
        turretControl.run("W4N8");

        // Execute actions based on creep names (perhaps there is a better way to do this)
        for (const c in Game.creeps) {
            mycreep = Game.creeps[c];
            if (mycreep.memory.role === constants.CreepType.Builder) {
                builder.run(mycreep);
            } else if (mycreep.memory.role === constants.CreepType.Repairer) {
                repairer.run(mycreep);
            } else {
                harvester.run(mycreep);
            }
        }
    }
};