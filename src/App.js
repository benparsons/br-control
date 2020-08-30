import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { ProjectBlock } from './ProjectBlock';
import TaskListSet from './TaskListSet';
import SingleTagPanel from './SingleTagPanel';


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

class ProjectsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: {}
    };
  }
  componentDidMount() {
    var url = `http://localhost:1428/projects/`;
    axios.get(url)
      .then(res => {

        this.setState({
          projects: res.data
        });
      });
  }
  render() {
    var projects = [];
    Object.keys(this.state.projects).forEach(name => {
      projects.push(<ProjectBlock key={name} name={name} tasks={this.state.projects[name]} />);
    });
    return <div className="tasklist-block">{projects}</div>
  }
}


class App extends Component {

  render() {
    const taskLists = [];
    taskLists.push({statuses:"active,dormant", datemode:"due", count:"60"});
    taskLists.push({statuses:"active", datemode:"undated", count:"60"});
    const tagPanels = ["mantra", "work-focus", "before-2021-travel",
      "tech-skills-for-remote-work",  "mushroom-app", "2020-goals", "flat-7-revival"];
    return (
      <div>
        <div>
          <div style={{"float":"left"}}><DailyTaskList /></div>
          {tagPanels.map(tag => {
            return(
              <div key={tag} style={{"float":"left"}}><SingleTagPanel tag={tag} /></div>
            )
          })}
        </div>
        
        <TaskListSet taskLists={taskLists} />
        <ProjectsList />
      </div>
    );
  }
}

export default App;
