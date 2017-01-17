import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header.js';
import {Link,hashHistory} from 'react-router';

class AddCategory extends Component {
    constructor(props){
        super(props);
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.categories = JSON.parse(localStorage.getItem('allCategories')) || [];
        this.state = { Id: '', userId: this.user.userId, categoryName: '' , date: ''};
    }
    handleSubmit(event) {
            this.state.date= new Date().toLocaleString();
            this.state.Id=Math.floor(Math.random(1)*100000);
            this.categories.push(this.state);
            this.setState({categoryName: ''});
            localStorage.setItem('allCategories' , JSON.stringify(this.categories));
            alert('Category Is Added !');
            event.preventDefault();
    }
    handleChange(event) {
        this.setState({categoryName : event.target.value, date: new Date()});
    }

    render() {
        return (
            <div className="App">
                <Header backPage='categories' user={this.user}/>
                <div className="App-intro">
                    <h1>Add Category</h1>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <fieldset>
                            <legend>Add Category</legend>
                            <span>Category Name :</span>  <input type="text"
                                                           value={this.state.categoryName}
                                                           onChange={this.handleChange.bind(this)} /><br />
                            <button type="submit" className="Add-Button">Add</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}


export default AddCategory;
