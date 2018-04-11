# @oudyworks/drivers/MongoDB

# MongoDB
## configure(url, database, options = {}, name = 'default')
```js
import MongoDB from '@oudyworks/MongoDB'

const   url = 'mongodb://localhost:27017',
        databaseName = 'myproject'
    
MongoDB.configure(url, databaseName).then(
    database => {
        //database.collection('collectionName').find()
    }
)    
```

## database
```js
import MongoDB from '@oudyworks/MongoDB'

let cursor = MongoDB.database.collection('collectionName').find()
```

## getDatabase(name)
```js
import MongoDB from '@oudyworks/MongoDB'
// conect to multiple databases and specify the name of each connection after config (database1, database2, database3)
Promise.all([
    MongoDB.configure('mongodb://server1:27017', 'project1', {}, 'database1'),
    MongoDB.configure('mongodb://server1:27017', 'project2', {}, 'database2'),
    MongoDB.configure('mongodb://server2:27017', 'project3', {}, 'database3')
]).then(
    ([database1, database2, database3]) => {
        //
    }
)
// or you can get them using getDatabase after success configure
let database1 = MongoDB.getDatabase('database1'),
    database2 = MongoDB.getDatabase('database2'),
    database3 = MongoDB.getDatabase('database3')
```

## ObjectID
returns **ObjectID** from 'mongodb'

## IDRegex
a Regular expression to test for **ObjectID** string
```js
import MongoDB from '@oudyworks/MongoDB'

MongoDB.IDRegex.test('5acdb271dd7fdf707f8f24c9') // true
MongoDB.IDRegex.test('notAnObjectIDString') // false
```