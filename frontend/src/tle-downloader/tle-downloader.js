import React from 'react'
import Accordeon from '../accordeon';

const defineUrl = ({pointedSatellites}) => {
    return pointedSatellites.reduce((prev, cur) => `${prev}stl=${cur.name}&`, '/download-tle?')
}

const TLEDownloader = (props) => {
    return (
        <form method="" action="" className="container">
            <Accordeon {...props}/>
            <a href={defineUrl(props)} download="tle.txt">Get TLE</a>
            <button type="button" onClick={props.onReset}>Reset</button>
        </form>
    );
}

export default TLEDownloader;