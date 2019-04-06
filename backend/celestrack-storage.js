const fs = require('fs')
const path = require('path')

class CelestrackStorage {
    constructor() {
        this._fileName = path.join(__dirname, '/celestrack-tle.txt')
        this._lastTimeToUpdate = null;
        this._differenceNotToUpdate = null;
    }
    async saveLoadedTLE(tle) {
        const stream = fs.createWriteStream(this._fileName)
        stream.write(tle);
        stream.close();
    }
    needToUpdate() {
        return true;
    }
    async getLoadedTLE() {
        const stream = fs.createReadStream(this._fileName)
        
    }
}

module.exports = CelestrackStorage;