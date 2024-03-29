functions = require('functions');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }


        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                targets.sort(function(a,b){return a.progress > b.progress ? -1 : 1});
                if(creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {reusePath: 10});
                }
            }
        }
        else {
            functions.harvestEnergy(creep, 'e13307739d94e83');
        }
    }
};

module.exports = roleBuilder;