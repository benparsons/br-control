import React, { Component } from 'react';
import moment from 'moment';
import { doOpen } from './App';
export class TaskRow extends Component {
  render() {
    const taskClass = moment().isAfter(this.props.due) ? "overdue" : "";
    return (<>
      {!this.props.tags || this.props.filterTag === "" || this.props.tags.includes(this.props.filterTag)?
      <tr className={taskClass}>
      <td style={{width:"10%"}}>{this.props.due}</td>
      <td style={{width:"35%"}} onClick={() => { doOpen(this.props.name); }}>{this.props.title}</td>
      <td style={{width:"10%"}}>{this.props.status}</td>
      <td style={{width:"35%"}}>{JSON.stringify(this.props.tags, null, 1)}</td>
      <td style={{width:"10%"}}><button onClick={() => { doOpen(this.props.name); }}>Open</button></td>
    </tr>:null}</>);
  }
}
