
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


import './css/viewBooks.css'

function ViewBooks() {

    const baseURL = "http://localhost:3001";

    const get_id = useRef(null);


    const [getResult, setGetResult] = useState(null);


    const fortmatResponse = (res) => {
        return JSON.stringify(res, null, 2);
    }

    async function getAllData() {
        try {
            const res = await fetch(`${baseURL}/books`);

            if (!res.ok) {
                const message = `An error has happened: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }

            const data = await res.json();

            const result = {

                books: data,
            };

            setGetResult(fortmatResponse(result));
        } catch (err) {
            setGetResult(err.message);
        }
    }

    async function getDataById() {
        const id = get_id.current.value;

        if (id) {
            try {
                const res = await fetch(`${baseURL}/books/${id}`);

                if (!res.ok) {
                    const message = `An error has occured: ${res.status} - id:${id}, ${res.statusText}`;
                    throw new Error(message);
                }

                const data = await res.json();

                const result = {
                    book: data,

                };

                setGetResult(fortmatResponse(result));
            } catch (err) {
                setGetResult(err.message);
            }
        }
    }

    async function getAvailTrue() {
        try {
            const res = await fetch(`${baseURL}/books?avail=true`);

            if (!res.ok) {
                const message = `An error has happened: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }

            const data = await res.json();

            const result = {

                books: data,
            };

            setGetResult(fortmatResponse(result));
        } catch (err) {
            setGetResult(err.message);
        }
    }

    async function getAvailFalse() {
        try {
            const res = await fetch(`${baseURL}/books?avail=false`);

            if (!res.ok) {
                const message = `An error has happened: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }

            const data = await res.json();

            const result = {

                books: data,
            };

            setGetResult(fortmatResponse(result));
        } catch (err) {
            setGetResult(err.message);
        }
    }

    const clearGetOutput = () => {
        setGetResult(null);
    }
    let navigate = useNavigate();

    return (
        <div className="page">
            <button className="page-btn" onClick={() => navigate("/")}>Home</button>
            <button className="page-btn" onClick={() => navigate("/books")}>View All Books</button>
            <button className="page-btn" onClick={() => navigate("/books/true")}>Check-In Book</button>
            <button className="page-btn" onClick={() => navigate("/books/true")}>Check-Out Book</button>



            <h1 className="header">View Books in Library</h1>
            <div className="body">
                <div className="input-group">

                    <div className="top">
                        <p><b>To get info from books use these buttons  :</b></p>
                        <button className="btn-1" onClick={getAllData}>Get All Books</button>
                        <br/>

                            <p>Availability:</p>
                            <button className="btn1" onClick={getAvailTrue}>True</button><button className="btn2" onClick={getAvailFalse}>False</button>

                    </div>

                    <div className="below">
                        <div className="input-group-append">
                            <h3>To look up book with id use the following form and button:</h3>
                            <button className="btn-2" onClick={getDataById}>Submit</button>

                            <input type="text" ref={get_id} className="id-form" placeholder="id#" />

                        </div>

                        </div>
                    <button className="btn-3" onClick={clearGetOutput}>Clear All</button>

                </div>
                {getResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{getResult}</pre></div>}
            </div>
        </div>
    )
}

export default ViewBooks