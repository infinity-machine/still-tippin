import React, { useState, useEffect } from 'react';

const CalculatedView = (props) => {
  const [names, setNames] = useState([]);
  const [tips, setTips] = useState([]);

  function returnSum(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += Number(array[i]);
    }
    return sum
  }

  const splitTips = (total_cash, hours_array) => {
    const total_hours = returnSum(hours_array);
    console.log(total_hours)
    let percent_array = [];
    for (let i = 0; i < hours_array.length; i++) {
      let percent = hours_array[i] / total_hours;
      percent_array.push(Number(percent));
    };
    console.log(percent_array)
    let tips_array = [];
    for (let i = 0; i < percent_array.length; i++) {
      let tip = total_cash * percent_array[i];
      tips_array.push(tip);
    };
    return tips_array;
  }

  // MAP THROUGH DATA



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
    </div>
  );
};

export default CalculatedView;