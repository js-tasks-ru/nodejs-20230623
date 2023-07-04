const mongoose = require('mongoose');
const mongooseUniquePlugin = require('mongoose-beautiful-unique-validation');

mongoose.plugin(mongooseUniquePlugin);

module.exports = mongoose.createConnection('mongodb://localhost:27017', {
    dbName: 'nodejs-20230330-user-application'
});
