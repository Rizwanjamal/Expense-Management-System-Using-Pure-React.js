import React, {Component} from 'react';
import logo from './expense-report-icon_63766.png';
import './App.css';
import {Link,hashHistory} from 'react-router';

class Header extends Component {

    handleLogout(event){
        localStorage.removeItem('currentUser');
        hashHistory.push('/');
    }
    render(){
        let backButton = null;
        let welcomeMessage = null;
        if(this.props.backPage){
            {this.props.backPage === 'dashboard' ?(
                backButton = <button><Link to="/dashboard">Back To Dashboard</Link></button>
            ):
            ((this.props.backPage === 'categories') ?(
                backButton = <button><Link to="/allCategories">Back To Categories</Link></button>
            ):(
                backButton = ''
            ))

            }
        }
        {this.props.user ?
            welcomeMessage =  (<div className="welcomeMessage">{'Welcome ' + this.props.user.userName.toUpperCase() + ' !'}
                    <button className="btn btn-default logoutButton" href="" onClick={this.handleLogout.bind(this)}>Logout</button></div>
            ):(
            welcomeMessage = ''
            )
        }

        return(
            <div>
                <div className="App-header">
                    {welcomeMessage}
                    <img src={logo} className="App-logo" alt="logo" />
                    <div>
                        <span>{backButton}</span>
                        <span><h2>Welcome To Expense Management System</h2></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;
