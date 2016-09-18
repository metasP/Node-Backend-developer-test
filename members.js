function MembersController(){
    var that = this;
    that.memberList = [{email: 'admin@email.com', password: 'password'}];

    that.findMembersByEmail = function(email){
        var found = that.memberList.filter(function(m){
            return m.email == email;
        });
        if(found && found.length > 0){
          return found[0];
        }
        return null;
    };

    // return true if success
    that.validateMember = function(email, password){
      var found = that.findMembersByEmail(email);
      if(found && found.password == password){
        return true;
      }else{  // error
        return false;
      }
    };

    that.get = function(req, res, next){
        res.send(200, that.memberList);
        return next();
    };

    that.register = function(req, res, next){
        if(!req.body || !req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('password')){
          res.send(500);
        }else{
          var found = that.findMembersByEmail(req.body.email);
          if(found){ // error
            res.send(400, "This email '" + req.body.email + "' is already used.");
          }else{
            var newMember = {
              email: req.body.email,
              password: req.body.password
            };
            that.memberList.push(newMember);
            res.send(201, 'email: '+req.body.email+' Register success');
          }
        }
        return next();
    };

    that.login = function(req, res, next){
        if(!req.body || !req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('password')){
          res.send(400);
        }else{
          var isValidMember = that.validateMember(req.body.email, req.body.password);
          if(isValidMember){
            res.send(200, "Login success.");
          }else{  // error
            res.send(401, "Incorrect email and/or password.");
          }
        }
        return next();
    };

};

module.exports = new MembersController();
