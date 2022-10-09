import React from 'react'

export default function Password(props){
    console.log(props.data)
    return (
        <div className = "passwordBox">{props.data}</div>
    )
}