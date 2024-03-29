const CreepType = {
    Builder: "Builder",
    Miner: "Miner",
    Attacker: "Attacker",
    Repairer: "Repairer"
};

const CreepBody = {
    Miner: [WORK, CARRY, CARRY, MOVE],
    Builder: [WORK, CARRY, MOVE, MOVE],
    Repairer: [WORK, CARRY, MOVE, MOVE],
    Attacker: [ATTACK, RANGED_ATTACK, MOVE],
};

const MINER_DEFINITION = [CreepType.Miner, CreepBody.Miner];
const BUILDER_DEFINITION = [CreepType.Builder, CreepBody.Builder];
const REPAIRER_DEFINITION = [CreepType.Repairer, CreepBody.Repairer];
const ATTACKER_DEFINITION = [CreepType.Attacker, CreepBody.Attacker];

const MINER_COUNT = 5;
const BUILDER_COUNT = 1;
const REPAIRER_COUNT = 1;
const ATTACKER_COUNT = 1;
const DEBUGGING = true;
const MAXCREEPS = MINER_COUNT + BUILDER_COUNT + REPAIRER_COUNT + ATTACKER_COUNT;
 
var constants = {
    CreepType,
    CreepBody,
    MINER_DEFINITION,
    BUILDER_DEFINITION,
    REPAIRER_DEFINITION,
    ATTACKER_DEFINITION,
    MINER_COUNT,
    BUILDER_COUNT,
    REPAIRER_COUNT,
    ATTACKER_COUNT,
    DEBUGGING,
    MAXCREEPS
}

module.exports = constants;