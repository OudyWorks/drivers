import {
    MongoClient,
    ObjectID
} from 'mongodb'

let databases = {}

export default class MongoDB {
    static configure(url, database, options = {}, name = 'default') {
        options.useNewUrlParser = true
        return MongoClient.connect(url, options).then(
            connection =>
                databases[name] = connection.db(database)
        )
    }
    static getDatabase(name = 'default') {
        return databases[name]
    }
    static get database() {
        return this.getDatabase()
    }
    static get ObjectID() {
        return ObjectID
    }
    static get IDRegex() {
        return /^[0-9a-fA-F]{24}$/
    }
}