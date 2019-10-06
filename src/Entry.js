import React, { Component } from 'react';
import axios from 'axios';

function doOpen(name) {
    var url = `http://localhost:1428/open/${name}`;
    axios.get(url)
      .then(res => {
        console.log(res);
      });
  }

class Entry extends Component {
    render() {
        return (
          <div>
            <div className="leftDiv">
                <div dangerouslySetInnerHTML={{__html: this.props.html}}></div>
            </div>
            <div className="leftDiv">
                <pre>{JSON.stringify(this.props.missing, null, 2)}</pre>
                <hr />
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