import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment';

function doOpen(name) {
  var url = `http://localhost:1428/open/${name}`;
  axios.get(url)
    .then(res => {
      
      console.log(res);
    });
}

class TaskList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tasks: []
    };
  }
  componentDidMount() {
    var url = `http://localhost:1428/tasks/${this.props.count}`;
    axios.get(url)
      .then(res => {
        
        console.log(res.data);
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
        <TaskRow  key={task.name}
          name={task.name}
          due={due}
          title={task.title}
          status={task.fm.task.status}
          />
      );
    });
    return (
      <div className="tasklist-block">
        <h2>Tasks</h2>
        <table><tbody>{lines}</tbody></table>
      </div>
    )
  }
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
        
        console.log(res.data);
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
        <TaskRow  key={task.name}
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

class TaskRow extends Component {
  render() {
    return (
      <tr onClick={() => {doOpen(this.props.name)}}>
        <td>{this.props.due}</td>
        <td>{this.props.title}</td>
        <td>{this.props.status}</td>
      </tr>
    );
  }
}

class ProjectBlock extends Component {

  render() {
    var tasks = [];
    this.props.tasks.forEach(task => {
      tasks.push(<TaskRow key={task.name} 
        name={task.name} 
        title={task.title} status={task.status} />);
    });
    return <div>
      <h3>{this.props.name}</h3>
      <table><tbody>{tasks}</tbody></table>
    </div>;
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
    console.log(this.state.projects);
    Object.keys(this.state.projects).forEach(name =>{
      projects.push(<ProjectBlock key={name} name={name} tasks={this.state.projects[name]} />);
    });
    return <div className="tasklist-block">{projects}</div>
  }
}

class TagsList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tags: {}
    };
  }
  componentDidMount() {
    var url = `http://localhost:1428/tags/`;
    axios.get(url)
    .then(res => {
      
      this.setState({
        tags: res.data
      });
    });
  }

  render() {
    return <div className="tasklist-block">{JSON.stringify(this.state.tags)}</div>;
  }
}
class App extends Component {

  render() {
    return (
      <div>
        <DailyTaskList  />
        <TaskList count="60" />
        <ProjectsList />
        <TagsList />
      </div>
    );
  }
}

export default App;
