import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header.js';
import {Link,hashHistory} from 'react-router';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {userId: '', userName: '', email: '', password: ''};
        this.users = JSON.parse(localStorage.getItem('allUsers')) || [];
    }
    handleChange(event){
        this.setState({
            [event.target.dataset.field]: event.target.value
        });
    }
    handleSubmit(event){
        this.state.userId=Math.floor(Math.random(1)*100000);
        this.users.push(this.state);
        localStorage.setItem('allUsers' , JSON.stringify(this.users));
        localStorage.setItem('currentUser', JSON.stringify(this.state));
        this.setState({userName: '', email: '' , password: ''});
        alert('Your Account Is Created Successfully !');
        hashHistory.push('dashboard');
    }

    handleSignIn(event){
        console.log('sign In');
        hashHistory.push('/signIn');
    }
    render() {
        return (
            <div className="App">
                <Header />
                <div className="App-intro">
                        <h1>Sign Up</h1>
                    <table className="signupForm">
                        <tbody>
                        <tr>
                        <td>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <fieldset>
                                    <legend>Sign Up</legend>
                                    <label className="signupLabels">UserName :
                                        <input type="text" value={this.state.userName}
                                               data-field="userName" required
                                               onChange={this.handleChange.bind(this)}/></label><br />
                                    <label className="signupLabels">Email :
                                        <input type="email" value={this.state.email}
                                               data-field="email" required
                                               onChange={this.handleChange.bind(this)}/></label><br />
                                    <label className="signupLabels">Password :
                                        <input type="text" value={this.state.password}
                                               data-field="password" required
                                               onChange={this.handleChange.bind(this)}/></label><br /><br />
                                    <button type="submit">Sign Up</button><br /><br />
                                    <span>_______or_______</span><br /><br />
                                    <button onClick={this.handleSignIn.bind(this)}>Sign In</button><br /><br />
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


export default App;
