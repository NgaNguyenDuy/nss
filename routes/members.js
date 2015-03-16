var users = {};

var self = module.exports = {
    verifySession: function(req, res) {


        var userName = req.session.userName;
        
      
        if(userName && !users[userName]) {
            users[userName] = {userName : userName};
            res.json({
                sessionVerified: true,
                user: users[userName]
            });
        } else {
            if(users[userName]) {
                req.session.userName = "";
                res.json({sessionVerified: false});
            } else {
                res.json('Not user');
            }
        }
    },
    register: function(req, res) {
        var userName = req.body.userName;
        
        if(users[userName]) {
            res.json({
                membershipResolved: false, 
                error: 'User already exists'
            });
        }
        users[userName] = ({userName: userName});
        req.session.userName = userName;
        res.json({
            membershipResolved: true,
            user: users[userName]
        });
    }
};
