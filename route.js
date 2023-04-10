
router.post('/login', passport.authenticate('local', {
    successRedirect: '/chat',
    failureRedirect: '/',
    failureFlash: true
  }));
  
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  
  router.get('/register', function(req, res) {
    res.render('register');
  });
  
  router.post('/register', function(req, res) {
    const newUser = new User({ username: req.body.username });
  
    User.register(newUser, req.body.password, function(err, user) {
      if (err) {
        console.log(err);
        return res.render('register');
      }
  
      passport.authenticate('local')(req, res, function() {
        res.redirect('/chat');
      });
    });
  });