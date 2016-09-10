function MembersController(){
    var that = this;
    that.memberList = [];

    var findMembersByEmail = function(email){
        var found = that.memberList.filter(function(m){
            return m.email = email;
        });
        if(found && found.length > 0){
          return found[0];
        }
        return null;
    };

    that.get = function(req, res, next){
        res.send(200, that.memberList);
        return next();
    };

    that.register = function(req, res, next){
        if(!req.body || !req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('password')){
          res.send(500);
        }else{
          var found = findMembersByEmail(req.body.email);
          if(found){ // error
            res.send(400, "This email '" + req.body.email + "' is already used.");
          }else{
            var newMember = {
              email: req.body.email,
              password: req.body.password
            };
            that.memberList.push(newMember);
            res.send(201, newMember);
          }
        }
        return next();
    };

    that.login = function(req, res, next){
        if(!req.body || !req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('password')){
          res.send(400);
        }else{
          var found = findMembersByEmail(req.body.email);
          if(found && found.password == req.body.password){
            res.send(200, "Login success.");
          }else{  // error
            res.send(401, "Incorrect email and/or password.");
          }
        }
        return next();
    };

};

module.exports = new MembersController();
