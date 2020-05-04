import React, { Component } from 'react';
import axios from 'axios';
import './Diary.css';
import Entry from './Entry.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DiaryList extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        diaryItems: []
      };
    }

    componentDidMount() {
      this.fetchEntries();
    }
    componentDidUpdate(prevProps) {
      if (prevProps.startDate !== this.props.startDate ||
        prevProps.endDate !== this.props.endDate) {
          this.fetchEntries();
        }
    }

    fetchEntries() {
      var url = `http://localhost:1428/diary/${this.props.startDate}/${this.props.endDate}`;
      axios.get(url)
        .then(res => {
          this.setState({
            diaryItems: res.data
          });
        });
    }

    render() {
        const entries = this.state.diaryItems.map((entry, index) => {
            //var raw = entry.raw.replace(/---[\s\S]*---/m, '');
            return (
              <Entry  key={entry.fm.date}
                date={entry.fm.date}
                title={entry.title}
                html={entry.html}
                missing={entry.missing}
                fm={entry.fm}
                name={entry.name}
                raw={entry.raw}
                />
            );
          });
        return (
            <div>{entries}</div>
        );
    }
}

class Diary extends Component {
  state = {
    startDate: new Date(),
    endDate: new Date()
  };

  changeStartDate = date => {
    this.setState({
      startDate: date
    });
    console.log(this.state.startDate);
  };

  changeEndDate = date => {
    this.setState({
      endDate: date
    });
  };

  componentDidMount() {
    this.setState({
      startDate: new Date(2020, 0, 1),
      endDate: new Date(2020, 11, 31)
    });
  }

  render() {
    return (
        <div>
            <h1>Diary</h1>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.changeStartDate}
              dateFormat="yyyy-MM-dd"
              placeholderText="Start Date"
            />
            <DatePicker
              selected={this.state.endDate}
              onChange={this.changeEndDate}
              dateFormat="yyyy-MM-dd"
              placeholderText="End Date"
            />
            <DiaryList
              startDate={this.state.startDate.toISOString().substr(0, 10)}
              endDate={this.state.endDate.toISOString().substr(0, 10)}
              />
        </div>);
  }
}

export default Diary