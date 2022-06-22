import mongoose from 'mongoose';


const categorySchema = new mongoose.Schema({
    name:{
        type:String ,
        required: true
    } ,
    tasks: [
        {
        type: mongoose.Schema.Types.ObjectId ,
        ref:'task'
        }
    ] ,
    technicals: [
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref: 'user'
        }
    ]
} , {timestamps: true}) 


export const Category =  mongoose.model('category' , categorySchema);

