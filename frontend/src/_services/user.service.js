import Axios from "src/_services/caller.service";

let getAllUsers = () => {
    return Axios.get('/users');
};

let getUser = (uid) => {
    return Axios.get('/users/' + uid);
};

let addUser = (user) => {
    return Axios.put('/users', user);
};

let updateUser = (user) => {
    return Axios.patch('/users/' + user.id, user);
};

let deleteUser = (uid) => {
    return Axios.delete('/users/' + uid);
};

export const userService = {
    getAllUsers, getUser, addUser, updateUser, deleteUser
}