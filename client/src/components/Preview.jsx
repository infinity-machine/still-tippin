import React, { useState, useEffect } from 'react'

const Preview = (props) => {
    const [names, setNames] = useState([]);
    const [hours, setHours] = useState([]);

    useEffect(() => {
        if (!!props.tipoutData['hours']) {
            const namesArray = Object.keys(props.tipoutData['hours']);
            setNames(namesArray);
            const hoursArray = Object.values(props.tipoutData['hours']);
            setHours(hoursArray);
        };
    }, [props.tipoutData]);
    return (
        <div>
            <h2 className="txt_center">TOTAL CASH: ${props.tipoutData['total_cash']}</h2>
            {
                names ? (
                    names.map((name, index) => {
                        if(hours[index]) return <p key={index}>{name}: {hours[index]} hours</p>
                        else return <p key={index}>{name}:</p>
                    })
                ) : <></>
            }
        </div>
    );
};

export default Preview