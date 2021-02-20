import React, { Component } from 'react';
import EntryListSet from './EntryListSet';

class Tasks extends Component {

    render() {
        const taskLists = [];
        const tags = [];
        taskLists.push({statuses:"active,dormant", datemode:"due", count:"60", tags: tags});
        taskLists.push({statuses:"active", datemode:"undated", count:"60", tags: tags});
        taskLists.push({statuses:"active,dormant", datemode:"future", count:"60", tags: tags});
        taskLists.push({statuses:"dormant", datemode:"undated", count:"60", tags: tags});
        taskLists.push({statuses:"someday", datemode:"all", count:"60", tags: tags});
        if (tags.length > 0) {
            taskLists.push({statuses:"done", datemode:"all", count:"60", tags: tags});
        }
        return (<EntryListSet taskLists={taskLists} />)
    }
}

export default Tasks;