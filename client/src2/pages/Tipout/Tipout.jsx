import React, { useState, useEffect } from 'react';
import './Tipout.css';
import { Form, Preview, CalculatedView } from '../../components';
import {
    formatPlaceholders, filterInactiveInputs, objectToArray, formatHoursData
} from '../../utils/input-utils';

const Tipout = () => {
    const promptArray = [
        'Total cash tips for shift?',
        'How many people?',
        'Names?',
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
        0: '',
        1: '',
        2: '',
        3: '',
        4: ''
    });
    const [inputsHidden, setInputsHidden] = useState({});
    const [placeholder, setPlaceholder] = useState({
        0: '$$$',
        1: '',
        2: '',
        3: '',
        4: ''
    });

    const clearInputs = () => {
        setInputValue({
            0: '',
            1: '',
            2: '',
            3: '',
            4: ''
        });
    };

    const clearPlaceholders = () => setPlaceholder({
        0: '',
        1: '',
        2: '',
        3: '',
        4: ''
    })

    // const handleBack = () => {
    //     if(promptIndex === 2) setPlaceholder({
    //         ...placeholder, 0: '$$$'
    //     })
    //     if(promptIndex === 2){
    //         setActiveInputs(1)
    //         clearPlaceholders();
    //         setPlaceholder({
    //             ...placeholder, 0: '###'
    //         });
    //     }

    //     if(promptIndex === 3){
            
    //     }


    //     setPromptIndex(promptIndex - 1)
    // }

    // CORE 
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
            setActiveInputs(inputValue[0]);
            let updatedPlaceholders = formatPlaceholders(inputValue[0]);
            setPlaceholder({
                ...updatedPlaceholders
            });
            setInputType('text');
        };

        // NAMES ?
        if (promptIndex === 2) {
            let filtered_input = filterInactiveInputs(inputValue);
            let names = objectToArray('values', filtered_input);
            let hours_data = formatHoursData(names);
            let updatedPlaceholders = formatPlaceholders(activeInputs, names);
            setTipoutData({
                ...tipoutData,
                'hours': hours_data, 'names': names
            });
            setPlaceholder({
                ...updatedPlaceholders
            });
            setInputType('number');
        };

        // HOURS ?
        if (promptIndex === 3) {
            let filtered_input = filterInactiveInputs(inputValue);
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


    // SEPERATE THIS LOGIC!

    // SETS TO VISIBLE THE AMOUNT OF INPUTS REQUESTED, HIDES REMAINING
    const handleActiveInputs = () => {
        if (activeInputs === 1) return setInputsHidden({
            0: false,
            1: true,
            2: true,
            3: true,
            4: true
        })
        let updatedValues = {};
        for (let i = 0; i < 5; i++) {
            if (i < activeInputs) {
                updatedValues[i] = false;
            } else {
                updatedValues[i] = true;
            }
        };
        setInputsHidden({
            ...updatedValues
        });
    };

    // useEffect(() => {
    //     console.log('fired!')
    // }, [promptIndex])

    useEffect(() => {
        handleActiveInputs();
    }, [activeInputs]);

    useEffect(() => {
        console.log(tipoutData)
    }, [tipoutData])

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