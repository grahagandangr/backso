const bcryptjs = require('bcryptjs')
const salt = bcryptjs.genSaltSync(10)
const hash = bcryptjs.hashSync('admin', salt)
console.log(hash);

console.log(bcryptjs.compareSync('admin', hash))
console.log(bcryptjs.compareSync('nomos', hash))