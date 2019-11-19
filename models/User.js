let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let userSchema = new Schema({
    username: { type: String, unique: true, trim: true, required: true },
    fullname: String,
    age:      Number,
    createAt: {
        type: Date,
        default: Date.now
    },
    /**
     * 0. inactive
     * 1. active
     */
    // status: Number
});
/**
 * user -> users
 * blog -> blogs
 * category -> categories
 */
let UserModel = mongoose.model('user', userSchema);
exports.USER_MODEL = UserModel;