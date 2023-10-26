const mongoose = require('mongoose');
const beautifulUniqueValidation = require('mongoose-beautiful-unique-validation');

mongoose.plugin(beautifulUniqueValidation);

module.exports = mongoose.createConnection('mongodb://localhost:27017', {
    dbName: 'nodejs-20230925-user-application'
});
