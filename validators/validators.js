const validatePassword = (password) => {
    // 1 special character
    // 1 digit
    // 1 lowercase character
    // 1 uppercase character
    const passwordRegex = /^(?=.*[^A-Za-z0-9])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    return passwordRegex.test(password);
};

const validateEmail = (email) => {
    // from https://emailregex.com/
    // claims to match 99.99% of all email addresses
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(email);
};

module.exports = {
    validatePassword,
    validateEmail,
};