import React from'react'
import './input-unit.scss'

function inputUnit (props){
    let inputunit = null
    if (props.inputtype === 'input') {inputunit = <input id={props.id} {...props} className='budget-input'/>}
    if (props.inputtype === 'textArea') { inputunit = <textarea id={props.id} {...props} className='budget-input'/>}
    if (props.inputtype === 'select') { 
        inputunit = 
            <select id={props.id} {...props} className='budget-input' ref={props.inputRef}>
                {props.options.split(',').map(option => { return (<option key={props.id+option}className='budget-input' value={option}>{option}</option>);})}
            </select>
    }

    return (
        
        <div className='budget-input-unit'>
            <label htmlFor={props.id} className='budget-input-label'>{props.labelname}</label>
            {inputunit}
        </div>
        
    )
}


export default inputUnit