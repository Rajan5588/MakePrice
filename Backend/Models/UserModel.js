const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true,
     
     },
     email: {
          type: String,
          required: true,
          unique: true,
          match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,

     },
     number: {
          type: String,
          required: true,
          unique: true,
            match: /^[0-9]{10}$/
     },
     password: {
          type: String,
          required: true

     },
     
},{
     timestamps:true
})

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;