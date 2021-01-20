import React from 'react'
import './nav-item.scss'
import {NavLink} from 'react-router-dom'
const navItem = (props) => (
    <li>
        <NavLink onClick={props.clicked} activeClassName={props.activeClassName} exact={props.exact} to={props.link} className={props.className}>{props.children}</NavLink>
    </li>
)

export default navItem
