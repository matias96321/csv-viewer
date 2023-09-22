import React from 'react';
import './Loader.css'

function Loader() { 
    return (
        <div className="container">
        <div className="folder">
            <div className="top"></div>
            <div className="bottom"></div>
        </div>
        <div className="title">Preparando os arquivos...</div>
        </div>
    )
}

export default Loader