import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { ProjectBlock } from './ProjectBlock';

class TagsList extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        tags: {}
      };
    }
    componentDidMount() {
      var url = `http://localhost:1428/tags/`;
      axios.get(url)
      .then(res => {
        
        this.setState({
          tags: res.data
        });
      });
    }
  
    render() {
  
      var tags = [];
      console.log(this.state.tags);
      Object.keys(this.state.tags).forEach(name =>{
        tags.push(<ProjectBlock key={name} name={name} tasks={this.state.tags[name]} />);
      });
      
      return <div className="tasklist-block">{tags}</div>
      
      //return <div className="tasklist-block">{JSON.stringify(this.state.tags)}</div>;
    }
}

export default TagsList
