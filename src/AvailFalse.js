import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import './css/booksStyle.css'

function AvailFalse() {
    const baseURL = "http://localhost:3001";

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${baseURL}/books?avail=false`)
            .then(res => {
                return res.json();
            })
            .then(actualData => {
                console.log(actualData);
                setData(actualData);

            });
    }, []);

    let navigate = useNavigate();

    return (

        <div className="page-1">

            <button className="page-btn" onClick={() => navigate("/")}>Home</button>
            <button className="page-btn" onClick={() => navigate("/books")}>See All Books</button>
            <button className="page-btn" onClick={() => navigate("/books/true")}>Check-Out Books</button>


            <style>{`
                table{
                border:1px solid black;
                }
            `}</style>
            <h2>Unavailable Books</h2>
            <div>
                <table className="tb">
                    <tr>
                        <th>title</th> <th>id</th>
                    </tr>
                    {data && data.map(({ id, title }) => (
                        <tr><td key={title}>{title}</td><td key={id}>{id}</td></tr>
                    ))}


                </table>
            </div>
        </div>

    )
}

export default AvailFalse