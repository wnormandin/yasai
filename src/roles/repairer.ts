import { harvestEnergy , repairBuilding } from "../utils/functions";
export function roleRepairer(creep: Creep) {
    if(creep.memory.harvesting && creep.carry.energy == creep.store.getCapacity()) {
        creep.memory.harvesting = false;
        creep.say('repairing');
    }
    if(!creep.memory.harvesting && creep.carry.energy == 0) {
        creep.memory.harvesting = true;
        creep.say('harvesting');
    }

    if (creep.memory.harvesting) {
        harvestEnergy(creep, 'e13307739d94e83');
    } else {
        repairBuilding(creep);
    }
}