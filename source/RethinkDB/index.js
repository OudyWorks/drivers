import rethinkdb from 'rethinkdb'

let databases = {}

export default class RethinkDB {
    static configure(options = {}, name = 'default') {
        return rethinkdb.connect(options).then(
            connection =>
                databases[name] = connection
        )
    }
    static getDatabase(name = 'default') {
        return databases[name]
    }
    static get database() {
        return this.getDatabase()
    }
    static get IDRegex() {
        return /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    }
}