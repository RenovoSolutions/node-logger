var os = require('os');
var _ = require('lodash');

exports.get = function() {
	var networkInterfaces = os.networkInterfaces();
	var ipAddresses = _.mapValues(networkInterfaces, function(networkInterface) {
		return _.pluck(networkInterface, 'address');
	});

	return {
		hostname: os.hostname(),
		loadAvg: os.loadavg(),
		totalMem: os.totalmem(),
		freeMem: os.freemem(),
		ipAddresses: ipAddresses,
		nodeVersion: process.version,
	};
}