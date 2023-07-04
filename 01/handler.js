let obj = {};

let i = 0;
function handler(req, res) {
    obj[i] = '*'.repeat(100000).split('');

    i+=10;
    res.end(i.toString());
}

module.exports = handler;