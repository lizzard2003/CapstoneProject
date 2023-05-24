import React, { useRef, useState } from "react";

function GetId() {

    const baseURL = "http://localhost:3001";
    const [getResult, setGetResult] = useState(null);

    const get_id = useRef(null);

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



                setGetResult(data);
            } catch (err) {
                setGetResult(err.message);
            }
        }
    }

    return (
        <div>
            <h2>GetId</h2>
            <div>
                <button className="btn-2" onClick={getDataById}>Get by Id</button>

                <input type="text" ref={get_id} className="id-form" placeholder="Id" />

                <table className="tb">
                    <tr>
                        <th>title</th> <th>id</th>
                    </tr>
                    {getResult && getResult.map(({ id, title }) => (
                        <tr><td key={title}>{title}</td><td key={id}>{id}</td></tr>
                    ))}


                </table>
            </div>

        </div>
    )
}

export default GetId