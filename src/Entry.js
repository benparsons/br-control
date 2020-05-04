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

  

    class Entry extends Component {  constructor(props) {
      super(props);
      
      this.state = {
        entryBody: "",
        fm: ""
      };
    }

    componentDidUpdate(prevProps) {
      if (prevProps.raw !== this.props.raw) {
        console.log("raw change")
        var fmEnd = this.props.raw.indexOf("\n---") + 4;
        this.setState({
          entryBody: this.props.raw.substring(fmEnd).trim(),
          fm: this.props.raw.substring(0, fmEnd).trim()
        })
        console.log()
      }
    }

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
                  value={this.state.entryBody}
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
                <textarea
                  cols="80" rows="15"
                  value={this.state.fm}
                  onChange={(val) => console.log(val)}>
                </textarea>
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