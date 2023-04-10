exports.login = function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
  
    User.authenticate(username, password, function (err, user) {
      if (err || !user) {
        const err = new Error('Wrong username or password.');
        err.status = 401;
        return res.render('login', { error: err });
      } else {
        req.session.userId = user._id;
        return res.redirect('/chat');
      }
    });
  };


passport.use(new LocalStrategy(User.authenticate()));
  