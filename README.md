# node-queue-logger
Node module for pushing log messages to the log queue.

# Usage
Import into your node application and call the basic logging methods to log data in any format:
```
var logger = require('node-queue-logger');

logger.debug('This is a debug message');
logger.debug({ message: 'This is a message', data: 15 });
logger.info({ count: 5 });
logger.warn({ explosion: true });
logger.error({ exception: myException });
```
