import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import EntryListSet from './EntryListSet';
import SingleTagPanel from './SingleTagPanel';
import CreateTaskPanel from './CreateTaskPanel';
import config from "./config.json";


export function doOpen(name) {
  var url = `http://localhost:1428/open/${name}`;
  axios.get(url)
    .then(res => {
      console.log(res);
    });
}

class DailyTaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    };
  }
  componentDidMount() {
    var url = `http://localhost:1428/daily-tasks`;
    axios.get(url)
      .then(res => {
        this.setState({
          tasks: res.data
        });
      });
  }
  render() {
    const lines = this.state.tasks.map((task, index) => {
      return (
        <tr key={task.name}>
          <td>{task.title}</td>
        </tr>
      );
    });
    return (
      <div className="tasklist-block">
        <h2>Daily Tasks</h2>
        <table><tbody>{lines}</tbody></table>
      </div>
    )
  }
}


class App extends Component {

  render() {
    const taskLists = [];
    taskLists.push({statuses:"active,dormant", datemode:"due", count:"60"});
    taskLists.push({statuses:"active", datemode:"undated", count:"60"});
    const tagPanels = config.homepage.tagPanels;
    return (
      <div>
        <div>
          <div style={{"float":"left"}}><CreateTaskPanel /></div>
          <div style={{"float":"left"}}><DailyTaskList /></div>
          {tagPanels.map(tag => {
            return(
              <div key={tag} style={{"float":"left"}}><SingleTagPanel tag={tag} /></div>
            )
          })}
        </div>
        
        <EntryListSet taskLists={taskLists} />
      </div>
    );
  }
}

export default App;
