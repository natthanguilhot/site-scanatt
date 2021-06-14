const mongoose = require('mongoose');

const attelleSchema = mongoose.Schema({
    id: {type: Number, required : true},
    isPrinting: {type: Boolean, required : true},
    isFinished : {type: Boolean, required : true},
    patient: {type: String, required : true},
    scan: {type: String, required : true},
    impression: {type: Number, required : true},
    isDeleted: {type: Boolean, required : true},
    dateDeleted: {type: String, required : true},
});

module.exports = mongoose.model('Attelle', attelleSchema);