export const CreepType = {
    Builder: "Builder",
    Miner: "Miner",
    Attacker: "Attacker",
    Repairer: "Repairer"
};

export const CreepBody = {
    Miner: [WORK, CARRY, CARRY, MOVE],
    Builder: [WORK, CARRY, MOVE, MOVE],
    Repairer: [WORK, CARRY, MOVE, MOVE],
    Attacker: [ATTACK, RANGED_ATTACK, MOVE],
};

export const MINER_DEFINITION: [string, Array<number>] = [CreepType.Miner, CreepBody.Miner];
export const BUILDER_DEFINITION: [string, Array<number>] = [CreepType.Builder, CreepBody.Builder];
export const REPAIRER_DEFINITION: [string, Array<number>] = [CreepType.Repairer, CreepBody.Repairer];
export const ATTACKER_DEFINITION: [string, Array<number>] = [CreepType.Attacker, CreepBody.Attacker];

export const MINER_COUNT = 5;
export const BUILDER_COUNT = 1;
export const REPAIRER_COUNT = 1;
export const ATTACKER_COUNT = 1;
export const DEBUGGING = true;
export const MAXCREEPS = MINER_COUNT + BUILDER_COUNT + REPAIRER_COUNT + ATTACKER_COUNT;
