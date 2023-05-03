import React, { useState, useEffect } from 'react';
import './Tipout.css';
import { Form, Preview, CalculatedView } from '../../components';
import {
    formatPlaceholders, filterInactiveInputs, inputsFilled, objectToArray, formatHoursData, handleActiveInputs
} from '../../utils/input-utils';

const Tipout = () => {
    const promptArray = [
        'Total cash tips for shift?',
        'How many people? (including yourself)',
        'Names of coworkers?',
        'Enter hours worked for each person on shift'
    ];
    const [promptIndex, setPromptIndex] = useState(0);
    const [tipoutData, setTipoutData] = useState({});
    const [buttonText, setButtonText] = useState('NEXT');
    const [error, setError] = useState(false);
    const [showCalculated, setShowCalculated] = useState(false);
    const [inputType, setInputType] = useState('number');
    const [activeInputs, setActiveInputs] = useState(1);
    const [inputValue, setInputValue] = useState({
        0: '', 1: '', 2: '', 3: '', 4: ''
    });
    const [inputsHidden, setInputsHidden] = useState({
        0: false, 1: true, 2: true, 3: true, 4: true
    });
    const [placeholder, setPlaceholder] = useState({
        0: '$$$', 1: '', 2: '', 3: '', 4: ''
    });

    const clearInputs = () => {
        setInputValue({
            0: '', 1: '', 2: '', 3: '', 4: ''
        });
    };

    const handleNext = (e) => {
        e.preventDefault();

        // TOTAL CASH ?
        if (promptIndex === 0) {
            if (!inputValue[0]) return setError('ENTER TOTAL CASH TIPS');
            setTipoutData({
                ...tipoutData, 'total_cash': inputValue[0]
            });
            setPlaceholder({
                ...placeholder, 0: '###'
            });
        };

        // SPLIT HOW MANY WAYS ?
        if (promptIndex === 1) {

            if (inputValue[0] < 2 || inputValue[0] > 5) return setError('TIPOUT MUST BE BETWEEN 1 AND 5 PEOPLE');

            setTipoutData({
                ...tipoutData,
                'hours': {
                    'user': 0
                },
                'names': ['user']
            });

            if (parseInt(inputValue[0]) === 2) {
                setPlaceholder({
                    ...placeholder, 0: "coworker's name"
                })
            }
            if (parseInt(inputValue[0]) > 2) {
                setActiveInputs(inputValue[0] - 1);
                let updatedPlaceholders = formatPlaceholders(inputValue[0] - 1);
                setPlaceholder({
                    ...updatedPlaceholders
                });

            }
            setInputType('text');
        };

        // NAMES ?
        if (promptIndex === 2) {
            // HANDLE ONE INPUT STUFF

            // GET EXISTING "USER" ENTRY IN HOURS OBJECT AND NAMES ARRAY
            let data_to_update = tipoutData['hours'];
            let names = [...tipoutData['names']];

            if (activeInputs === 1) {
                // APPEND ADDED NAME TO NAME ARRAY AND HOURS OBJECT
                if (!inputValue[0]) return setError('ENTER COWORKER NAME')
                data_to_update[inputValue[0]] = 0;
                names.push(inputValue[0]);
                setTipoutData({
                    ...tipoutData, 'hours': data_to_update, 'names': names
                });
            }
            if (activeInputs > 1) {
                let filtered_input = filterInactiveInputs(inputValue);
                let inputs_filled = inputsFilled(filtered_input, activeInputs)
                if (!inputs_filled) return setError('ENTER COWORKER NAMES');
                let names_to_add = objectToArray('values', filtered_input);
                names.push(...names_to_add)
                let hours_data = formatHoursData(names);
                setTipoutData({
                    ...tipoutData,
                    'hours': hours_data, 'names': names
                });
            }
            setActiveInputs(activeInputs + 1);
            let updated_placeholders = formatPlaceholders(activeInputs + 1, names)
            setPlaceholder({
                ...updated_placeholders
            });
            setInputType('number');
        };

        // HOURS ?
        if (promptIndex === 3) {
            let filtered_input = filterInactiveInputs(inputValue);
            let inputs_filled = inputsFilled(filtered_input, activeInputs)
            if (!inputs_filled) return setError('ENTER COWORKER HOURS');
            let names = tipoutData['names'];
            let hours = objectToArray('values', filtered_input);
            let formatted_data = formatHoursData(names, hours);
            setTipoutData({
                ...tipoutData, 'hours': formatted_data
            });
            setShowCalculated(true);
        };

        // RESET FORM, PROCEED
        clearInputs();
        setError(false);
        setPromptIndex(promptIndex + 1);
    };


    // MAKE TIPOUT LOGIC REACT TO PROMPTINDEX CHANGES INSTEAD OF CLICK
    useEffect(() => {

    }, [promptIndex])
    //

    useEffect(() => {
        let active_inputs = handleActiveInputs(activeInputs);
        setInputsHidden(active_inputs);
    }, [activeInputs]);

    // TEST
    useEffect(() => {
        console.log(tipoutData);
    }, [tipoutData]);

    return (
        <div>
            {tipoutData['total_cash'] ? < Preview tipoutData={tipoutData} /> : <></>}
            <h1>{promptArray[promptIndex]}</h1>
            {error ? <p>{error}</p> : <></>}
            {
                showCalculated ? (
                    < CalculatedView tipoutData={tipoutData} />
                ) : (
                    < Form handleNext={handleNext}
                        // handleBack={handleBack}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        inputType={inputType}
                        placeholder={placeholder}
                        inputsHidden={inputsHidden}
                        buttonText={buttonText} />
                )
            }
        </div>
    );
};

export default Tipout;