import {Schema, model} from "mongoose"

const noteSchema= new Schema({
    title:String,
    body:String,
    user:Schema.Types.ObjectId
},{timestamps:true})

const Note=model('Note',noteSchema)

export default Note
