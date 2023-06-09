import React from 'react'
import still from '../../assets/STILL-black.png';
import tippin from '../../assets/TIPPIN-black.png';
import background from '../../assets/flamestippin2.jpg';
import './home.css'

const Home = (props) => {

    const handleClick = () => props.setTipoutMode(true)

    return (
        <div className="square flex_center flex_container flex_stack background-img">
            <img src={still}
                alt="still"
                id="still-img"
                className="flex-1" />
            <div id="middle-element"
                className="container flex_container flex_center flex-1">
                <div>
                    <button
                        onClick={handleClick}>START TIPPIN!</button>
                </div>
            </div>
            <img src={tippin}
                alt="tippin"
                id="tippin-img"
                className="flex-1" />
        </div>
    )
}

export default Home