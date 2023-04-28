import React, { useState, useEffect } from 'react';
import splitTips from '../utils/calculation';

const CalculatedView = (props) => {
  const [names, setNames] = useState([]);
  const [tips, setTips] = useState([]);

  const runItBack = () => {
    window.location.reload();
  }

  useEffect(() => {
    const total_cash = props.tipoutData['total_cash']
    const namesArray = [...Object.keys(props.tipoutData['hours'])]
    setNames(namesArray);
    const hoursArray = [...Object.values(props.tipoutData['hours'])];
    const tipsArray = splitTips(total_cash, hoursArray);
    setTips(tipsArray);
  }, [props.tipoutData]);

  return (
    <div>
      {
        names.map((name, index) => {
          return <p key={index}>{name} gets ${tips[index]}</p>
        })
      }
      <h2>DOES THAT LOOK RIGHT?</h2>
      <button onClick={runItBack}>RUN IT BACK</button>
    </div>
  );
};

export default CalculatedView;