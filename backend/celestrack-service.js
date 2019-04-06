const axios = require('axios')
const CelestrackStorage = require('./celestrack-storage')

const needNameToTransform = (name) => {
    return name.includes('(') || name.includes(')');
}

const transformName = (name) => {
    console.log('TR:', name)
    let res = name.toString();
    res.replace("(", "a");
    res.replace(")", "\\)");
    console.log("AFTER TR:", name)
    return res;
}

class CelestrackService {
    constructor(){
        this._api = 'https://celestrak.com/NORAD/elements/resource.txt';
        this._storage = new CelestrackStorage();
    }
    getSatellitesByFirstLetter(letter) {
        if(this._storage.needToUpdate()){
            return new Promise((resolve, reject) => {
                axios.get(this._api)
                .then(response => {
                    this._storage.saveLoadedTLE(response.data);
                    const regExp = new RegExp(`^${letter.toUpperCase()}([\\w-\(\)]+ *?)+(?= +\r\n)`, 'gm')
                    const matchedSatellites = response.data.match(regExp);
                    resolve(matchedSatellites || []);
                })
            })
        }
        return;
    }
    getTLEBySatelliteNames(names) {
        return new Promise((resolve, reject) => {
            axios.get(this._api)
            .then(response => {
                //this._storage.saveLoadedTLE(response.data);
                const tmp = names.map(el => needNameToTransform(el) ? transformName(el) : el).join('|')
                console.log(tmp)
                const regExp = new RegExp(`^(${tmp}) +\r\n([\\w-+\(\). ]+\r\n){2}`, 'gm')
                const matchedTLE = response.data.match(regExp);
                console.log(matchedTLE);
                resolve(matchedTLE.join('') || []);
            })
        })
    }
}

module.exports = CelestrackService;