const mongoose = require('mongoose');

const videoModel = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    visibility:{
        type:String,
        enum:['Public','Private', 'Unlisted'],
        default: 'Private',
        required: true
    },
    filePath:{
        type: String,
        required: true
    },
    thumbnailPath:{
        type:String,
        required: true
    },
    uploadDate:{
        type: Date,
        default: Date.now,
    }
});

const Video= mongoose.model('Video',videoModel);
module.exports = Video;