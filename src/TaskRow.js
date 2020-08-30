import React, { Component } from 'react';
import moment from 'moment';
import { doOpen } from './App';
import axios from 'axios';
export class TaskRow extends Component {
  setDone(name) {

  var url = `http://localhost:1428/set-field/${name}/task.status/done`;
  axios.get(url)
    .then(res => {
      console.log(res);
    });
    
    alert(name);
  }
  render() {
    const taskClass = moment().isAfter(this.props.due) ? "overdue" : "";
    return (<>
      {!this.props.tags || this.props.filterTag === "" || this.props.tags.includes(this.props.filterTag)?
      <tr className={taskClass}>
      <td style={{width:"10%"}}>{this.props.due}</td>
      <td style={{width:"35%"}} onClick={() => { doOpen(this.props.name); }}>{this.props.title}</td>
      <td style={{width:"10%"}}>{this.props.status}</td>
      <td style={{width:"35%"}}>{JSON.stringify(this.props.tags, null, 1)}</td>
      <td style={{width:"10%"}}>
        <button onClick={() => { doOpen(this.props.name); }}>Open</button>
        <button onClick={() => { this.setDone(this.props.name); }}>Done</button>
      </td>
    </tr>:null}</>);
  }
}
