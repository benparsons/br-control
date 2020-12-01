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
    this.getTag(out[1], true)
  }

  getTag(tag, recurse) {
    if (this.state.tags[tag]) return;

    var url = `http://localhost:1428/tag/${tag}`;
    axios.get(url)
      .then(res => {
        let stateTags = this.state.tags;
        stateTags[tag] = res.data;
        this.setState({
          tags: stateTags
        });
        if (recurse) { this.getRelatedTags(); }
      });

  }

  getRelatedTags() {
    Object.keys(this.state.tags).forEach(tagName => {
      this.state.tags[tagName].forEach(entry => {
        let url = `http://localhost:1428/get/${entry.name}`;

        //console.log(url);
        axios.get(url)
          .then(res => {
            if (!res.data.fm && res.data.fm.tags) return;
            res.data.fm.tags.forEach(newTag => {
              this.getTag(newTag, false);
            })
          });

      })
    })
  }

  render() {
    var tags = [];
    Object.keys(this.state.tags).forEach(name => {
      tags.push(<ProjectBlock key={name} name={name} tasks={this.state.tags[name]} />);
    });

    return <div className="tasklist-block">{tags}</div>

    //return <div className="tasklist-block">{JSON.stringify(this.state.tags)}</div>;
  }
}

export default Tag
