export const getSender = (loggedUser, users) => {
    if (!loggedUser||!users) {
        return
    }
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};
