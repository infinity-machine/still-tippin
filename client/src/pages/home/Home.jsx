import React from 'react'
import still from '../../assets/STILL.png';
import tippin from '../../assets/TIPPIN.png';
import background from '../../assets/flamestippin2.jpg';
import './home.css'

const Home = () => {
    return (
        <div id="home" className="margin_lock">
            {/* <img src={background} 
                alt="" 
                id="background"/> */}
            <div className="container flex_container flex_stack flex_center">
                <img src={still}
                    alt="still"
                    id="still-png" />
                    <div id="start-tippin"
                        className="flex_container">
                        <button id="start-btn">START TIPPIN!</button>
                    </div>
                <img src={tippin}
                    alt="tippin"
                    id="tippin-png" />
            </div>
        </div>

    )
}

export default Home