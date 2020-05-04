import React, { Component } from 'react';
import axios from 'axios';
import Entry from './Entry.js';

class EntryView extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      entry: {}
    };
  }

  componentDidMount() {

    const regex = /\/entry\/(.*)$/;
    const str = this.props.location.pathname;
    const out = str.match(regex);

    var url = `http://localhost:1428/get/${out[1]}`;
    axios.get(url)
      .then(res => {
        this.setState({
          entry: res.data
        });
      });
  }
  render() {
    
    return (
        <div>
            <Entry
              html={this.state.entry.html}
              missing={this.state.entry.missing}
              fm={this.state.entry.fm}
              raw={this.state.entry.raw}
              />
        </div>);
  }
}

export default EntryView