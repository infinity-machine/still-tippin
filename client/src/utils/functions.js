function returnSum(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += Number(array[i]);
    }
    return sum
}

export default function splitTips(data_obj) {
    console.log(data_obj)
    const total_hours = returnSum(Object.values(data_obj['hours']));
    console.log(total_hours)
  };


  // function splitTips(total_cash, hours_array) {
  //   console.log(hours_array)
  //   let total_hours = returnSum(hours_array);

  //   let percent_array = [];
  //   for (let i = 0; i < hours_array.length; i++) {
  //       let percent = hours_array[i] / total_hours;
  //       percent_array.push(Number(percent.toFixed(2)));
  //     };
    
  //   let tips_array = [];
  //   for (let i = 0; i < percent_array.length; i++) {
  //     let tip = total_cash * percent_array[i];
  //     tips_array.push(tip);
  //   };
  //   return tips_array;
  // };