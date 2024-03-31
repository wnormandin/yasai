import { DEBUGGING, CreepType } from "./constants";
import { controlTurrets } from "../controllers/turretControl";
import { handleSpawns } from "../controllers/spawnControl";
import { roleBuilder } from "../roles/builder";
import { roleRepairer } from "../roles/repairer";
import { roleHarvester } from "../roles/harvester";
import { roleAttacker } from "../roles/attacker";

export function parseSpawnError(error: number, creepName: string) {
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

export function spawnCreeps(spawnName: string, count: number, creepDefinition: [string, Array<number>]) {
    let creepRole, creepBody;
    [creepRole, creepBody] = creepDefinition;

    for (let n = count; n > 0; n--) {
        let creepName = `${creepRole} ${n}`;
        console.log('Spawning creep ' + creepName);

        let result = Game.spawns[spawnName].spawnCreep(creepBody, creepName, {memory: {role: creepRole}});

        if (DEBUGGING && result !== 0) {
            parseSpawnError(result, creepName);
        } else if (DEBUGGING) {
            console.log(`Spawned ${creepName} using spawn ${spawnName}`);
        }
    }
}

export function harvestEnergy(creep: Creep, sourceObjectId: string) {
    // make an easy reference to the energy source
    let source: null | Source = Game.getObjectById(sourceObjectId);
    if (!source) {
        return;
    }

    // move my creep to the energy source and harvest energy
    creep.moveTo(source);
    creep.harvest(source);
}

export function upgradeRoomController(creep: Creep) {
    // make an easy reference to the room's controller
    let controller: StructureController | undefined = creep.room.controller;
    // move my creep to the controller and upgrade it
    if (controller) {
        creep.moveTo(controller);
        creep.upgradeController(controller);
    }
}

export function repairBuilding(creep: Creep) {
    const targets = creep.room.find(FIND_STRUCTURES, {
        filter: object => object.hits < object.hitsMax
    });

    targets.sort((a,b) => a.hits - b.hits);
    if(targets.length > 0) {
        if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
        }
    }
}

export function gameLoop() {
    // Spawn any missing creeps (creep list defined in spawnControl module)
    for (var spawn in Game.spawns) {
        handleSpawns(Game.spawns[spawn].name);
    }

    // Attack invaders if necessary
    controlTurrets("W4N8");

    // Execute actions based on creep names (perhaps there is a better way to do this)
    for (const c in Game.creeps) {
        let mycreep = Game.creeps[c];
        if (mycreep.memory.role === CreepType.Builder) {
            roleBuilder(mycreep);
        } else if (mycreep.memory.role === CreepType.Repairer) {
            roleRepairer(mycreep);
        } else if (mycreep.memory.role === CreepType.Attacker) {
            roleAttacker(mycreep);
        } else {
            roleHarvester(mycreep);
        }
    }
}