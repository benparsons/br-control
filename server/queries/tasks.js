var moment = require('moment');

function getTasks(req, res, pages) {
    console.log("getTasks() " + 
        JSON.stringify(req.params) + " " + 
        JSON.stringify(req.query));
    const statuses = req.params.statuses.split(',');
    var tasks = pages.filter(page => 
        //page.category === req.params.category && 
        page.fm && 
        page.fm.task && 
        statuses.indexOf(page.fm.task.status) !== -1);
    if (req.params.datemode === "undated") {
        tasks = tasks.filter(task => !task.fm.task.due)
    } else if (req.params.datemode === "due") {
        tasks = tasks.filter(task => 
            task.fm.task.due &&
            moment(task.fm.task.due) < moment()
        );
    } else if (req.params.datemode === "future") {
        tasks = tasks.filter(task => 
            task.fm.task.due &&
            moment(task.fm.task.due) >= moment()
        );
    }

    if (req.query.tags) {
        tasks = tasks.filter(e => e.fm && e.fm.tags && e.fm.tags.some && 
            e.fm.tags.some(a => req.query.tags.includes(a)));
    }

    tasks.sort(dateDescendingUndefinedLast);
    tasks = tasks.slice(0, req.params.count);
    for (var i = 0; i < tasks.length; i++) {
        //delete tasks[i].raw;
        delete tasks[i].tokens;
    }
    return tasks;
}



function dateDescendingUndefinedLast (a, b) {
    if (! a.fm || ! a.fm.task) {
        console.log(a.name);
        process.exit(1);
    }
    if (! a.fm.task.due) return 1;
    if (! b.fm.task.due) return -1;
    return a.fm.task.due - b.fm.task.due;
}

module.exports = {
    getTasks
 }