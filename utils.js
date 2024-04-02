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

function getRandom(len = 32) {
  let uniqueId = "";
  let chars = "ABCDEFGHIJUKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
  let charsLength = chars.length;

  for (let i = 0; i < len; i++) {
    uniqueId += chars.charAt(Math.floor(Math.random() * charsLength));
  }

  return (uniqueId += Date.now());
}

module.exports = { getUser, getUserIndexOfById, getRandom };
