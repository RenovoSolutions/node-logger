var rabbit = require('./rabbit');
var hostInfo = require('./hostInfo');
var _ = require('lodash');

var exchange = null;
var pendingEntries = [];

var debugType = 'DEBUG';
var infoType = 'INFO';
var warnType = 'WARN';
var errorType = 'ERROR';

rabbit.subscribe(function(_exchange_) {
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

module.exports = {
	debug: function(entry) {
		entry = inflateMessage(entry);
		entry.type = debugType;
		log(entry);
	},
	info: function(entry) {
		entry = inflateMessage(entry);
		entry.type = infoType;
		log(entry);
	},
	warn: function(entry) {
		entry = inflateMessage(entry);
		entry.type = warnType;
		log(entry);
	},
	error: function(entry) {
		entry = inflateMessage(entry);
		entry.type = errorType;
		log(entry);
	},
};

function inflateMessage(entry) {
	if (!_.isObject(entry)) {
		entry = {
			message: entry,
		};
	}

	return entry;
}

function log(entry) {
	entry.host = hostInfo.get();
	entry.timestamp = new Date();

	if (exchange) {
		exchange.publish(entry.type, entry);
	} else {
		pendingEntries.push(entry);
	}
}
