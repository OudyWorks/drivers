const MongoDB = require('./index'),
  MongoDBBatch = require('./batch')

MongoDB.configure().then(
  DB => {
    MongoDBBatch.upsert(
      Math.round(Date.now()/1000),
      {
        name: 'Helloo'
      },
      'tiist'
    ).then(
      console.log
    )
  }
)