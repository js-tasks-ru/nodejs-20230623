const User = require('./models/User');

async function main() {
    const users = [
        {
            email: "user1@mail.com",
            name: "user1"
        },
        {
            email: "user2@mail.com",
            name: "user2"
        }
    ];

    for (const user of users) {
        await User.create(user);
    }
}

main();