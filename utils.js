function getUser(users, email, password) {
  return users.find((user) => {
    return user.email === email && user.password === password;
  });
}

function getUserIndexOfById(users, id) {
  return users.findIndex((user) => {
    return user.id === id;
  });
}

module.exports = { getUser, getUserIndexOfById };
