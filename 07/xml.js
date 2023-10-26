const pug = require('pug'); // jade|handlebars|lodash.template

console.log(`<?xml version="1.0" encoding="UTF-8"?>${pug.renderFile('xml.pug', {
  books: [
    { 
        category: "cooking", 
        title: "Everyday Italian",
        author: "Giada De Laurentiis",
        year: 2005,
        price: '30.00'
    }
  ],
  pretty: true
})}`);
