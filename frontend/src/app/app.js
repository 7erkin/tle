import React from 'react'

import TLEDownloader from '../tle-downloader';
import {DummyTLEService} from '../service';
import {sha256} from 'js-sha256'

const createSatelliteGroups = () => {
  const groups = [];
  const begin = 'a'.charCodeAt(0);
  const end = 'z'.charCodeAt(0) + 1;
  for(let i = begin; i < end; ++i)
    groups.push({id: i, name: String.fromCharCode(i).toUpperCase()})

  return groups;
}

const initialState = {
  activeSatelliteGroup: null,
  pointedSatellites: [],
  loadedSatellites: [],
  loadingSatellites: false,
  satelliteGroups: createSatelliteGroups() 
}

class App extends React.Component {
    constructor(){
      super();
      this.state = {
        ...initialState
      }
      this._service = new DummyTLEService()
    }
  
    onSatelliteClick = (id, name) => {
      const satellites = [...this.state.pointedSatellites];
      const index = satellites.findIndex(el => el.id == id);
      if(index == -1)
        satellites.push({id, name});
      else  
        satellites.splice(index, 1);
      this.setState({
        pointedSatellites: satellites
      })
    }

    onSatelliteGroupClick = (id) => {
      this.setState({
        activeSatelliteGroup: id,
        loadingSatellites: true
      })
      this._service.getSatellitesByFirstLetter(String.fromCharCode(id))
        .then(response => {
          this.setState({
            loadingSatellites: false,
            loadedSatellites: response.data.map(el => {
              return {
                id: sha256(el),
                name: el
              }
            })
          })
        })
    }

    onResetPointedSatellites = () => {
      this.setState({
        ...initialState
      })
    }

    saveLoadedSatellites = (satellites) => {
      this.setState({
        loadedSatellites: satellites
      })
    }

    startLoadingSatellites = () => {
      this.setState({
        loadingSatellites: true
      })
    }

    stopLoadingSatellites = () => {
      this.setState({
        loadingSatellites: false
      })
    }

    render() {
      const {
        loadingSatellites,
        satelliteGroups,
        activeSatelliteGroup,
        pointedSatellites,
        loadedSatellites: satellites
      } = this.state;

      return (
        <TLEDownloader
          activeSatelliteGroup={activeSatelliteGroup}
          loadingSatellites={loadingSatellites}
          pointedSatellites={pointedSatellites}
          satellites={satellites}
          satelliteGroups={satelliteGroups}
          onSatelliteClick={this.onSatelliteClick}
          onSatelliteGroupClick={this.onSatelliteGroupClick}
          onReset={this.onResetPointedSatellites}/>
      );
    }
}

export default App;