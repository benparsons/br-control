import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { ProjectBlock } from './ProjectBlock';

class Tag extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        tags: {}
      };
    }
    componentDidMount() {
        const regex = /\/tag\/(.*)$/;
        const str = this.props.location.pathname;
        const out = str.match(regex);
        console.log(out);
        var url = `http://localhost:1428/tag/${out[1]}`;
        axios.get(url)
            .then(res => {
                console.log(res.data);
                this.setState({
                    tags: {[out[1]]: res.data}
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

export default Tag
