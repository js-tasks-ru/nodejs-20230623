let i = 0;

const obj = {};

function handler(req, res) {
    i++;

    obj[i] = "*".repeat(100000).split('');

    res.end(`you are ${i}th`);
}

// module.exports = {foo: 'bar'}
module.exports = handler;