const fs = require('node:fs');

// V8
// nextTick queue : []
// microtask queue : []
// (macro)task queue : []

console.log('start'); // 1

new Promise((resolve, reject) => {
  console.log('new Promise'); // 2
  resolve();
})
.then(_ => {
  console.log('then-1'); // 6
  return new Promise(resolve => {
    process.nextTick(() => {
      console.log('nextTick-3'); // 8
    });
    resolve();
  });
})
.then(_ => console.log('then-2')); // 7

fs.open(__filename, () => {
  console.log('fs.open'); // 9
  queueMicrotask(_ => {
    console.log('queueMicrotask-1'); // 10
  });
});

process.nextTick(() => {
  console.log('nextTick-1'); // 4
  process.nextTick(() => {
    console.log('nextTick-2'); // 5
  });
});

console.log('end'); // 3

// for (let i = 0; i < 10000000000000; i++) {}