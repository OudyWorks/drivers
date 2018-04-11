# @oudyworks/drivers/AMQP

# AMQP
AMQP is using **AMQP** on **npm**

## configure(url, options = {}, name = 'default')

## getClient(name = 'default')
get a client with name used in configure(url, options, name)

## client
```js
import AMQP from '@oudyworks/drivers/AMQP'

AMQP.client // a shortcut to AMQP.getClient('default')  
```