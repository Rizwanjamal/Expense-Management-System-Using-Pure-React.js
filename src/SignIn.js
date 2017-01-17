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
                    <h1>Sign In</h1>
                    <table className="signupForm">
                        <tbody>
                        <tr>
                            <td>
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <fieldset>
                                        <legend>Sign In</legend>
                                        <label className="signupLabels">Email :
                                            <input type="email" value={this.state.email}
                                                   data-field="email" required
                                                   onChange={this.handleChange.bind(this)}/></label><br />
                                        <label className="signupLabels">Password :
                                            <input type="password" value={this.state.password}
                                                   data-field="password" required
                                                   onChange={this.handleChange.bind(this)}/></label><br /><br />
                                        <button type="submit" >Sign In</button><br /><br />
                                        {this.error}
                                    </fieldset>
                                </form>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


export default SignIn;
