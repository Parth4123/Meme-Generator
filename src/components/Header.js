import React from "react"
import trollImage from '../images/troll.jpg'
export default function Header() {
    return(
        <header className="header">
            <img src={trollImage} alt="troll" className="header--image"/>
            <h2 className="header--title">Meme Generator</h2>
        </header>
    )
}