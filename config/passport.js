// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Configure passport
require('./passport')(passport);

// Serialize and deserialize user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


  


passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());