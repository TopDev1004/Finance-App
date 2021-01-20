import React from'react'
import './alert.scss'
import {Link} from 'react-router-dom'
function alert (props){
    return (
        <div className="alert">
            <h3>Please Start setting your budget goals and add your transactions</h3>
            <div className='dashboard-details-bottom'>
                <Link to='/settings' className='btn btn-primary'>SETTINGS</Link>
            </div>
        </div>
    )
}


export default alert