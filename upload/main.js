var tasks = [require('task.gc'), require('task.strategy'), require('task.spawns'), require('task.creeps')];

module.exports.loop = function () {
    tasks.forEach(task => task.run());
}