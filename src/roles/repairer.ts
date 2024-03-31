const functions = require('../utils/functions');
var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.harvesting && creep.carry.energy == creep.store.getCapacity()) {
            creep.memory.harvesting = false;
            creep.say('repairing');
        }
        if(!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
            creep.say('harvesting');
        }
        
        if (creep.memory.harvesting) {
            functions.harvestEnergy(creep, 'e13307739d94e83');
        } else {
            functions.repairBuilding(creep);
        }
    }
};

module.exports = roleRepairer;