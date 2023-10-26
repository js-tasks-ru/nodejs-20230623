module.exports = function mapUser(user) {
    return {
        id: user._id,
        name: user.name,
        email: user.email
    };
}