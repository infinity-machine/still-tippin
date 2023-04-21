// RETURNS ARRAY OF INPUT VALUES
const objectToArray = (key_or_value, input_object) => {
    if (key_or_value === 'keys') {
        let keys = [...Object.keys(input_object)];
        return keys;
    };
    if (key_or_value === 'values') {
        let values = [...Object.values(input_object)];
        return values
    };
};

// FILTERS OUT INACTIVE INPUT VALUES FROM INPUTVALUE OBJECT
const filterInactiveInputs = (value_object) => {
    let values = [...Object.values(value_object)];
    let filtered_inputs = {}

    for (let i = 0; i < values.length; i++) {
        if (!!value_object[i]) {
            console.log(value_object[i])
            filtered_inputs[values[i]] = 0;
        };
    };
    return filtered_inputs;
}

export {
    objectToArray, filterInactiveInputs
}