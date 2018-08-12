import MongoDB from '../source/MongoDB'

MongoDB.configure(
    'mongodb://127.0.0.1:27017', 'crawlo'
).then(
    connection => {
        console.log(MongoDB.getDatabase())
    }
)