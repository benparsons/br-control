var moment = require('moment');

function getEntries(query, pages) {
    let entries = pages;
    
    //console.log(query);
    if (query.type) {
        entries = entries.filter(e => e.fm && e.fm.type === query.type);
    }

    if (query.tags) {
        entries = entries.filter(e => e.fm && e.fm.tags && e.fm.tags.some && 
            e.fm.tags.some(a => query.tags.includes(a)));
    }

    entries = entries.slice(0, 10);
    return entries;
}


module.exports = {
    getEntries
 }