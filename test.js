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
const hash = bcryptjs.hashSync('admin', salt)
console.log(hash);

console.log(bcryptjs.compareSync('admin', hash))
// console.log(bcryptjs.compareSync('nomos', hash))

// test commit

// <% profile.User.Posts.forEach((el) => { %>
//   <tr>
//     <td><%= el.title %></td>
//     <td><img src="<%= el.imgUrl %>" alt="ini gambar" width="200px" height="100px"></td>
//     <td><a href="/profiles/<%= el.User.id %>"><%= el.User.Profile.name %></a></td>
//     <td><%= formatDate(el.updatedAt) %></td>
//     <td>
//       <a href="/posts/<%= el.id %>"><button>Detail</button></a>
//       <a href="/posts/<%= post.id %>/edit"><button>Edit</button></a>
//     </td>
//   </tr>
// <% }) %>


// <% profile.User.Posts.forEach((el) => { %>
//   <tr>
//     <td><%= el.title %></td>
//     <td><img src="<%= el.imgUrl %>" alt="ini gambar" width="200px" height="100px"></td>
//     <td><a href="/profiles/<%= el.id %>"><%= el.name %></a></td>
//     <td><%= formatDate(el.updatedAt) %></td>
//     <td>
//       <a href="/posts/<%= el.id %>"><button>Detail</button></a>
//       <a href="/posts/<%= el.id %>/edit"><button>Edit</button></a>
//     </td>
//   </tr>
// <% }) %>