import mongoose from 'mongoose';


const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    messages: [{
        content: {
            type: String,
        },
        author: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user',
        }
    }],
    members: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    }],
    lastMessage: {
        type: String,
    }
})

export const Room = mongoose.model('room', roomSchema);