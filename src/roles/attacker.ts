var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var enemies = creep.room.find(Game.HOSTILE_CREEPS);
        
        if (enemies) {
            console.log(`Attacking ${enemies[0].name}`);
            attacker.moveTo(enemies[0]);
            attacker.attack(enemies[0]);
        }
    }
};

module.exports = roleAttacker;