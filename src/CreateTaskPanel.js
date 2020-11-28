import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';

class CreateTaskPanel extends Component {
    constructor(props) {
      super(props);
      this.state = {
        due: moment().format("YYYY-MM-DD"),
        title: ""
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
      alert('An essay was submitted: ' + JSON.stringify(this.state));
      let dataObj = {
        "title": this.state.title,
        "frontMatter": {
          tags: [],
          task: {
            "due": this.state.due,
            status: "active"
          }
        },
        "body": "",
        "category": "gtd"
      };
      axios.post("http://localhost:1428/create-entry", dataObj);
      event.preventDefault();
    }

    handleChange(event) { 
      const name = event.target.name;
      this.setState({[name]: event.target.value});
    }

    render() {
      return (
        <div className="CreateTaskPanel">
          <h2>CreateTaskPanel</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Title" /><br />
            <input type="text" name="due" value={this.state.due} onChange={this.handleChange} /><br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      )
    }
  }

export default CreateTaskPanel;
