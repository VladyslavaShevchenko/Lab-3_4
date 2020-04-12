const userRepository = require('./user.repository');

class UserService {
    checkUser({ login, password }) {
        return  userRepository.findOne({ login, password });
    }

    async addUser(user) {
        const result = await userRepository.findOne({ login: user.login })
        if (result == null) {
            user.liked = [" "];
            return userRepository.add(user);
        } else {
            throw "Error";
        }
    }

    updateUser(login, user) {
        return userRepository.update({ login }, user);
    }

    addLiked(id, recipeId) {
        return userRepository.update({ _id:id }, { $push: { liked: recipeId } })
    }

    deleteLiked(id, recipeId) {
        return userRepository.update({ _id:id }, { $pull: { liked: recipeId } })
    }

    deleteUser(id) {
        return userRepository.delete({ _id: id });
    }
}

module.exports = new UserService();