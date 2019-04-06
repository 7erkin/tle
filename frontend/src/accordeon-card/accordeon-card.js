import React from 'react'
import LoadingIndicator from '../loading-indicator';

import './accordeon-card.css'

const mergeSatellites = (satellites, pointedSatellites) => {
    if(satellites.length == 0)
        return pointedSatellites.map(el => {
            return {
                ...el, 
                checked: true
            }}
        )
    
    return satellites.map(el => {
        return {
            ...el,
            checked: pointedSatellites.findIndex(el1 => el1.id == el.id) !== -1
        }
    })
}

const renderList = (satellites, pointedSatellites, onSatelliteClick) => {
    if(!satellites.length && !pointedSatellites.length) return null;
    const mergedSatellites = mergeSatellites(satellites, pointedSatellites);
    return (
        mergedSatellites.length != 0 ?
        <ul>
        {
            mergedSatellites
                .map(el => {
                    return (
                        <li key={el.id} className={`${el.checked ? 'checked' : ''}`} onClick={() => onSatelliteClick(el.id, el.name)}>
                            {el.name}
                        </li>
                    )
            })
        }
        </ul> :
        <h2>There is no satellites</h2>
    );   
}

const AccordeonCard = ({
    cardHeader: {
        id,
        name: headerName,
        onClick: onHeaderClick
    },
    cardBody: {
        satellites,
        pointedSatellites,
        onClick: onSatelliteClick,
        loading
    }
}) => {
    return (
        <div className="accordeon-card card">
            <div className="card-header">
                <h5 className="mb-0">
                    <button onClick={() => onHeaderClick(id)} className="btn btn-link" type="button" data-toggle="collapse" aria-expanded="true">
                        {headerName}
                    </button>
                </h5>
            </div>
            <div data-parent="#accordionExample">
                <div>
                {
                    loading ? 
                    <LoadingIndicator /> :
                    renderList(satellites, pointedSatellites, onSatelliteClick)
                }
                </div>
            </div>
        </div>
    );
}

export default AccordeonCard;

