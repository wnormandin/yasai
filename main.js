module.exports.loop = function () {
    // This is the main game loop. The code inside of these curly brackets will run once per tick.
    var builder = require('builder');
    var harvester = require('harvester');
    var spawnControl = require('spawnControl');
    var attacker = require('attacker');
    var turretControl = require('turretControl');
    var constants = require('constants');
    var repairer = require('repairer');

    // Spawn any missing creeps (creep list defined in spawnControl module)
    for (var spawn in Game.spawns) {
        spawnControl.run(Game.spawns[spawn].name);
    }
    
    // Attack invaders if necessary
    turretControl.run("W4N8");
    
    // Execute actions based on creep names (perhaps there is a better way to do this)
    for (const c in Game.creeps) {
        mycreep = Game.creeps[c];
        if (mycreep.memory.role === constants.CreepType.Builder) {
            builder.run(mycreep);
        } else if (mycreep.memory.role == constants.CreepType.Repairer) {
            repairer.run(mycreep);
        } else {
            harvester.run(mycreep);
        }
    }
}