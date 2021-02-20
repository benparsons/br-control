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
  }

  setDue(name, when) {
    var url = `http://localhost:1428/set-field/${name}/task.due/${when.substr(0, 10)}`;
    axios.get(url)
      .then(res => {
        console.log(res);
      });
  }
  render() {
    let taskClass = "taskrow";
    if (moment().isAfter(this.props.due)) taskClass += " task-overdue";
    if (this.props.status === "done") taskClass += " task-done";
    return (<>
      {!this.props.tags || this.props.filterTag === "" || this.props.tags.includes(this.props.filterTag) ?
        <tr className={taskClass}>
          <td style={{ width: "10%" }}>{this.props.due}</td>
          <td style={{ width: "35%" }} onClick={() => { doOpen(this.props.name); }}>{this.props.title}</td>
          <td style={{ width: "10%" }}>{this.props.status}</td>
          <td style={{ width: "25%" }}>
            <small>{JSON.stringify(this.props.tags, null, 1)}</small>
          </td>
          <td style={{ width: "20%" }}>
            <button onClick={() => { doOpen(this.props.name); }}>Open</button>
            <button onClick={() => { this.setDone(this.props.name); }}>Done</button>
            <button
              onClick={() => { this.setDue(this.props.name, moment().add(1, 'days').toISOString()); }}>
              Tomorrow
            </button>
            <br />
            <button
              onClick={() => { this.setDue(this.props.name, moment().add(7, 'days').toISOString()); }}>
              Next Week
            </button>
            <button
              onClick={() => { this.setDue(this.props.name, moment().add(31, 'days').toISOString()); }}>
              Next Month
            </button>
          </td>
        </tr> : null}</>);
  }
}
