const mongoose = require('mongoose')
const CategorySchema = new mongoose.Schema({
    name:{type:String, require:true},
    desc:{type:String, require:true}
})


const Category = mongoose.model("Category", CategorySchema)
// const CategoryDesc = mongoose.model("CategoryDesc", CategorySchema)
module.exports = Category;