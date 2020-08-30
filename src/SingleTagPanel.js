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
      const lines = this.state.tasks.map((task, index) => {
        return (
          <tr key={task.name}>
            <td>{task.title}</td>
          </tr>
        );
      });
      return (
        <div className="tasklist-block">
          <h2>{this.props.tag}</h2>
          <table><tbody>{lines}</tbody></table>
        </div>
      )
    }
  }

export default SingleTagPanel;