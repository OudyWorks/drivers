<a name="MongoDB"></a>

## MongoDB
**Kind**: global class  

* [MongoDB](#MongoDB)
    * [.connection](#MongoDB.connection) ⇒ <code>MongoClient</code>
    * [.database](#MongoDB.database) ⇒ <code>Db</code>
    * [.configureFor(name, database, [url], [options])](#MongoDB.configureFor) ⇒ <code>Promise.&lt;Db&gt;</code>
    * [.configure(database, [url], [options])](#MongoDB.configure) ⇒ <code>Promise.&lt;Db&gt;</code>
    * [.getConnection(name)](#MongoDB.getConnection) ⇒ <code>MongoClient</code>
    * [.getDatabase(name)](#MongoDB.getDatabase) ⇒ <code>Db</code>

<a name="MongoDB.connection"></a>

### MongoDB.connection ⇒ <code>MongoClient</code>
get default connection

**Kind**: static property of [<code>MongoDB</code>](#MongoDB)  
<a name="MongoDB.database"></a>

### MongoDB.database ⇒ <code>Db</code>
get default database

**Kind**: static property of [<code>MongoDB</code>](#MongoDB)  
<a name="MongoDB.configureFor"></a>

### MongoDB.configureFor(name, database, [url], [options]) ⇒ <code>Promise.&lt;Db&gt;</code>
set a configuration of MongoDB

**Kind**: static method of [<code>MongoDB</code>](#MongoDB)  
**Returns**: <code>Promise.&lt;Db&gt;</code> - database  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> | <code>&quot;default&quot;</code> | name of the configuration |
| database | <code>string</code> | <code>&quot;test&quot;</code> | database name |
| [url] | <code>string</code> | <code>&quot;mongodb://localhost:27017&quot;</code> | url of the server |
| [options] | <code>MongoClientOptions</code> |  | [MongoClient options](http://mongodb.github.io/node-mongodb-native/3.2/api/MongoClient.html) |

<a name="MongoDB.configure"></a>

### MongoDB.configure(database, [url], [options]) ⇒ <code>Promise.&lt;Db&gt;</code>
set default configuration of MongoDB

**Kind**: static method of [<code>MongoDB</code>](#MongoDB)  
**Returns**: <code>Promise.&lt;Db&gt;</code> - database  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| database | <code>string</code> | <code>&quot;test&quot;</code> | database name |
| [url] | <code>string</code> | <code>&quot;mongodb://localhost:27017&quot;</code> | url of the server |
| [options] | <code>MongoClientOptions</code> |  | [MongoClient options](http://mongodb.github.io/node-mongodb-native/3.2/api/MongoClient.html) |

**Example**  
```js
import MongoDB from '@oudy/mongodb'

MongoDB.configure().then(
 database => {
   const users = database.collection('users').find().toArray()
 }
)
```
<a name="MongoDB.getConnection"></a>

### MongoDB.getConnection(name) ⇒ <code>MongoClient</code>
get a configuration

**Kind**: static method of [<code>MongoDB</code>](#MongoDB)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="MongoDB.getDatabase"></a>

### MongoDB.getDatabase(name) ⇒ <code>Db</code>
get a configuration

**Kind**: static method of [<code>MongoDB</code>](#MongoDB)  

| Param | Type | Default |
| --- | --- | --- |
| name | <code>string</code> | <code>&quot;default&quot;</code> | 

