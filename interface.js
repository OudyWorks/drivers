export function extend(Class) {
  const connections = new Map()
  return class extends Class {
    static configureFor(name, connection) {
      return this.connections.set(name, connection).get(name)
    }
    static configure() {
      return this.configureFor.apply(this, ['default'].concat(Array.from(arguments)))
    }
    static getConnection(name = 'default') {
      return this.connections.get(name)
    }
    static get connection() {
      return this.getConnection()
    }
    static get connections() {
      return connections
    }
  }
}
export default extend(class {})