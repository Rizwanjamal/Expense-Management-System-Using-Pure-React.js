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

                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label className="control-label" htmlFor="name">User Name:</label>
                            <input type="text" className="form-control" id="name" placeholder="Enter Name"
                                   value={this.state.userName}
                                   data-field="userName" required
                                   onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter Email"
                                   value={this.state.email}
                                   data-field="email" required
                                   onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" className="form-control" id="password" placeholder="Password"
                                   value={this.state.password}
                                   data-field="password" required
                                   onChange={this.handleChange.bind(this)}/>
                        </div>

                        <div className="form-group">
                        <button type="submit" className="btn btn-primary">Sing Up</button>
                        </div>

                        <div className="form-group">
                        <span>_______or_______</span><br /><br />
                        <button className="btn btn-info" onClick={this.handleSignIn.bind(this)}>Sign In</button><br /><br />
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}


export default App;
