var rabbit = require('./rabbit');
var hostInfo = require('./hostInfo');
var _ = require('lodash');

var exchange = null;
var pendingEntries = [];

var debugType = 'DEBUG';
var infoType = 'INFO';
var warnType = 'WARN';
var errorType = 'ERROR';

module.exports = {
	configure: function(rabbitConfig) {
		var connecting = rabbit.configure(rabbitConfig);
		connecting.subscribe(function(_exchange_) {
			exchange = _exchange_;

			if (_.any(pendingEntries)) {
				pendingEntries.forEach(function(entry) {
					exchange.publish(entry.type, entry);
				});

				pendingEntries = [];
			}
		}, function() {
			exchange = null;
		});
	},

	debug: function(message) {
		var logEntry = {
			message: message,
			type: debugType,
		};
		log(logEntry);
	},
	info: function(message) {
		var logEntry = {
			message: message,
			type: infoType,
		};
		log(logEntry);
	},
	warn: function(message) {
		var logEntry = {
			message: message,
			type: warnType,
		};
		log(logEntry);
	},
	error: function(message) {
		var logEntry = {
			message: message,
			type: errorType,
		};
		log(logEntry);
	},
};

function log(entry) {
	entry.host = hostInfo.get();
	entry.timestamp = new Date();

	if (exchange) {
		exchange.publish(entry.type, entry);
	} else {
		pendingEntries.push(entry);
	}
}
