import React from 'react'
import './nav-items.scss'
import NavItem from './nav-item/nav-item'
import {connect} from 'react-redux'
import * as actions from '../../../../store/actions/index'

class NavItems extends React.Component{
        render(){
            return(
                <div className='nav-items'>
                    <NavItem key='home-nav-home' link='/' exact className='btn btn-three' activeClassName='btn btn-secondary'>Home</NavItem>
                    <a href='/#whyus' className='btn btn-three' activeClassName='btn btn-secondary'>About</a>
                    <NavItem key='home-nav-login' link='/sign-in' className='btn btn-three' activeClassName='btn btn-secondary'>Log In</NavItem>
                </div>
            )
        }    
}

const mapStateToProps = state =>{ return{ isloggedIn : state.auth.token !==null}}
const mapDispatchToProps = dispatch =>{return{onLogOut : () => dispatch(actions.logout())}}

export default connect(mapStateToProps,mapDispatchToProps)(NavItems)