// npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string,role:string

// npx sequelize-cli model:generate --name Profile --attributes name:string,bio:string,profilePicture:string

// npx sequelize-cli model:generate --name Post --attributes title:string,imgUrl:string,description:string,repository:string


// GUIDE NGABB
// home -> semua post, masukkin quotes generator di footer
// post detail -> isinya ada data dari profile(name, bio), post(title, imgUrl, description, repository)
// user/delete -> harus cek role dulu baru bisa delete
// user/register -> register
// user/login -> login
// profile -> sesuai userid tampilin semua data profile

// Terdapat Static method & Instance method => instance method pas input username => jadiin lowercase => panggil instance di hooks
// static methodnya?

const bcryptjs = require('bcryptjs')
const salt = bcryptjs.genSaltSync(10)
const hash = bcryptjs.hashSync('kampretos', salt)
console.log(hash);

console.log(bcryptjs.compareSync('kampretos', hash))
console.log(bcryptjs.compareSync('nomos', hash))



