function addUser(email, password) {
  return `INSERT INTO users
              (email, password)
                  VALUES
                    ("${email}", "${password}");`;
}

function addToken(userId, token) {
  return `INSERT INTO sessions
            (user_id, token)
                 VALUES
                    (${userId}, "${token}");`;
}

module.exports = { addUser, addToken };
