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

function getRandom() {
  return Math.floor(Math.random() * 100000000000000000);
}

module.exports = { getUser, getUserIndexOfById, getRandom };
