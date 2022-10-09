import React from 'react'
import Password from './Password'
import Toggler from './Toggler'

export default function Content(props){
const [darkMode, setDarkMode] = React.useState(false)
const [pwdArray, setPwdArray] = React.useState(["","","",""])

const [formData, setformData] = React.useState({pwdLength: 12, signs: false, numbers: false, capital: false})


function toggleMode(){
    setDarkMode(prevState => !prevState)
}

const capitalArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
const numberArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const signArray = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];
const defArray = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]


function arrCreator(){
    const {capital, signs, numbers} = formData
    if (capital && numbers && signs){
        return [...defArray, ...capitalArray, ...numberArray, ...signArray]
    } else if (capital && numbers){
        return [...defArray, ...capitalArray, ...numberArray]
    } else if (capital && signs){
        return [...defArray, ...capitalArray, ...signArray]
    } else if (signs && numbers){
        return [...defArray, ...signArray, ...numberArray]
    } else if (capital){
        return [...defArray, ...capitalArray]
    } else if (numbers){
        return [...defArray, ...numberArray]
    } else if (signs){
        return [...defArray, ...signArray]
    }
    else {
        return [...defArray]
    }
}

function handleClick(){
    setPwdArray( prevArray => prevArray.map(e => generatePwd()))   
}

function generatePwd(){
    const pwdLength = formData.pwdLength
    let pwd = ""
    for (let i=0; i<pwdLength; i++){
        const randomIndex =  Math.floor(Math.random()*arrCreator().length)
        pwd+=arrCreator()[randomIndex]
    }
    return pwd
}

function handleChange(event){
    const {name, value, type, checked} = event.target
    console.log(name)
    setformData(prevArray => {
                            return {...prevArray, 
                                        [name]: type === "checkbox" ? checked : Math.floor(value)
                                    }
                            })
}

return ( 
    <div className = {darkMode ? "container dark" : "container light"}>
        <section className="componentContainer">
        <section className="top">
            <h1>Generate a <br/><span className = "accent">random password</span></h1>
                <div className = "formContainer">
                    <label id = "lengthInput" HtmlFor="pwdLength">
                    Pasowrd length:
                    <input name="pwdLength" min="4" max="20" value = {formData.pwdLength} type="number" onChange={handleChange}/>
                    </label>
                    
                    <label htmlFor="signs">
                        <input  type="checkbox" 
                                id="signs" 
                                name="signs"
                                checked={formData.signs}
                                onChange={handleChange}
                        />
                        Signs
                    </label>
                    <label htmlFor="numbers">
                        <input  type="checkbox"
                                name="numbers"
                                id="numbers"
                                checked={formData.numbers}
                                onChange={handleChange}
                        />
                        Numbers
                    </label>
                    <label htmlFor="capital">
                        <input  type="checkbox"
                                name="capital"
                                id="capital"
                                checked={formData.capital}
                                onChange={handleChange}    
                        />
                        Capital letters
                    </label>      
                </div>
            
            <Toggler handleClick={toggleMode} />
            <button className = "btn generateBtn" onClick={handleClick}>Generate passwords</button>
        </section>
        
        <section className="passwordContainer accent">
            {pwdArray.map(e => <Password data = {e} />)}
        </section>
    </section>
    </div>
    )

}
