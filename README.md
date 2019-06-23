# @oudy/drivers
I worked in multiple projects that were written in NodeJS and used multiple databases and softwares at the same time. And everytime I start a new project, I need to write the configuration with the database code first (MongoDB, ElasticSearch, Redis...) and make sure it's connected succesfully then move on to what I want to do.

The problem is every client has it's own way to configure, and check if you're connected succesfully. So I made this project to wrap the clients in an easy to use package

# Available drivers
- [MongoDB](./MongoDB)
- [ElasticSearch](./ElasticSearch)
- [Redis](./Redis)
- [AMQP](./AMQP)
- [MySQL](./MySQL)
- [memory-fs](./memory-fs)

# Interface
This interface is to be respected while wrapping a database/software client

```js
class DriverInterface {
  // methods

  // configureWithName is to support multiple configuration of the same client
  static configureWithName(name, ...clientOptions) // return Promise<client,error>

  // this just an alias that calls this.configureWithName('default', ...clientOptions)
  static configure(...clientOptions) // return Promise<client,error>

  // get client by name
  static getClient(name) // returns client

  // properties
  static get client() // an alias to this.getClient('default')

  static get clients() // returns all clients Map<string,client>
}
```