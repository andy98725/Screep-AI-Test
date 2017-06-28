var tasks = [require('./task/gc.js'), require('./task/strategy.js'), require('./task/spawns.js'), require('./task/creeps.js')];

module.exports.loop = function () {
    tasks.forEach(task => task.run());
}