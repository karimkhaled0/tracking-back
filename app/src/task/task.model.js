import mongoose from 'mongoose';


const taskSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    techId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    location: {
        type: String

    },
    customerName: {
        type: String
    },
    customerPhonenumber: {
        type: String
    }
    ,
    report: {
        type: String
    },
    description: {
        type: String
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    duration: {
        type: String
    },
    coordinates: {
        type: Object
    },
    inProgress: {
        type: Boolean,
        default: true
    },
    inReview: {
        type: Boolean,
        default: false
    },
    finished: {
        type: Boolean,
        default: false
    },
    started: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })



export const Task = mongoose.model('task', taskSchema);