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
        showPreview: false,
        closed: this.props.closed
      };
    }

    componentDidUpdate(prevProps) {

    }

    handleChange = value => {
      this.setState({ mdeValue: value });
    };
    togglePreview = () => {
      this.setState({showPreview: !this.state.showPreview})
    };
    render() {
        var fmEnd = this.props.raw.indexOf("\n---") + 4;
        var entryBody = this.props.raw.substring(fmEnd).trim()
        var fm = this.props.raw.substring(0, fmEnd).trim()
        return (
          <div>
            <div
              onClick={()=> this.setState({closed: !this.state.closed})}
            >{this.props.fm.date}{this.props.fm.summary}</div>
            <div hidden={this.state.closed}>
              <div className="leftDiv">
                  <SimpleMDE
                    onChange={this.handleChange}
                    value={entryBody}
                    />
              </div>
              <div className="leftDiv">
                <h2>Tags</h2>
                <ul>
                  {this.props.fm && this.props.fm.tags &&
                    this.props.fm.tags.map((item, i) => {
                      return (<li key={'item_' + i + "_" + this.props.title + "_" + item}>{item}</li>)
                    })}
                </ul>
                <h2>Missing</h2>
                <ul>
                  {
                    this.props.missing && this.props.missing.map((item, i) => {
                      return (
                        <li key={'item_' + i + "_" + this.props.title + "_" + item}>
                          <a href={"/entry/" + item}>{item}</a>
                        </li>
                      )
                    })
                  }
                </ul>
                  <hr />
                  <h2>FM</h2>
                  <textarea
                    cols="80" rows="15"
                    value={fm}
                    onChange={(val) => console.log(val)}>
                  </textarea>
                  <hr />
                  <h2>HTML</h2>
                  <button onClick={this.togglePreview}>{this.state.showPreview ? "Hide Preview" : "Show Preview"}</button>
                  <div hidden={!this.state.showPreview} dangerouslySetInnerHTML={{__html: this.props.html}}></div>
                  <hr />
                  <button onClick={() => {doOpen(this.props.name)}}>Open</button>
              </div>
            </div>
            <br clear="all"/>
            <hr />
          </div>
        );
      }
}

export default Entry