# @oudyworks/drivers/Redis

# Redis
Redis is using **Redis** on **npm**

## configure(options, name = 'default')
```js
import Redis from '@oudyworks/drivers/Redis'
    
Redis.configure().then(
    client => {
        // client.set('connected', 'ok')
    }
)    
```

## getClient(name = 'default')
get a client with name used in configure(options, name)

## client
```js
import Redis from '@oudyworks/drivers/Redis'

Redis.client // a shortcut to Redis.getClient('default')  
```