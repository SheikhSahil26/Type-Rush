const {model,Schema}=require("mongoose");
const Stats=require("./statsModel");
const mongoose = require("mongoose");


const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    stats: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Stats',
    },

},{timestamps:true});





// In your User schema file
userSchema.pre('save', async function(doc) {
    // Only create stats if this is a new user and no stats exist
    if (this.isNew && !this.stats) {
        const newStats = new Stats({
            userId: this._id
        });
        await newStats.save();
        
        // Update user with stats reference
        this.stats = newStats._id;
        
    }
});

const User=model('User',userSchema);


module.exports=User;