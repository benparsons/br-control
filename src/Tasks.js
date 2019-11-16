import React, { Component } from 'react';
import TaskListSet from './TaskListSet';

class Tasks extends Component {

    render() {
        const taskLists = [];
        taskLists.push({statuses:"active,dormant", datemode:"due", count:"60"});
        taskLists.push({statuses:"active", datemode:"undated", count:"60"});
        taskLists.push({statuses:"active,dormant", datemode:"future", count:"60"});
        taskLists.push({statuses:"dormant", datemode:"undated", count:"60"});
        taskLists.push({statuses:"someday", datemode:"all", count:"60"});
        return (<TaskListSet taskLists={taskLists} />)
    }
}

export default Tasks;