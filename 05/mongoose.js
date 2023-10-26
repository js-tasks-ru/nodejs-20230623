const mongoose = require('mongoose');

async function main() {
    const userSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
    });
    userSchema.index({name: 1, email: 1});
    const User = mongoose.model('User', userSchema);

    await mongoose.connect('mongodb://127.0.0.1:27017', {
        dbName: 'nodejs-20230623'
    });

    console.log(await User.find({}));

    await User.create({
        name: "Alex3",
        email: "alex3@gmail.com",
    });

    console.log(await User.find({}));
}

main();
