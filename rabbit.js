var Rx = require('rx');
var rabbit = require('amqp');

var config = require('./rabbit.json');

var subject = new Rx.Subject();

var connection = rabbit.createConnection({ host: config.host, login: config.login, password: config.password });
var connected = Rx.Observable.fromEvent(connection, 'ready');
connected.subscribe(function() {
	console.log('- connected to rabbit -');

	connection.exchange(config.exchange, {
		type: 'fanout',
		durable: true,
	}, function(exchange) {
		console.log('- exchange created -');
		subject.onNext(exchange);
	});
}, function(error) {
	console.log('- an error occurred connecting to rabbit -');
	if (error) { console.log(error); }
});

module.exports = subject;
