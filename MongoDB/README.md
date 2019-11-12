## @oudy/mongodb
This package is designed to manage MongoDB connections globaly, it's useful if you have a project that has code splitted in multiple files and modules. All you need is just configure the database where you initiate your code, and require it in other files. I'll show you examples.

**Example** 
```js
import MongoDB from '@oudy/mongodb'

MongoDB.configure('test', 'mongodb://localhost:27017').then(
 database => {
   const users = database.collection('users').find()
 }
)
```

Also if your project is refactored into multiple files/modules you can access the client at ``MongoDB.client``

**Example** 
```js
// models/getUsers.js
import MongoDB from '@oudy/mongodb'

export default getUsers(limit = 20, skip = 0) {
  return MongoDB.client
    .collection('users')
    .find()
    .limit(limit)
    .skip(skip)
    .toArray()
}
```

## Multiple databases
You can use ``@oudy/mongodb`` to connect easily with multiple databases

**Example** 
```js
import MongoDB from '@oudy/mongodb'

Promise.all([
  MongoDB.configureWithName('us', 'myproject', 'mongodb://us_server:27017'),
  MongoDB.configureWithName('eu', 'myproject', 'mongodb://eu_server:27017')
]).then(
 ([US_region, EU_region]) => {
   // get from US
   US_region.collections('files').find().forEach(
     file => {
       // do our changes and insert to v2
       EU_region.collections('files').insertOne(file)
     }
   )
 }
)
```

if you want to access to ``us`` or ``eu`` databases from other files you can use ``MongoDB.getClient()``

**Example**
```js
// models/files.js
import MongoDB from '@oudy/mongodb'

export default getFiles(region, limit = 20, skip = 0) {
  return MongoDB.getClient(region)
    .collection('files')
    .find()
    .limit(limit)
    .skip(skip)
    .toArray()
}
```