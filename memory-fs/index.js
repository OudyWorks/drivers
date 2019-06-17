import {
  extend
} from '@oudy/drivers/interface'
import fs from 'memory-fs'
class MemoryFileSystem extends extend(fs) {
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
export default MemoryFileSystem