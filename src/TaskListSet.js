import React, { Component } from 'react';
import TaskList from './TaskList';

class TaskListSet extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        tags: [],
        filterTag: ""
      };
    }
  
    addTag(tag) {
      var newTags = this.state.tags;
      if (!newTags.includes(tag)) newTags.push(tag);
      this.setState({
        tags: newTags
      })
    }
    render() {
        const tagButtons = this.state.tags.map((tag) => {
    
          return (<button key={tag}
            onClick={() => {
              this.setState({ filterTag: tag })
            }}>{tag}</button>);
        });
        return (
            <div className="tasklist-block">
          <h2>Tasks</h2>
          <button onClick={() => {
            this.setState({ filterTag: "" })
          }}>Clear Tag Filter</button>
          <div>{tagButtons}</div>
          {this.props.taskLists.map((taskList) => {
            return(<TaskList
              addTag={(tag) => this.addTag(tag)}
              filterTag={this.state.filterTag}
              statuses={taskList.statuses}
              datemode={taskList.datemode}
              count={taskList.count}  />)
          })}
        </div>
        )
    }
}

export default TaskListSet;