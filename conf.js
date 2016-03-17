exports.config = {
	seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
	specs: ['spec/**/*.spec.js'],
  capabilities: {
    'browserName': 'phantomjs',
    'phantomjs.binary.path': require('phantomjs-prebuilt').path,
    'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
  }
};