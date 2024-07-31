const mongoose = require('mongoose')

const EndpointSchema = new mongoose.Schema({
    category: { type: String, require: true },
    description: { type: String, require: true },
    endpointName: { type: String, require: true },
    fileContent: { type: mongoose.Schema.Types.Mixed, require: true },
})


const Endpoint = mongoose.model("Endpoint", EndpointSchema)
module.exports = Endpoint;