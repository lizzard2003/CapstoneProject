import React from 'react'
import { useNavigate } from "react-router-dom";

import './css/homeStyle.css'

function Home() {
    let navigate = useNavigate();

    return (
        <div className='home'>
            <h1>Home</h1>
            <div className='btns'>
                <button className="page-btn" onClick={() => navigate("/books")}>See All Books</button>
                <button className="page-btn" onClick={() => navigate("/books/false")}>Check-In Book</button>
                <button className="page-btn" onClick={() => navigate("/books/true")}>Check-Out Book</button>
                <button className="page-btn" onClick={() => navigate("/books/GET")}>See JSON</button>
            </div>

        </div>
    )
}

export default Home