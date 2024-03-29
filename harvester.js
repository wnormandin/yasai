functions = require('functions');
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.harvesting && creep.carry.energy >= creep.store.getCapacity()) {
            creep.memory.harvesting = false;
            creep.say('upgrading');
        }
        if(!creep.memory.harvesting && creep.carry.energy <= 0) {
            creep.memory.harvesting = true;
            creep.say('harvesting');
        }
            
        if (creep.memory.harvesting) {
            functions.harvestEnergy(creep, 'e13307739d94e83');
        } else {
            // but if our creep does have energy, bring it to the controller and upgrade it
            functions.upgradeRoomController(creep);
        }
    }
};

module.exports = roleHarvester;