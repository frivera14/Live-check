const jwt = require('jsonwebtoken');

const secret = 'secret';
const expiration = '8h';

module.exports = {
    signToken: function({ username, _id }) {
        const payload = { username, _id};
    
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
    },
}
