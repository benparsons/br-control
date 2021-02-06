const express = require('express');
const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
var wiki = require('markdown-wiki');
const { exec } = require('child_process');
var moment = require('moment');
const chokidar = require('chokidar');
const bodyParser = require('body-parser');
const config = require('./config.json');
app.use(bodyParser.json());
app.use(express.static('app'));
let queries = {};
queries.tasks = require('./queries/tasks.js');

var wikiContent, pages, projects, tags;
var dirty = true;
function loadWiki() {
    if (!dirty) return;
    console.log((new Date()).toISOString() + " loading wiki");
    wiki.loadPages(config["wiki-path"]);
    wiki.loadProjects();
    wiki.loadTags();
    wikiContent = wiki.getWiki();
    pages = wikiContent.pages;
    projects = wikiContent.projects;
    tags = wikiContent.tags;
    dirty = false;
    console.log((new Date()).toISOString() + " wiki loaded");
}

setInterval(loadWiki, 1000);


var ready = false;
const watcher = chokidar.watch(config["wiki-path"]).on('all', (event, path) => {
    //console.log("Watching for changes on " + config["wiki-path"])
    if (! path.endsWith(".md")) return;
    if (ready) {
        console.log(event, path);
        //loadWiki();
        dirty = true;
    }
});

watcher.on('ready', () => {
    console.log('Initial scan complete. Ready for changes');
    ready = true;
});

app.get('/tasks/:statuses/:datemode/:count', function(req, res) {
    let tasks = queries.tasks.getTasks(req, res, pages);
    console.log("send tasks");
    res.send(tasks);
});

app.get('/daily-tasks', function(req, res) {
    var tasks = pages.filter(page => 
        page.fm && 
        page.fm.task && 
        page.fm.task.status === 'daily-task');
    for (var i = 0; i < tasks.length; i++) {
        //delete tasks[i].raw;
        delete tasks[i].tokens;
    }
    res.send(tasks);
});

app.get('/weights', function(req, res) {
    var weights = pages.filter(p => p.fm &&
        p.fm.weight && p.fm.weight.weight && p.fm.weight.trend);
    var response = [];
    weights.forEach(day => {
        const ds = moment(day.fm.date).format("YYYY-MM-DD");
        response.push({
            x: ds,
            y:day.fm.weight.weight,
            group: "weight"
        });
        response.push({
            x: ds,
            y:day.fm.weight.trend,
            group: "trend"
        });
    });
    res.send(response);
});

function getDiaryEntries(start, end, interesting) {
    var entries = pages.filter(page => 
        page.fm && 
        page.fm.type === 'diary' &&
        moment(page.fm.date) >= moment(start) &&
        moment(page.fm.date) <= moment(end));
        
    if (interesting) {
        entries = entries.filter(page =>
            page.fm.tags.includes('holiday') ||
            page.fm.started_in !== page.fm.ended_in);
    }
    
    for (var i = 0; i < entries.length; i++) {
        //delete entries[i].raw;
        delete entries[i].tokens;
    }
    return entries;
}

app.get('/diary/:start/:end', function(req, res) {
    res.send(getDiaryEntries(req.params.start, req.params.end, false));
});

app.get('/get/:name', function(req, res) {
    var toGet = pages.find(x => x.name === req.params.name);
    if (toGet) {
        res.send({
            html: toGet.html,
            fm: toGet.fm,
            title: toGet.title,
            missing: toGet.missing,
            raw: toGet.raw
        });
    }
    else {
        res.send("not found");
    }
});

app.get('/open/:name', function(req, res) {
    var toOpen = pages.find(x => x.name === req.params.name);
    
    exec(`open ${toOpen.path}`, (err, stdout, stderr) => {
        if (err) console.log(err);
        if (stderr) console.log(stderr);
        res.send("ok");
    });
});

app.get('/tags', function(req, res) {
    res.send(tags);
});

app.get('/tag/:tag', function(req, res) {
    const result = tags[req.params.tag];
    if (result) {
        res.send(tags[req.params.tag]);
    } else {
        res.send([]);
    }
    
});

app.get('/projects', function(req, res) {
    res.send(projects);
});

app.get('/set-field/:name/:field/:value', function(req, res) {
    var entry = pages.find(x => x.name === req.params.name);
    var fieldpath = req.params.field.split('.');
    if (fieldpath.length > 3) {
        res.send({error: "Max 3 fields deep"});
    }
    if (! entry.fm[fieldpath[0]]) {
        fieldpath[1] 
            ? entry.fm[fieldpath[0]] = {}
            : entry.fm[fieldpath[0]] = req.params.value;
    }
    if (fieldpath[1] && ! entry.fm[fieldpath[1]]) {
        fieldpath[2]
            ? entry.fm[fieldpath[0]][fieldpath[1]] = {}
            : entry.fm[fieldpath[0]][fieldpath[1]] = req.params.value;
    }
    if (fieldpath[2] && ! entry.fm[fieldpath[2]]) {
        entry.fm[fieldpath[0]][fieldpath[1]][fieldpath[2]] = req.params.value;
    }
    console.log(entry.fm);
    wiki.writeFrontMatter(req.params.name, entry.fm);
    res.send({message: "Wrote new field"});
});

app.post('/create-entry', function(req, res) {
    console.log(req.body);
    wiki.createPage(
        req.body.title,
        req.body.category,
        req.body.frontMatter,
        req.body.body,
        req.body.fullPath);
    res.send("ooff")
})

app.listen(1428, function () {  
    console.log('Example app listening on port 1428!');  
});