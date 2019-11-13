import React, { Component } from 'react';
import moment from 'moment';
import { doOpen } from './App';
export class TaskRow extends Component {
  render() {
    const taskClass = moment().isAfter(this.props.due) ? "overdue" : "";
    return (<>
      {!this.props.tags || this.props.filterTag === "" || this.props.tags.includes(this.props.filterTag)?
      <tr className={taskClass}>
      <td>{this.props.due}</td>
      <td>{this.props.title}</td>
      <td>{this.props.status}</td>
      <td>{JSON.stringify(this.props.tags, null, 1)}</td>
      <td><button onClick={() => { doOpen(this.props.name); }}>Open</button></td>
    </tr>:null}</>);
  }
}
