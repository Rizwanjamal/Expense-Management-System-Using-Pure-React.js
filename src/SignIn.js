import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header.js';
import {Link,hashHistory} from 'react-router';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {email: '', password: ''};
        this.users = JSON.parse(localStorage.getItem('allUsers')) || [];
    }
    handleChange(event){
        this.setState({
            [event.target.dataset.field]: event.target.value
        });
    }
    handleSubmit(event){
        console.log('submit event');
        this.error='';
        let validation = this.users.some((user)=>{
            if(user.email == this.state.email && user.password == this.state.password){
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.setState({email: '' , password: ''});
                hashHistory.push('/dashboard');
                return true;
            }
        });
        {(validation == false) ?
           this.error=<span className="error">Enter the correct credentials !</span>
            :
            this.error=''
        }
        this.setState({email: '', password: ''});
    }
    render() {
        return (
            <div className="App">
                <Header />
                <div className="App-intro">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label className="control-label" htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter Email"
                                   value={this.state.email}
                                   data-field="email" required
                                   onChange={this.handleChange.bind(this)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control" id="password" placeholder="Password"
                                   value={this.state.password}
                                   data-field="password" required
                                   onChange={this.handleChange.bind(this)}/>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary" type="submit" >Sign In</button><br /><br />
                        </div>
                        {this.error}

                    </form>

                </div>
            </div>
        );
    }
}


export default SignIn;
