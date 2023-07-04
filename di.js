// class Container {
//     userRepository: require('./user-repository')
// }

class UserService {
    constructor()) {
        this.userRepository = container.get('userRepository');
    }

    async findUser(email) {
        const user = await this.userRepository.findByEmail(email);
        return user;
    }
}