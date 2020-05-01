import React, { Component } from 'react';
import axios from 'axios';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

function doOpen(name) {
    var url = `http://localhost:1428/open/${name}`;
    axios.get(url)
      .then(res => {
        console.log(res);
      });
  }

  

class Entry extends Component {

    handleChange = value => {
      this.setState({ mdeValue: value });
    };
    render() {
        
        return (
          <div>
            <div className="leftDiv">
                <div dangerouslySetInnerHTML={{__html: this.props.html}}></div>
                <SimpleMDE
                  onChange={this.handleChange}
                  value={this.props.raw}
                  />;
            </div>
            <div className="leftDiv">
                <h2>Missing</h2>
                <ul>
                {this.props.missing && 
                this.props.missing.map(item => {
                return (<li key={'item_' + item}>{item}</li>)})
                  }
                  </ul>
                <hr />
                <h2>FM</h2>
                <pre>{JSON.stringify(this.props.fm, null, 2)}</pre>
                <hr />
                <button onClick={() => {doOpen(this.props.name)}}>Open</button>
            </div>
            <br clear="all"/>
            <hr />
          </div>
        );
      }
}

export default Entry