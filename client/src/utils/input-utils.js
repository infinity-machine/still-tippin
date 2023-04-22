// FORMATS AN OBJECT OF PLACEHOLDERS TO BE UPDATED INTO STATE. 
// IF PASSED A NAMES ARRAY, DYNAMICALLY SETS PLACHOLDERS WITH NAMES
const formatPlaceholders = (active_inputs, names) => {
    let updated_placeholders = {};
    for (let i = 0; i < 5; i++) {
        if (i < active_inputs) {
            if (!names) updated_placeholders[i] = `EMPLOYEE ${i + 1}`

            if (!!names) {
                updated_placeholders[i] = `${names[i]} HOURS`;
            };
        }

        else {
            updated_placeholders[i] = '...';
        };
    };

    return updated_placeholders;
};

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
const filterInactiveInputs = (input_object) => {
    let values = [...Object.values(input_object)];
    let filtered_inputs = {}

    for (let i = 0; i < values.length; i++) {
        if (!!values[i]) {
            filtered_inputs[i] = values[i];
        };
    };
    return filtered_inputs;
};

// CREATES AN HOURS OBJECT IN TIPOUT DATA STATE OBJECT
// IF CALLED WITHOUT HOURS, IT CREATES HOURS OBJECT WITH EACH NAME SET TO 0
const formatHoursData = (names, hours) => {
    let formatted_data = {}
    for (let i = 0; i < names.length; i++) {
        if (!hours) {
            formatted_data[names[i]] = 0
        };
        if (hours) {
            formatted_data[names[i]] = hours[i];
        };
    };
    return formatted_data;
};

export {
    formatPlaceholders, objectToArray, filterInactiveInputs, formatHoursData
};