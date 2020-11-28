import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';

class CreateTaskPanel extends Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
    }
    render() {
      return (
        <div className="CreateTaskPanel">
          <h2>CreateTaskPanel</h2>
          <table>
            <input type="text" name="title" placeholder="Title" /><br />
            <input type="text" name="due" value={moment().format("YYYY-MM-DD")} /><br />
            <button>Create</button>
          </table>
        </div>
      )
    }
  }

export default CreateTaskPanel;
