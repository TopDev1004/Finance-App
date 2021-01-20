import React from'react'
import './404.scss'
import errorImg from '../../images/404.png'
import {Link} from 'react-router-dom'
const spinner = (props) => {
    return (
        <div className='error-page'>
            <img src={errorImg} alt="404"/>
            <Link to='/' className='btn btn-four'>Take Me Back Home</Link>
        </div>
    )
}


export default spinner