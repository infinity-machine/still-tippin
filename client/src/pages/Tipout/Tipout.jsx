import React, { useState, useEffect } from 'react';
import './Tipout.css';
import { Form, Preview, CalculatedView } from '../../components';
import { formatPlaceholders, filterInactiveInputs, objectToArray } from '../../utils/input-utils';

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
    const [inputsHidden, setInputsHidden] = useState({
        0: false,
        1: true,
        2: true,
        3: true,
        4: true
    });
    const [placeholder, setPlaceholder] = useState({
        0: '$$$',
        1: '...',
        2: '...',
        3: '...',
        4: '...'
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

    const handleNext = (e) => {
        e.preventDefault();

        // TOTAL CASH ?
        if (promptIndex === 0) {
            setTipoutData({
                ...tipoutData, 'total_cash': inputValue[0]
            });
            setPlaceholder({
                ...placeholder, 0: '...'
            })
        };

        // SPLIT HOW MANY WAYS ?
        if (promptIndex === 1) {
            // LIMIT INPUT
            if (inputValue[0] < 2) return setError('TIPOUT MUST INCLUDE MORE THAN ONE PERSON');
            if (inputValue[0] > 5) return setError('TIPOUT MUST NOT EXCEED 5 PEOPLE');
            setActiveInputs(inputValue[0]);
            setInputType('text');
        };

        // NAMES ?
        if (promptIndex === 2) {
            console.log(inputValue)
            let hoursData = filterInactiveInputs(inputValue)
            let names = objectToArray('keys', hoursData);
            setTipoutData({
                ...tipoutData, 'hours': hoursData
            });
            let updatedPlaceholders = formatPlaceholders(activeInputs, names);
            setPlaceholder({
                ...updatedPlaceholders
            })
        };

        // HOURS ?
        if (promptIndex === 3) {
            let hoursData = {};
            for (let i = 0; i < Object.values(inputValue).length; i++) {
                if (!!inputValue[i]) {
                    hoursData[Object.keys(tipoutData['hours'])[i]] = inputValue[i];
                }
            };
            setTipoutData({
                ...tipoutData, 'hours': hoursData
            });
            setShowCalculated(true);
        };
        // RESET FORM, PROCEED TO NEXT
        clearInputs();
        setError(false);
        setPromptIndex(promptIndex + 1);
    };

    // SETS TO VISIBLE THE AMOUNT OF INPUTS REQUESTED, HIDES REMAINING
    const handleActiveInputs = () => {
        if (activeInputs === 1) return false;
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

    useEffect(() => {
        handleActiveInputs();
        if (activeInputs > 1) {
            const placeholders = formatPlaceholders(activeInputs);
            setPlaceholder({ ...placeholders })
        }
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