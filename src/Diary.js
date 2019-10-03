import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import './Diary.css';

class DiaryList extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        diaryItems: []
      };
    }

    componentDidMount() {
      var url = `http://localhost:1428/diary/2019-09-01/2019-09-30`;
      axios.get(url)
        .then(res => {
          
          console.log(res.data);
          this.setState({
            diaryItems: res.data
          });
        });
    }

    render() {
        console.log(this.state.diaryItems);
        const entries = this.state.diaryItems.map((entry, index) => {
            var raw = entry.raw.replace(/---[\s\S]*---/m, '');
            console.log(entry);
            console.log(entry.missing);
            return (
              <DiaryEntry  key={entry.fm.date}
                date={entry.fm.date}
                title={entry.title}
                html={entry.html}
                missing={entry.missing}
                fm={entry.fm}
                />
            );
          });
        return (
            <div>{entries}</div>
        );
    }
}
  
class DiaryEntry extends Component {
    render() {
        return (
          <div>
            <div className="leftDiv">
              <div dangerouslySetInnerHTML={{__html: this.props.html}}></div>
            </div>
            <div className="leftDiv">
              <pre>{JSON.stringify(this.props.missing)}</pre>
              <hr />
              <pre>{JSON.stringify(this.props.fm, null, 2)}</pre>
            </div>
            <br clear="all"/>
            <hr />
          </div>
        );
      }
}

class Diary extends Component {
  render() {
    return (
        <div>
            <h1>Diary</h1>
            <DiaryList />
        </div>);
  }
}

export default Diary