import React, { Component } from 'react';
import axios from 'axios';

class SingleTagPanel extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        tasks: []
      };
    }
    componentDidMount() {
      var url = `http://localhost:1428/tag/${this.props.tag}`;
      axios.get(url)
        .then(res => {
          this.setState({
            tasks: res.data
          });
        });
    }
    render() {
      let tasks = this.state.tasks.filter(t => ! t.task || t.task.status === "active");
      const lines = tasks.map((task, index) => {
        return (
          <tr key={task.name}>
            <td>{task.title}</td>
          </tr>
        );
      });
      return (
        <div className="tasklist-block">
          <h2><a href={"/tag/" + this.props.tag}>{this.props.tag}</a></h2>
          <table><tbody>{lines}</tbody></table>
        </div>
      )
    }
  }

export default SingleTagPanel;