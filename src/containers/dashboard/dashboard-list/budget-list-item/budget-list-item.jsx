import React from'react'
import './budget-list-item.scss'
import { FaPencilAlt,FaTrashAlt,FaInfo} from "react-icons/fa";

function budgetListItem (props){
    return (
        <div className='budget-list-item'>
            <div className='budget-list-item-date'>{props.date}</div>
            <div className='budget-list-item-amount'>${props.amount}</div>
            <div className='budget-list-item-title'>{props.title}</div>
            <div className='budget-list-item-by'>{props.person}</div>
            <FaPencilAlt color='#a9c6c7' size='1.5rem' className='budget-list-item-icon' onClick={props.onEditClicked}/>
            <FaTrashAlt color='#a9c6c7' size='1.5rem' className='budget-list-item-icon' onClick={props.onDeleteClicked}/>  
            <FaInfo color='#64a1a2' size='1.5rem' className='budget-list-item-icon' onClick={props.onInfoClicked}/> 
        </div>
    )
}


export default budgetListItem
