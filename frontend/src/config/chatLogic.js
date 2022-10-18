export const getSender = (loggedUser, users) => {
  if (!loggedUser || !users) {
    return;
  }
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
//   if (users[0]._id === loggedUser._id) {
//     console.log(users[1]);
//   } else {
//     console.log(users[0]);
//   }
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
