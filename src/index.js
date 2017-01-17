import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import AddExpense from './addExpense';
import AllCategories from './allCategories';
import AddCategory from './addCategory';
import './index.css';
import {Router , Route, hashHistory} from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
      <Route path="/" component={App} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/add" component={AddExpense} />
      <Route path="/edit/:id" component={AddExpense} />
      <Route path="/addCategory" component={AddCategory} />
      <Route path="/allCategories" component={AllCategories} />
  </Router>,
  document.getElementById('root')
);
