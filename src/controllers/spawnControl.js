const constants = require('../utils/constants');
const functions = require('../utils/functions');
const spawnControl = {
    run: function(spawnName) {
        if (Game.creeps.length >= constants.MAX_CREEP_SIZE) {
            return;
        }
        functions.spawnCreeps(spawnName, constants.MINER_COUNT, constants.MINER_DEFINITION);
        functions.spawnCreeps(spawnName, constants.BUILDER_COUNT, constants.BUILDER_DEFINITION);
        functions.spawnCreeps(spawnName, constants.REPAIRER_COUNT, constants.REPAIRER_DEFINITION);
        functions.spawnCreeps(spawnName, constants.ATTACKER_COUNT, constants.ATTACKER_DEFINITION);
    }
};

module.exports = spawnControl;