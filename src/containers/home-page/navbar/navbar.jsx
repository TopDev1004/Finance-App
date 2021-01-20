import React from 'react'
import  './navbar.scss'
import NavItems from './nav-items/nav-items' 
import NavItem from './nav-items/nav-item/nav-item'
import logo from '../../../images/logo.jpg'

function navbar(){
        return(
            <div className='navbar'>
                <NavItem link='/'><img src={logo} alt='logo' className='navbar-logo'/></NavItem>
                <NavItems/>
                <NavItem link="/sign-up" className='btn btn-four nav-register-btn' activeClassName='btn btn-primary'>Register!</NavItem>
                <div className="navigation">
                    <input type="checkbox" className="navigation-checkbox" id="navi-toggle"/>
                    <label htmlFor="navi-toggle" className="navigation-btn"><span className="navigation-icon">&nbsp;</span></label>
                    <div className="navigation-background">&nbsp;</div>
                    <nav className="navigation-nav">
                        <div className="navigation-list">
                            <div className="navigation-item"><NavItem key='home-nav-home' link='/' exact className='navigation-link' activeClassName='navigation-link'>Home</NavItem></div>
                            <div className="navigation-item"><a href='/#whyus' className='navigation-link' activeClassName='navigation-link'>About</a></div>
                            <div className="navigation-item"><NavItem key='home-nav-login' link='/sign-in' className='navigation-link' activeClassName='navigation-link'>Log In</NavItem></div>
                        </div>
                    </nav>
                </div>
            </div>
        )
}

export default navbar