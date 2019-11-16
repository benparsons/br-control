import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment';
import TagsList from './TagsList';
import { TaskRow } from './TaskRow';
import { ProjectBlock } from './ProjectBlock';
import TaskListSet from './TaskListSet';


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
      var due = task.fm.task.due
        ? moment(task.fm.task.due).format('YYYY-MM-DD')
        : "";
      return (
        <TaskRow key={task.name}
          name={task.name}
          due={due}
          title={task.title}
        />
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
    return (
      <div>
        <DailyTaskList />
        <TaskListSet />
        <ProjectsList />
      </div>
    );
  }
}

export default App;
