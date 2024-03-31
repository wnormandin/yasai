import {
    MAXCREEPS,
    MINER_COUNT,
    MINER_DEFINITION,
    BUILDER_DEFINITION,
    BUILDER_COUNT,
    ATTACKER_DEFINITION,
    ATTACKER_COUNT,
    REPAIRER_DEFINITION,
    REPAIRER_COUNT
} from "../utils/constants";
import { spawnCreeps } from "../utils/functions";

export function handleSpawns(spawnName: string) {
    if (Object.keys(Game.creeps).length >= MAXCREEPS) {
        return;
    }
    spawnCreeps(spawnName, MINER_COUNT, MINER_DEFINITION);
    spawnCreeps(spawnName, BUILDER_COUNT, BUILDER_DEFINITION);
    spawnCreeps(spawnName, REPAIRER_COUNT, REPAIRER_DEFINITION);
    spawnCreeps(spawnName, ATTACKER_COUNT, ATTACKER_DEFINITION);
}