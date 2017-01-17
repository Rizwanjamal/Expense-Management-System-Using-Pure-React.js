import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header.js';
import {Link,hashHistory} from 'react-router';

class AddExpense extends Component {
    constructor(props){
        super(props);
        console.log('params :', props.params.id);
        this.state= {};
        this.myCategories = [];
        this.expenses = JSON.parse(localStorage.getItem('allExpenses')) || [];
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.allCategories = JSON.parse(localStorage.getItem('allCategories'));
        if(this.allCategories){
            this.allCategories.forEach((category)=>{
                if(category.userId == this.user.userId){
                    this.myCategories.push(category);
                }
            });
        }
        (props.params.id) ?
            this.expenses.forEach((expense,index)=> {
                if(expense.Id == props.params.id){
                        this.state = expense;
                        this.index = index;
                }
            })
            :
            this.state={Id: '', userId: this.user.userId, description: '', amount: '' , category: '' , date: ''}
    }
    handleSubmit(event) {
        if(this.props.params.id){
            this.expenses.splice(this.index,1);
            this.expenses.push(this.state);
            localStorage.setItem('allExpenses' , JSON.stringify(this.expenses));
            alert('Expense Is Updated !');
            hashHistory.push('/dashboard');
        }
        else{
            this.state.date= new Date().toLocaleString();
            this.state.Id=Math.floor(Math.random(1)*100000);
            this.expenses.push(this.state);
            this.setState({description: '', amount: '' , category: ''});
            localStorage.setItem('allExpenses' , JSON.stringify(this.expenses));
            alert('Expense Is Added !');
        }
        event.preventDefault();
    }
    handleChange(event) {
        this.setState({
        [event.target.dataset.field]: event.target.value
        });
    }

    render() {
        const buttonText =
        (this.props.params.id)? <span>Update</span> : <span>Add</span> ;

        const titleText =
            (this.props.params.id)? <span>Edit Expense</span> : <span>Add Expense</span> ;

        let options= [];
        this.myCategories.forEach((category)=>{
            options.push(<option value={category.categoryName} key={category.Id}>{category.categoryName}</option>);
        });
        return (
            <div className="App">
                <Header backPage='dashboard' user={this.user}/>
                <div className="App-intro">
                    <h1>{titleText}</h1>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <fieldset>
                            <legend>{titleText}</legend>
                            <span className="descriptionLabel">Description :</span>  <input type="text" value={this.state.description}
                                                 data-field="description" required
                                                 onChange={this.handleChange.bind(this)} /><br />
                            <span>Amount :</span>       <input type="number" value={this.state.amount}
                                                 data-field="amount" required
                                                 onChange={this.handleChange.bind(this)} /><br />
                            <span className="categoryLabel">Category :</span>
                            <select value={this.state.category} data-field="category" required
                                    onChange={this.handleChange.bind(this)} className="select">
                                <option value="">Select Category</option>
                                {options}
                            </select><br />
                            <button type="submit" className="Add-Button">{buttonText}</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}


export default AddExpense;
