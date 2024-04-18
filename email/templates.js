const welcomeEmail = (email) => {
  return {
    subject: `Account created`,
    content: `<div>
                <h1>Welcome ${email}</h1>
                <p>Thankyou for signing up!</p>
            </div>`,
  };
};

const accountDelete = (email) => {
  return {
    subject: `Account deleted`,
    content: `<div>
                <h1>Sorry to see you go ${email}</h1>
                <p>Your account is deleted!</p>
            </div>`,
  };
};

module.exports = { welcomeEmail, accountDelete };
