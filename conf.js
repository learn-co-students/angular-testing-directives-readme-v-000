exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['spec/**/*.spec.js'],
	capabilities: {
	  browserName: 'chrome',
	  'chromeOptions': {
	    args: ['--no-sandbox'] 
	  }   
	}
};