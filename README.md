# node-queue-logger
Node module for pushing log messages to the log queue.

# Usage
* Import the logger into your node application
* Configure the queue where log messages should be pushed
* Call the basic logging methods with data in any format
```
var logger = require('node-queue-logger');

logger.configure({
   host: "127.0.0.1",
   login: "guest",
   password: "guest",
   exchange: "LOG",
});

logger.debug('This is a debug message');
logger.debug({ message: 'This is a message', data: 15 });
logger.info({ count: 5 });
logger.warn({ explosion: true });
logger.error({ exception: myException });
```
