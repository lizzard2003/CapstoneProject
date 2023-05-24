import React, { useRef, useState } from "react";
import './css/addStyle.css'


function AddBook() {
    const baseURL = "http://localhost:3001";

    const put_id = useRef(null);
    // const put_avail = useRef(null);
    const put_who = useRef(null);
    const put_due = useRef(null);

    const [putResult, setPutResult] = useState(null);

    const fortmatResponse = (res) => {
        return JSON.stringify(res, null, 2);
    }

    async function putData() {
        const id = put_id.current.value;

        if (id) {

            const putData = {
                avail: true,
                who: "",
                due: "",
            };

            try {
                const res = await fetch(`${baseURL}/books/${id}`, {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer my-token",

                    },
                    body: JSON.stringify(putData),
                });

                if (!res.ok) {
                    const message = `An error has happened: ${res.status} - ${res.statusText}`;
                    throw new Error(message);
                }

                const data = await res.json();

                const result = {
                    status: res.status + "-" + res.statusText,
                    headers: { "Content-Type": res.headers.get("Content-Type") },
                    data: data,
                };

                setPutResult(fortmatResponse(result));
                window.location.reload(false);
            } catch (err) {
                setPutResult(err.message);
            }
        }
    }

    const clearPutOutput = () => {
        setPutResult(null);
    }

    // let navigate = useNavigate();

    return (
        <div className="page-2">


            <h1 className="page-header">Check In Books</h1>
            <div className="page-body">
                <div className="form-group">
                    <label className="form-check-label" htmlFor="put_avail"><b>Enter ID</b></label>
                    <input type="text" className="form-id" ref={put_id} placeholder="Id" />
                </div>

                <button className="btn-sub" onClick={putData}>Update Data</button>
                <button className="btn-sub" onClick={clearPutOutput}>Clear</button>

                {putResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{putResult}</pre></div>}
            </div>
        </div>
    );
}


export default AddBook