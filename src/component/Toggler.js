import React from 'react'

export default function Toggler(props){
    return (
            <div className="toggleMode">
                <p className="toggler--text">Light</p>
                <div 
                    className="toggler--slider"
                    onClick={props.handleClick}
                >
                    <div className="toggler--slider--circle"></div>
                </div>
                <p className="toggler--text">Dark</p>
            </div>
    )
}