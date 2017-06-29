
class Strategy {
    run() {
        //Make construction sites
        _.forEach(Memory.rooms, rm => constructCheck(rm));

    }

    constructCheck(rm){

    }
}
module.exports = new Strategy();