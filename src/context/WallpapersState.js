import React, { useState } from 'react'
import WallpaperContext from './WallpaperContext'

const WallpaperState = (props) => {
    const host = "http://localhost:9000/api";
    const headers = {
        "Content-Type": "application/json",
    }


    const notesInitial = [];
    const [recoreds, setRecoreds] = useState(notesInitial);
    const getRecoreds = async (url) => {
        const response = await fetch(`${host}/${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json(response); 
        setRecoreds(json.recoreds)
    }

    const addFunction = async (payload, url) => {
        const response = await fetch(`${host}/${url}`, {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
        });
        const json = await response.json(response);
        console.log(json)
    }
    const deleteFunction = async (url, id) => {
        const response = await fetch(`${host}/${url}/${id}`, {
            method: "DELETE",
            headers,
        });
        const json = await response.json(response);
        console.log(json)
    }
    return (

        <WallpaperContext.Provider value={{ getRecoreds, addFunction, deleteFunction, recoreds }}>
            {props.children}
        </WallpaperContext.Provider>

    )

}

export default WallpaperState;