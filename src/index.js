import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import Tasks from './Tasks';
import Diary from './Diary';
import EntryView from './EntryView';
import TagsList from './TagsList';
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/tasks" component={Tasks} />
        <Route path="/diary" component={Diary} />
        <Route path="/tags" component={TagsList} />
        <Route path="/*.html" component={EntryView} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
