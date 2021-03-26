import React from 'react'
import Pokeball from '../assets/pokeball.gif'

function Loading() {
    return (
        <div className="loading">
            <img src={Pokeball} className="loading-img" alt="loading" />
        </div>
    )
}

export default Loading
