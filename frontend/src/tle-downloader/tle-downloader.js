import React from 'react'
import Accordeon from '../accordeon';

import './tle-downloader.css'

const defineUrl = ({pointedSatellites}) => {
    return pointedSatellites.reduce((prev, cur) => `${prev}stl=${cur.name}&`, '/download-tle?')
}

const TLEDownloader = (props) => {
    return (
        <form className="tle-downloader container" method="" action="">
            <div className="control">
                <a className="btn btn-success" href={defineUrl(props)} onClick={() => props.saveLastRequestedSatellites()} download="tle.txt">Get TLE</a>
                <button type="button" className="btn btn-danger" onClick={props.onReset}>Reset</button>
                <button type="button" className="btn btn-primary" onClick={props.applyLastRequestedSatellites}>Apply last requested satellites</button>
            </div>
            <Accordeon {...props}/>
        </form>
    );
}

export default TLEDownloader;