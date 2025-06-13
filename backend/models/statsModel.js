const {model,Schema}=require("mongoose");
const mongoose=require("mongoose")

const statSchema=new Schema({

    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    bestWpm:{
        type:Number,
        default:0,
    },
    currentStreak:{
        type:Number,
        default:0,
    },
    bestStreak:{
        type:Number,
        default:0,
    },
    testHistory: [{
        wpm: Number,
        accuracy: Number,
        duration: Number, // in seconds
        wordsTyped: Number,
        testDate: {
            type: String,
        }
    }],
    bestAccuracy: {
        type: Number,
        default: 0
    },
    totalKeyStrokes:{
        type:Number,
        default:0,
    },
    streakList:{
        type:Map,
        of: Number,
        default: {}
    }

},{timestamps:true});

const Stats=model('Stats',statSchema);

module.exports=Stats;