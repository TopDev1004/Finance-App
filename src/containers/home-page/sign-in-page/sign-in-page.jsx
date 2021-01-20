import React from 'react'
import './sign-in-page.scss'
import {Link} from 'react-router-dom'
import SignInImg from '../../../images/signInImg.png'
import {connect} from 'react-redux'
import * as actions from '../../../store/actions/index'
import Spinner from '../../../components/spinner/spinner'
class SignInPage extends React.Component{
    state = {
        signInMessage : null
    }
    submitHandler(event){
        let message = null
        const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        event.preventDefault()
        if (!emailPattern.test(this.signInEmail.value)){ message= 'invalid email'} 
        if (this.signInPass.value.trim().length < 6) {message = 'password is too short'}
        if(message === null){
            this.props.onSignIn(this.signInEmail.value,this.signInPass.value);  
            this.signInEmail.value='';
            this.signInPass.value=''
        } 
        this.setState({signInMessage:message})
    }

        render(){
            let errorMassage =null
            if(this.props.error && this.state.signInMessage === null){
                errorMassage ='Please try again'
            }

            let form = 
                <div className='sign-in'>
                    <div className='sign-in-img'>
                        <img src={SignInImg} alt="sign in here"/>
                    </div>
                    <form className='sign-in-form'>
                        <p>--Welcome Back--</p>
                        <div className="sign-in-form-title h3">Start Budgeting!</div>
                        <p className='sign-in-message'>{this.state.signInMessage}</p>
                        <p className='sign-in-message'>{errorMassage}</p>
                        <div className="sign-in-form-fields">
                            <div className="sign-in-form-field"><input ref={input => {this.signInEmail = input;}} type="email" className="sign-in-form-username" placeholder="Email" autoComplete='username'/></div>
                            <div className="sign-in-form-field"><input ref={input => {this.signInPass = input;}} type="password" className="sign-in-form-password" placeholder="Password" autoComplete='current-password'/></div>
                            <h5>Forgot Your Password? <a href="/">Click Here</a></h5>
                        </div>
                        <input type="submit" className="btn btn-four sign-in-btn" value='Sign In' onClick={this.submitHandler.bind(this)}></input>
                        <div className="sign-in-to-sign-up">
                            <h4>Do not have an account? <Link to="/sign-up" className='sign-in-to-sign-up-link'> Sign Up</Link></h4>
                        </div>
                    </form>
                </div>
            if (this.props.loading){
                form = <Spinner/>
            }
            
            return(
                <div className='sign-in-page'>
                   <h1>{this.props.loading? 'Loading information... Please wait' : null}</h1>
                   {form}     
            </div>
            )
        }
            
       
}

const mapStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error !== null,
        isLogedIn: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSignIn: (email,password)=>dispatch(actions.userSignIn(email,password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignInPage)