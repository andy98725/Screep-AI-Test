
class Strategy {
    run() {
        //Make construction sites
        _.foreach(Memory.rooms, rm => constructCheck(rm));

    }

    constructCheck(rm){

    }
}
module.exports = new Strategy();