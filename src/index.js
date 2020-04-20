import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Sobre from './Sobre';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/sobre" component={Sobre} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);