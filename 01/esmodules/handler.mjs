let i = 0;

function handler(req, res) {
    i++;
    res.end(`you are ${i}th`);
}

// module.exports = {foo: 'bar'}
// module.exports = handler;
export default handler;