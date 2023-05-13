import React from 'react'

const Form = (props) => {

    const handleInputChange = (e) => {
        props.setInputValue({
            ...props.inputValue,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={props.handleNext}
            id="form"
            className="flex_container flex_center">
            <div className="fixed bottom">
                <div className="flex_container flex_stack">
                    <input value={props.inputValue[0]}
                        name={0}
                        type={props.inputType}
                        placeholder={props.placeholder[0]}
                        onChange={handleInputChange}
                        hidden={props.inputsHidden[0]}>
                    </input>
                    <input value={props.inputValue[1]}
                        name={1}
                        type={props.inputType}
                        placeholder={props.placeholder[1]}
                        onChange={handleInputChange}
                        hidden={props.inputsHidden[1]}>
                    </input>
                    <input value={props.inputValue[2]}
                        name={2}
                        type={props.inputType}
                        placeholder={props.placeholder[2]}
                        onChange={handleInputChange}
                        hidden={props.inputsHidden[2]}>
                    </input>
                    <input value={props.inputValue[3]}
                        name={3}
                        type={props.inputType}
                        placeholder={props.placeholder[3]}
                        onChange={handleInputChange}
                        hidden={props.inputsHidden[3]}>
                    </input>
                    <input value={props.inputValue[4]}
                        name={4}
                        type={props.inputType}
                        placeholder={props.placeholder[4]}
                        onChange={handleInputChange}
                        hidden={props.inputsHidden[4]}>
                    </input>
                </div>
                <div className="flex_container flex_center">
                    <button>{props.buttonText}</button>
                </div>
            </div>
        </form>
    )
}

export default Form