var tasks = [require('task.memory'), require('task.strategy'), require('task.spawns'), require('task.creeps')];

module.exports.loop = function () {
    tasks.forEach(task => task.run());
}

/* ///NOTES\\\
Resource/inspiration:
https://www.reddit.com/r/screeps/comments/6jperw/day_3_morning_musings_of_a_screeps_newbie/

*/