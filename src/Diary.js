import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class DiaryList extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        diaryItems: []
      };
    }

    componentDidMount() {
      var url = `http://localhost:1428/diary/2019-02-01/2019-02-28`;
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
            console.log(raw);
            return (
              <DiaryEntry  key={entry.fm.date}
                date={entry.fm.date}
                title={entry.title}
                html={entry.html}
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
            <h2>{this.props.title}</h2>
            <div dangerouslySetInnerHTML={{__html: this.props.html}}></div>
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