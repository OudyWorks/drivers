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