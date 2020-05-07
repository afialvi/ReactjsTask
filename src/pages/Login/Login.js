
import React from 'react';
import './Login.css';
import { Card, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';


import titleImage from './images/login-title-image.jpg';
import crossImage from './images/cross_icon.png';
import tickImage from './images/tick_icon.png';
import whiteBG from './images/white_image.png';
import UserGrey from './images/user_grey.jpg';
import lockImage from './images/lock-image.png';

import secureEntry from './images/secure-entry.png';
import insecureEntry from './images/insecure-entry.png';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NetworkUtils from '../../Network/Networkutils';
import { createStore } from 'redux';


class Login extends React.Component {

	reducer = (state, action) => {
  		console.log('reducer', this.state, action);
  		if (action.type == "SET_STATE"){
  			this.setState(action.value);
  		}
  	return state;
	}
	constructor(props) {
    	super(props);
    	this.state = {userDoesNotExist: false, emailDoesNotExist: false, emailValue: "", passwordValue: "", isEmail: false, noUserEntered: false, incorrectPassword: false, securedPwdEntry: true};
    	this.handleChange = this.handleChange.bind(this);
    	this.handleKeyDown = this.handleKeyDown.bind(this);
    	this.handlePasswordChange = this.handlePasswordChange.bind(this);
    	this.toggleSecuredPwdEntry = this.toggleSecuredPwdEntry.bind(this);
    	this.login = this.login.bind(this);
    	this.store = createStore(this.reducer);
  	}


  	
  	login(){
  		let body = {
  				"usernameEmail": this.state.emailValue,
  				"password": this.state.passwordValue,
  				"isEmail": this.state.isEmail,
  			}
  			console.log("Credentials Body: "+ JSON.stringify(body));
  			NetworkUtils.postRequest("https://www.api.worksimplr.com/api/v1/users/sign-in/", body, (resp)=>{
  				if(resp.data != undefined && resp.data != null){
	  				if (resp.data.message !== "User Exists"){
	  					
	  				}
	  				else{
	  					
	  				}
  				}
  				if(resp.name == "Error"){
  					console.log("Error is thrown");
  					
  				}
  			});
  	}


  	toggleSecuredPwdEntry(){
  		if(this.state.securedPwdEntry){
  			this.store.dispatch({type:"SET_STATE", value:{securedPwdEntry: false}});
  		}
  		else{
  			this.store.dispatch({type:"SET_STATE", value:{securedPwdEntry: true}});
  		}
  	}




  	handleChange(e) {
  		console.log("Handling Change: "+ e.target.value);
        this.store.dispatch({type:"SET_STATE", value:{emailValue: e.target.value, userDoesNotExist: false, emailDoesNotExist:false, noUserEntered: false}});        
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)){
        	this.store.dispatch({type:"SET_STATE", value:{isEmail: true}});
        }
        else{
        	this.store.dispatch({type:"SET_STATE", value:{isEmail: false}});
        }
        if(e.target.value.length <= 0){
        		this.store.dispatch({type:"SET_STATE", value:{noUserEntered: true, userDoesNotExist: false, emailDoesNotExist:false}});
        		console.log("User state: "+this.state.userDoesNotExist);
        	}
        	else{
        		console.log("Target Value: "+e.target.value + " State Value: "+this.state.emailValue );
            	this.checkUserExists(e.target.value, this.state.isEmail);
        	}
    }

    handlePasswordChange(e) {
    	this.store.dispatch({type:"SET_STATE", value:{passwordValue: e.target.value}});
    	if(e.target.value.length > 0 && e.target.value.length < 8){

    		this.store.dispatch({type:"SET_STATE", value:{incorrectPassword: true}});
    	}
    	else{
    		
    			this.store.dispatch({type:"SET_STATE", value:{incorrectPassword: false}});
    		
    	}
    }

  	handleKeyDown(e) {

        if (e.keyCode === 13) {
        	

        }
    }
  	checkUserExists = (userEmailOrName, isEmail) => {
  		console.log("Emaaail: "+ this.state.emailValue);
  			let body = {
  				"usernameEmail": userEmailOrName,
  				"isEmail": isEmail
  			}
  			console.log("Calling with user: "+this.state.emailValue)
  			NetworkUtils.postRequest("https://www.api.worksimplr.com/api/v1/users/check-user-exists/", body, (resp)=>{
  				console.log("My Resp: "+JSON.stringify(resp));
  				if(resp.data != undefined && resp.data != null){
	  				if (resp.data.message !== "User Exists"){
	  					if(this.state.isEmail){
	  						this.store.dispatch({type:"SET_STATE", value:{emailDoesNotExist: true}});
	  					}
	  					else{
	  						this.store.dispatch({type:"SET_STATE", value:{userDoesNotExist: true}});
	  					}
	  				}
	  				else{
	  					this.store.dispatch({type:"SET_STATE", value:{userDoesNotExist: false, emailDoesNotExist: false}});
	  				}
  				}
  				if(resp.name == "Error"){
  					console.log("Error is thrown");
  					if(this.state.isEmail){
	  						this.store.dispatch({type:"SET_STATE", value:{emailDoesNotExist: true}});
	  					}
	  					else{
	  						this.store.dispatch({type:"SET_STATE", value:{userDoesNotExist: true}});
	  					}
  				}
  			});

  	}

	render() {
    return (
    			<div className="login-container">
				<div className="login-card">
					<img src={ titleImage } className="title-image" />
					<p className="title-text"><b>Log In</b></p>
					<div className="input-container">
					<div className="input-div">
						<Input size="large" placeholder="Username or Email ID" className="usernm-input" onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
					</div>
					<div className="left-image-div">
						<img src={UserGrey} className="left-img-user" />
					</div>
					<div className="right-image-div">
						<img src = {this.state.emailDoesNotExist || this.state.userDoesNotExist || this.state.noUserEntered ? crossImage : whiteBG } className="right-image" />
					</div>

					</div>


					<div className="error-div">
					{this.state.userDoesNotExist ? (<p className="error-message">Username does not Exist</p>) : (<p></p>)}
					{this.state.emailDoesNotExist ? (<p className="error-message">Email does not Exist</p>) : (<p></p>)}
					{this.state.noUserEntered ? (<p className="error-message">Please enter a username or email</p>) : (<p></p>)}
					</div>

					<br/>
					<div className="input-container">
					<div className="input-div">
					<Input type={this.state.securedPwdEntry ? "password" : "text"} size="large" placeholder="Password" className="usernm-input"  onChange={this.handlePasswordChange}/>
					</div>
					<div className="left-image-div">
						<img src={lockImage} className="left-img-lock" />
					</div>
					<div className="right-image-pw-div">
						<img src = {this.state.securedPwdEntry ? insecureEntry : secureEntry} className="right-image-pw" onClick={this.toggleSecuredPwdEntry} />
					</div>
					</div>
					<div className="error-div">
					{this.state.incorrectPassword ? (<p className="error-message">Invalid Password</p>) : (<p></p>)}
					</div>
					<p className="note-msg">Note: all fields are case sensitive</p>
					<br/>
					<br/>
					<div className="fpw">
						<a href="#">Forgot Password?</a>
					</div>
					<br/>
					<Button type="primary" size="large" shape="round" className="login-btn" onClick={this.login} >Login</Button>
					<br/>
					<br/>
					<div className="bottom-msg">
					<a href="#">Not a member? Register Now!</a>
					</div>
				</div>
				</div>
    	)	

	}
}

export default Login;