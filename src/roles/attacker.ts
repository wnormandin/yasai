export function roleAttacker(creep: Creep) {
    let enemies = creep.room.find(FIND_HOSTILE_CREEPS);
    if (enemies) {
        console.log(`Attacking ${enemies[0].name}`);
        creep.moveTo(enemies[0]);
        creep.attack(enemies[0]);
    }
}