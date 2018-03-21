class config {
	 
	constructor(){
		this.db = 'mongodb://saro:test@ds019254.mlab.com:19254/mylivehosting';
		this.apiPort = 3000; 
		// Environment SetUp  
		mongoose.connect(this.db, (err) => {
			if (err) {
				console.log(`[MongoDB] Failed to connect. ${err}`);
			} else {
				console.log(`Connection has been established successfully.`);  
			  app.listen(this.apiPort, () => {
					console.log(`[Server] listening on port ${this.apiPort}`);
				});  
			}
		});
	}	
}

module.exports = config;