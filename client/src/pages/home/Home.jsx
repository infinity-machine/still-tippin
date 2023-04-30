import React from 'react'
import still from '../../assets/STILL-black.png';
import tippin from '../../assets/TIPPIN-black.png';
import background from '../../assets/flamestippin2.jpg';
import './home.css'

const Home = () => {
    return (
        <div className="margin_lock">
            <div id="home"
                className="container flex_container flex_center">
                <div className="background">
                    <img src={still}
                        alt="still"
                        id="still-img" />
                    <div id="start-tippin"
                        className="container flex_container flex_center">
                        <div className="">
                            <button id="start-btn">START TIPPIN!</button>
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