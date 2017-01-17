import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header.js';
import {Link,hashHistory} from 'react-router';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.myExpenses = [];
        this.allExpenses = JSON.parse(localStorage.getItem('allExpenses'));
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        if(this.allExpenses){
            this.allExpenses.forEach((expense)=>{
                if(expense.userId == this.user.userId){
                    this.myExpenses.push(expense);
                }
            });
        }
        this.state={expenses: this.myExpenses,filterText: ''};
        console.log('user :',this.user);
        console.log('myExpenses :',this.myExpenses);
    }
    handleChange(event){
        this.setState({filterText: event.target.value});
    }
    handleEdit(expense){
        console.log('expense for edit :',expense);
        hashHistory.push('edit/'+expense.Id);
    }
    handleDelete(deleteExpense){
        console.log('expense for Delete :',deleteExpense);
        this.state.expenses.forEach((expense,index)=> {
            if(expense.Id == deleteExpense.Id){
                this.index = index;
            }
        });
        this.state.expenses.splice(this.index,1);
        localStorage.setItem('allExpenses' , JSON.stringify(this.state.expenses));
        this.setState({expenses:JSON.parse(localStorage.getItem('allExpenses'))});
    }
    render() {
        let rows= [];
        let printRows = [];
        let reportExpense = [];
        this.state.expenses.forEach((expense)=>{
            if(expense.category.indexOf(this.state.filterText) === -1){
                return;
            }
            rows.push(<ExpenseTable expense={expense} key={expense.Id}
                                    onEdit={this.handleEdit.bind(this)}
                                    onDelete={this.handleDelete.bind(this)}
            />);
            reportExpense.push(expense);
            //printRows.push(<PrintRowContent expense={expense} key={expense.Id}/>);
        });
        function generateReport() {
            let total = 0;
            /*let printContents = <GenerateReport />;
            console.log('printContents:', printContents);*/
            let printContents = window.document.getElementById('expenses').innerHTML;
            for(var i=0;i<reportExpense.length;i++){
                total += +(reportExpense[i].amount);
            }
            const popupWin = window.open('', '_blank', 'width=600,height=600');
            function check() {
                if(popupWin.document) {
                    popupWin.document.title = "Expense Report";
                }
                else {
                    setTimeout(check, 10);
                }
            }
            check();
            popupWin.document.write('<html><title>Expense Report</title><link rel="stylesheet" type="text/css" href="App.css"><body onload="window.print()"><h3>My Expenses</h3>'+printContents+'</html>');
            /*popupWin.document.write('<html><head><title>Expense Report</title><link rel="stylesheet" type="text/css" href="App.css"></head><body onload="window.print()"><div><h1>All Expenses</h1><table class="table"> <tbody> <tr> <th class="table-border">Id</th> <th class="table-border">Description</th> <th class="table-border">Amount</th> <th class="table-border">Category</th> <th class="table-border">Created On</th> </tr></tbody> </table></div></html>');
            for(var i=0;i<reportExpense.length;i++){
                console.log('called');
                popupWin.document.write('<html><body><table><tr><td>'+reportExpense[i].Id+'</td><td>'+reportExpense[i].description+'</td><td>'+reportExpense[i].amount+'</td><td>'+reportExpense[i].category+'</td><td>'+reportExpense[i].date+'</td></tr></table></body></html>');
            }*/
            popupWin.document.write('<br /> <span><b>Total Expense = '+ total +'</b></span>');
            popupWin.document.close();
        }
        return (
            <div className="App">
                <Header user={this.user}/>
                <div className="App-intro">
                    <div>
                        <h1>All Expenses</h1>
                        <button><Link to="/add">Add Expense!</Link></button>
                        <button><Link to="/allCategories">All Categories!</Link></button>
                        <button onClick={generateReport}>Generate Report</button>
                        <div>
                            <input
                                type="text"
                                placeholder="Search By Category..."
                                value={this.state.filterText}
                                onChange={this.handleChange.bind(this)}
                            />
                        </div>
                        <div id="expenses">
                        <table className="table">
                            <tbody>
                            <tr>
                                <th className="table-border">Id</th>
                                <th className="table-border">Description</th>
                                <th className="table-border">Amount</th>
                                <th className="table-border">Category</th>
                                <th className="table-border">Created On</th>
                                <th className="table-border">Actions</th>
                            </tr>
                            {rows}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class ExpenseTable extends Component {
    handleEdit(){
        this.props.onEdit(this.props.expense);
    }

    handleDelete(){
        this.props.onDelete(this.props.expense);
    }
    render() {
        let expense = this.props.expense;
        return (
            <tr>
                <td className="table-border">{expense.Id}</td>
                <td className="table-border">{expense.description}</td>
                <td className="table-border">{expense.amount}</td>
                <td className="table-border">{expense.category}</td>
                <td className="table-border">{expense.date}</td>
                <td className="table-border">
                    <button onClick={this.handleEdit.bind(this)}>Edit</button>
                    <button onClick={this.handleDelete.bind(this)}>Delete</button>
                </td>
            </tr>
        )
    }
}

/*class GenerateReport extends Component {
    render() {
        return(
            <div>
                <h1>All Expenses</h1>
                <table className="table">
                    <tbody>
                    <tr>
                        <th className="table-border">Id</th>
                        <th className="table-border">Description</th>
                        <th className="table-border">Amount</th>
                        <th className="table-border">Category</th>
                        <th className="table-border">Created On</th>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}*/

/*class PrintRowContent extends Component {
    render() {
        let expense = this.props.expense;
        return (
            <tr>
                <td className="table-border">{expense.Id}</td>
                <td className="table-border">{expense.description}</td>
                <td className="table-border">{expense.amount}</td>
                <td className="table-border">{expense.category}</td>
                <td className="table-border">{expense.date}</td>
            </tr>
        )
    }
}*/


export default Dashboard;
