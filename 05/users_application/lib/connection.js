const mongoose = require('mongoose');

module.exports = mongoose.createConnection('mongodb://localhost:27017', {
    dbName: 'nodejs-20230623-user-application'
});
