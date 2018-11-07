const assert = require('assert'),
  MongoDB = require('../index');


Promise.all([
  MongoDB.configure()
]).then(
  ([M]) => {
    
  }
)