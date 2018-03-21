router = express.Router(); 
userController = require('../controllers/user');
userControllerObj = new userController();
User = require("../models/user"); 
var md5 = require('md5');
 
router.get('/', function(req, res){
	res.render('index');
});

router.get('/profile', logUser, function(req, res){
	res.render('profile');
});

router.put('/profile', logUser, (req,res)=>userControllerObj.profileUpdate(req,res));

function logUser(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else { 
		res.redirect('/');
	}
}

router.get('/registration',(req,res) => res.render("registration"));  
router.post('/registration',(req,res)=>userControllerObj.userRegistration(req,res)); 
router.get('/login',(req,res)=>{
	 
	res.render("login")
}); 

passport.use(new LocalStrategy({  
    usernameField: 'email',     
    passwordField: 'password'
  },
  (username, password, done)=> {
   User.findOne({"email":username}, (err, user)=>{ 
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	} 
   	if (user.password!=md5(password)) {
        return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);

   });
  }));  

passport.serializeUser((user, done) => { 
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user)=> { 
    done(null, user);
  });
});
 
router.post('/login', (req, res, next)=> {
  passport.authenticate('local', (err, user, info)=> {
    if (err) { return next(err); }
    if (!user) { return res.send({"status":"ERROR","message":info.message}); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
	  		req.flash('success_msg', 'Logged In successfully');
      return res.send({"status":"OK","message":"Logged In successfully"});
    });
  })(req, res, next);
});   
   
router.get('/logout', function(req, res){
	req.logout();

	 req.flash('success_msg', 'You are logged out');

	res.redirect('/login');
});

module.exports = router;

 