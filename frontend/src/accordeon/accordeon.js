import React from 'react'
import AccordeonCard from '../accordeon-card';

const Accordeon = ({
    satelliteGroups,
    activeSatelliteGroup,
    satellites,
    pointedSatellites,
    loadingSatellites,
    onSatelliteGroupClick,
    onSatelliteClick
}) => {
    return (
        <div className="accordion" id="accordionExample">
        {
            satelliteGroups.map(el => {
                return (
                    <AccordeonCard 
                        cardHeader={{
                            ...el,
                            onClick: onSatelliteGroupClick
                        }}
                        cardBody={{
                            satellites: activeSatelliteGroup == el.id ? satellites : [],
                            pointedSatellites: pointedSatellites.filter(el1 => el1.name[0].toUpperCase() == el.name.toUpperCase()),
                            onClick: onSatelliteClick,
                            loading: activeSatelliteGroup == el.id && loadingSatellites
                        }}/>
                );
            })
        }
        </div>
    );
}

export default Accordeon;