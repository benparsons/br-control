import React, { Component } from 'react';
import './Diary.css';
import VisGraph2dContainer from './VisGraph2dContainer';
import axios from 'axios';

class Weight extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      weights: []
    };
  }
  state = {
    startDate: new Date(),
    endDate: new Date()
  };


  componentDidMount() {
    var url = `http://localhost:1428/weights`;
    axios.get(url)
      .then(res => {
        
        console.log(res.data);
        this.setState({
          weights: res.data
        });
      });
  }

  render() {
    return (
        <div>
          <VisGraph2dContainer weights={this.state.weights} />

        </div>);
  }
}

export default Weight