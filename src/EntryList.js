import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { TaskRow } from './TaskRow';

class EntryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: []
        };
    }
    componentDidMount() {
        var url = `http://localhost:1428/tasks/${this.props.statuses}/${this.props.datemode}/${this.props.count}`;
        axios.get(url, { params: { tags: this.props.tags }})
            .then(res => {
                this.setState({
                    tasks: res.data
                });

                res.data.forEach(task => {
                    if (!task.fm.tags) return;
                    task.fm.tags.forEach(tag => {
                        this.props.addTag(tag);
                    });
                });
            });
    }
    render() {
        const lines = this.state.tasks.map((task, index) => {
            var due = task.fm.task.due
                ? moment(task.fm.task.due).format('YYYY-MM-DD')
                : "";

            return (
                <TaskRow
                    key={task.name}
                    name={task.name}
                    due={due}
                    title={task.title}
                    status={task.fm.task.status}
                    tags={task.fm.tags}
                    filterTag={this.props.filterTag}
                />
            );
        });
        return (
            <table style={{ width: "100%" }}><tbody>{lines}</tbody></table>
        )
    }
}

export default EntryList;