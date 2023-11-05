import React from "react"
export default function Meme() {
    return(
        <main>
            <form className="form">
                <input type="text"
                placeholder="Top Text" 
                className="form--input" />
                <input type="text" 
                placeholder="Bottom Text"
                className="form--input"/>
                <button className="form--button">Get a New meme Image</button>
            </form>
        </main>
    )
}