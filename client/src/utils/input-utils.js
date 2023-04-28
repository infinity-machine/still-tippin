// FORMATS AN OBJECT OF PLACEHOLDERS TO BE UPDATED INTO STATE. 
// PASSED WITH NO NAMES ARRAY TO SET PLACEHOLDERS TO EMP 1, 2, ETC
// PASSED WITH NAMES ARRAY SETS TO ${employee_name}1, 2, ETC
const formatPlaceholders = (active_inputs, names) => {
    let updated_placeholders = {};

    // ARE NULL PLACEHOLDERS A PROBLEM? 

    for (let i = 0; i < 5; i++) {
        if (i < active_inputs) {
            if (!names) {
                updated_placeholders[i] = `coworker ${i + 1}`
            }
            if (!!names) {
                if(i === 0) updated_placeholders[i] = 'YOUR HOURS'
                if(i > 0) updated_placeholders[i] = `${names[i]}'s hours`;
            };
        }
    };

    console.log(updated_placeholders)
    return updated_placeholders;
};

// RETURNS ARRAY OF OBJECT KEYS OR VALUES
const objectToArray = (key_or_value, input_object) => {
    if (key_or_value === 'keys') {
        let keys = [...Object.keys(input_object)];
        return keys;
    };

    if (key_or_value === 'values') {
        let values = [...Object.values(input_object)];
        return values;
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

// RETURNS FALSE IF ANY INPUTS ARE EMPTY
const inputsFilled = (input_object, active_inputs) => {
    let values = [...Object.values(input_object)];
    if(values.length < active_inputs) return false;
    return true;
};

// CREATES AN HOURS OBJECT IN TIPOUT DATA STATE OBJECT
// CALLED WITH ONLY NAMES, CREATES HOURS OBJECT WITH EACH NAME SET TO 0
// CALLED WITH NAMES AND HOURS SETS BOTH
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

// SETS VISIBLE THE NUMBER OF INPUTS REQUESTED, HIDES REMAINING
const handleActiveInputs = (inputs_requested) => {
    if (inputs_requested === 1) {
        return ({
            0: false, 1: true, 2: true, 3: true, 4: true
        });
    }
    if (inputs_requested > 1) {
        let updated_values = {};
        for (let i = 0; i < 5; i++) {
            if (i < inputs_requested) updated_values[i] = false;
            else updated_values[i] = true;
        };
        return updated_values;
    };
};
export {
    formatPlaceholders, objectToArray, filterInactiveInputs, inputsFilled, formatHoursData, handleActiveInputs
};