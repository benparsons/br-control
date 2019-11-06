import React, { Component } from 'react';
import moment from 'moment';
import { doOpen } from './App';
export class TaskRow extends Component {
  render() {
    const taskClass = moment().isAfter(this.props.due) ? "overdue" : "";
    return (<tr onClick={() => { doOpen(this.props.name); }} className={taskClass}>
      <td>{this.props.due}</td>
      <td>{this.props.title}</td>
      <td>{this.props.status}</td>
      <td>{JSON.stringify(this.props.tags)}</td>
    </tr>);
  }
}
