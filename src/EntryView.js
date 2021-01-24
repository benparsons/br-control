import React, { Component } from 'react';
import axios from 'axios';
import Entry from './Entry.js';
import { doOpen } from './App';

class EntryView extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      entry: {
        raw: "",
        fm: ""
      },
      path: ""
    };
  }

  componentDidMount() {

    const regex = /\/entry\/(.*)$/;
    const str = this.props.location.pathname;
    const out = str.match(regex);
    this.setState({
      path: out[1]
    });

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
        {this.state.entry.raw &&
          <div>
            <Entry
              html={this.state.entry.html}
              missing={this.state.entry.missing}
              fm={this.state.entry.fm}
              raw={this.state.entry.raw}
            />
          </div>
        }
        {!this.state.entry.raw &&
          <div>{this.state.path} not found.&nbsp;
          <button>Create {this.state.path}</button></div>
        }
      </div>);
  }
}

export default EntryView