/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawnControl');
 * mod.thing == 'a thing'; // true
 */
 
var constants = require('src/constants');
var functions = require('src/functions');
var spawnControl = {
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