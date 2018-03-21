userModel = require("../models/user");
var md5 = require('md5');
class user {
	constructor(){}
	userRegistration(req,res){
		var user ={"fname":req.body.fname,
					"lname":req.body.lname,
				   "email":req.body.email,
				   "password":md5(req.body.password),
				   "address":req.body.address
				  }  
				  
	userModel.findOne({"email":req.body.email}).then((result)=>{
		if(result){
			return res.send({"status":"ERROR","message":"Email already exists"})
			//res.render("registration",{"error":"Email already exists"})
		}
		else{
			userModel.create(user).then((result) => { 
			 passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
				req.flash('success_msg', 'Registered Successfully');
               return res.send({"status":"OK","message":"Registered Successfully"})
            });
        });
			});
		}
	})
			
	}
	
	
	profileUpdate(req,res){
		var myquery = { address: "Valley 345" };
		var newvalues = { $set: {"fname":req.body.fname,
					"lname":req.body.lname,
				   "address":req.body.address
				  }  };
		 userModel.update({'_id':req.body.id}, newvalues, function(err, result){
			 req.flash('success_msg', 'Updated Successfully');
		  return res.send({"status":"OK","message":"Registered Successfully"});
		 })
	}
}
module.exports = user;