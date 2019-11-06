import React, { Component } from 'react';
import { TaskRow } from './TaskRow';

export class ProjectBlock extends Component {

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
