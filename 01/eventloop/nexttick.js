function sum(a, b, cb) {
    if (a < 0 || b < 0) {
        process.nextTick(() => {
            cb(new Error('arguments must be greater than 0'));
        });
        return;
    }

    setTimeout(() => {
        cb(null, a + b);
    }, 100);
}

// thunk
sum(-1, 2, (err, res) => {
    console.log(err, res);
});
console.log('lala');