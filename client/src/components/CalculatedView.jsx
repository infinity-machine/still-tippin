import React, { useState, useEffect } from 'react';

const CalculatedView = (props) => {
  const [ names, setNames] = useState([]);

  const splitTips = () => {
    console.log('ok')
  }

  // MAP THROUGH DATA



  useEffect(() => {
    const namesArray = [...Object.keys(props.tipoutData['hours'])]
    setNames(namesArray);
  }, [props.tipoutData]);
  return (
    <div>
      {
        names.map((name, index) => {
          return <p key={index}>{name}: CALCULATED TIPOUT HERE</p>
        })
      }
    </div>
  );
};

export default CalculatedView;