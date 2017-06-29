
class Strategy {
    run() {
        //Make construction sites
        _.forEach(Memory.rooms, rm => this.constructCheck(rm));

    }

    constructCheck(rm){
        return true;

    }
}
module.exports = new Strategy();