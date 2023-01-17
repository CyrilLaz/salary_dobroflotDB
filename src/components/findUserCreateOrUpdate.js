const User = require('../models/User');

module.exports.findUserOrCreate = (name)=>{
   return User.findOne({name}).then(user=>{
        if(!user) {
            return User.create({name})
        }
        return user
    })
}

module.exports.findUserAndUpdate = (id, update)=>{
    return User.findByIdAndUpdate(id, update,{new:true}).then(user=>{
         return user
     })
 }
