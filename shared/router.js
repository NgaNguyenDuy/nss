var route = require('../routes');
var membershipRoute = require('../routes/members');

module.exports = function(app) {
    // Index
    app.get('/', route.index);
    
    // Member ship
    app.get('/verify-session', membershipRoute.verifySession);
};
