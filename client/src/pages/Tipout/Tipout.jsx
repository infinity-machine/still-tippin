import React, { useState, useEffect } from 'react';
import './Tipout.css';
import { Form, Preview } from '../../components';
// import splitTips from '../../utils/functions';

const Tipout = () => {

    const promptArray = [
        'Total cash tips for shift?',
        'How many people?',
        'Names?',
        'Enter hours worked for each person on shift'
    ];
    const [promptIndex, setPromptIndex] = useState(0);
    const [tipoutData, setTipoutData] = useState({});
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
    const [inputType, setInputType] = useState('number');
    const [ placeholder, setPlaceholder ] = useState({
        0: '$$$',
        1: '...',
        2: '...',
        3: '...',
        4: '...'
    })
    const [ buttonText, setButtonText ] = useState('NEXT');
    const [error, setError] = useState(false);
    const [ hideForm, setHideForm ] = useState(false);

    const handleMultipleInputs = (number_of) => {
        let updatedValues = {};
        let updatedPlaceholders = {};
        for(let i = 0; i < 5; i++){
            if(i < number_of) {
                updatedValues[i] = false;
                updatedPlaceholders[i] = `EMPLOYEE ${i + 1}`;
            } else{
                updatedValues[i] = true;
                updatedPlaceholders[i] = '...';
            }
        };
        console.log(updatedValues)
        console.log(updatedPlaceholders)
        setInputsHidden({
            ...updatedValues
        });
        setPlaceholder({
            ...updatedPlaceholders
        })
    };

    const singleInput = () => {
        setInputsHidden({
            0: false,
            1: true,
            2: true,
            3: true,
            4: true
        });
    };

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
        if(promptIndex === 0){
            setTipoutData({
                ...tipoutData, 'total_cash': inputValue[0]
            });
            setPlaceholder({
                ...placeholder, [0]: '...'
            })
        };

        // SPLIT HOW MANY WAYS ?
        if(promptIndex === 1){
            if (inputValue[0] < 2) return setError('TIPOUT MUST INCLUDE MORE THAN ONE PERSON');
            if (inputValue[0] > 5) return setError('TIPOUT MUST NOT EXCEED 5 PEOPLE');
            handleMultipleInputs(inputValue[0]);
            setInputType('text');
        };

        // NAMES ?
        if(promptIndex === 2){
            let namesData = {};
            let updatedPlaceholders = {};
            for(let i = 0; i < Object.values(inputValue).length; i++){
                if(!!inputValue[i]){
                    namesData[inputValue[i]] = 0;
                    updatedPlaceholders[i] = `${inputValue[i]} HOURS`
                }
            };
            setTipoutData({
                ...tipoutData, 'hours': namesData
            })
            setPlaceholder({
                ...updatedPlaceholders
            })
        };

        // HOURS ?
        if(promptIndex === 3){
            let hoursData = {}
            for(let i = 0; i < Object.values(inputValue).length; i++){
                if(!!inputValue[i]){
                    hoursData[Object.keys(tipoutData['hours'])[i]] = inputValue[i];
                }
            };
            setTipoutData({
                ...tipoutData, 'hours': hoursData
            });
            setHideForm(true);
        };

        clearInputs();
        setError(false);
        setPromptIndex(promptIndex + 1);
    };


    const handleInputChange = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        console.log(tipoutData);
    }, [tipoutData]);

    return (
        <div>
            { tipoutData['total_cash'] ? < Preview tipoutData={tipoutData}/> : <></> }
            <h1>{promptArray[promptIndex]}</h1>
            {error ? <p>{error}</p> : <></>}
            <form onSubmit={handleNext}
                className={hideForm ? "hide" : ""}>
                <div>
                    <input value={inputValue[0]}
                        name={0}
                        id="input-1"
                        type={inputType}
                        placeholder={placeholder[0]}
                        onChange={handleInputChange}
                        hidden={inputsHidden[0]}>
                    </input>
                    <input value={inputValue[1]}
                        name={1}
                        id="input-2"
                        type={inputType}
                        placeholder={placeholder[1]}
                        onChange={handleInputChange}
                        hidden={inputsHidden[1]}>
                    </input>
                    <input value={inputValue[2]}
                        name={2}
                        id="input-3"
                        type={inputType}
                        placeholder={placeholder[2]}
                        onChange={handleInputChange}
                        hidden={inputsHidden[2]}>
                    </input>
                    <input value={inputValue[3]}
                        name={3}
                        id="input-4"
                        type={inputType}
                        placeholder={placeholder[3]}
                        onChange={handleInputChange}
                        hidden={inputsHidden[3]}>
                    </input>
                    <input value={inputValue[4]}
                        name={4}
                        id="input-5"
                        type={inputType}
                        placeholder={placeholder[4]}
                        onChange={handleInputChange}
                        hidden={inputsHidden[4]}>
                    </input>
                </div>
                <button>{buttonText}</button>
            </form>
        </div>
    );
};

export default Tipout;