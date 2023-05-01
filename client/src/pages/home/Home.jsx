import React from 'react'
import still from '../../assets/STILL-black.png';
import tippin from '../../assets/TIPPIN-black.png';
import background from '../../assets/flamestippin2.jpg';
import './home.css'

const Home = (props) => {

    const handleClick = () => props.setTipoutMode(true)

    return (
        <div className="margin_lock">
            <div
                className="container flex_container flex_center background-img">
                <div>
                    <img src={still}
                        alt="still"
                        id="still-img" />
                    <div id="middle-element"
                        className="container flex_container flex_center">
                        <div>
                            <button
                                    onClick={handleClick}>START TIPPIN!</button>
                        </div>
                    </div>
                    <img src={tippin}
                        alt="tippin"
                        id="tippin-img" />
                </div>
            </div>
        </div>

    )
}

export default Home