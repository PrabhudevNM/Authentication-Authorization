import Note from "../model/note-model.js"
const notesCltr={}

//list all notes of the user means that particular user
notesCltr.list=async(req,res)=>{
    try{
        const notes=await Note.find({user:req.userId})
        res.json(notes)
    }catch(err){

    }
}

//create a note 
notesCltr.create= async(req,res)=>{
    const body=req.body
    try{
        const note=new Note(body)
        note.user=req.userId
        await note.save()
        res.status(201).json(note)
    }catch(err){
    }
}

//show a note of a user
notesCltr.show=async (req,res)=>{
    const id=req.params.id
    try{
        const note=await Note.findOne({_id:id, user:req.userId})
        if(!note){
            return res.status(404).json({})
        }
        res.json(note)
    }catch(err) {
    res.json(err)
    }

}

//update a note of the user
notesCltr.update=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    try{
        let note
        if(req.role=='admin' || req.role=='moderator'){
            note=await Note.findByIdAndUpdate(id,body,{new:true})
        }else{
            note= await Note.findOneAndUpdate({_id:id, user:req.userId }, body,{ new:true })
        }
        if(!note){
            return res.status(404).json({})
        }
        res.json(note)
    }catch(err){
        res.json(err)
    }
}

//delete a note of the user

notesCltr.delete=async (req,res)=>{
    try{
    const id=req.params.id
    let note
    if(req.role=='admin' || req.role=='moderator'){
        note=await Note.findByIdAndDelete(id)
    }else{
    note =await Note.findOneAndDelete({_id:id, user:req.userId})
    }
    if(!note){
        return res.status(404).json({})
    }
    res.json(note)
    }catch(err){
    res.json(err)
    }
} 

export default notesCltr