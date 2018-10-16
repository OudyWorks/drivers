class Implementation {
  static configureFor(name, connection) {
    return this.connections.set(name, connection).get(name)
  }
  static configure() {
    this.configureFor.apply(this, ['default'].concat(this.arguments))
  }
  static getConnection(name = 'default') {
    return this.connections.get(name)
  }
  static get connection() {
    return this.getConnection()
  }
}

Implementation.connections = new Map()

export default Implementation