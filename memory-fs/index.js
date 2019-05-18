const Interface = require('@oudy/drivers/interface'),
  fs = require('memory-fs')

class MemoryFileSystem extends Interface.extend(fs) {
  static configureFor() {
    // get the arguments as Array
    const args = Array.from(arguments),
      // get name of connection from the first argument
      name = args.shift(),
      // url and options
      [data = {}] = args,
      // connect
      connection = new fs(data)

    return Promise.resolve(
      super.configureFor(name, connection)
    )
  }
}

module.exports = MemoryFileSystem