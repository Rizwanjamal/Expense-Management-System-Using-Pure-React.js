import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header.js';
import {Link,hashHistory} from 'react-router';

class AllCategories extends Component {
    constructor(props){
        super(props);
        this.myCategories = [];
        this.allCategories = JSON.parse(localStorage.getItem('allCategories'));
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        if(this.allCategories){
            this.allCategories.forEach((category)=>{
                if(category.userId == this.user.userId){
                    this.myCategories.push(category);
                }
            });
        }
        this.state={categories: this.myCategories};
        console.log('user :',this.user);
        console.log('myCategories :',this.myCategories);

    }

    handleAdd(event){
        hashHistory.push('/addCategory');
    }

    render() {
        let rows= [];
        this.state.categories.forEach((category)=>{
            rows.push(<CategoryTable category={category} key={category.Id} />);
        });
        return (
            <div className="App">
                <Header user={this.user} backPage="dashboard"/>
                <div className="App-intro">
                    <div>
                        <h1>All Categories</h1>
                        <button className="btn btn-primary" onClick={this.handleAdd.bind(this)}>Add Category!</button>
                        <div className="table-responsive">
                        <table className="table table-bordered table-hover table-border">
                            <tbody>
                            <tr>
                                <th className="table-border">Id</th>
                                <th className="table-border">Category Name</th>
                                <th className="table-border">Created On</th>
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


class CategoryTable extends Component {
    render() {
        let category = this.props.category;
        return (
            <tr>
                <td className="table-border">{category.Id}</td>
                <td className="table-border">{category.categoryName}</td>
                <td className="table-border">{category.date}</td>
            </tr>
        )
    }
}

export default AllCategories;

