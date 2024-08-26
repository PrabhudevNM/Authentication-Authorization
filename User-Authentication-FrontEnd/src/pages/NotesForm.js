import { useContext, useState,useEffect } from "react";
import axios from "../config/axios";
import NotesContext from "../context/NotesContext";

export default function NotesForm(){
    const {notes,notesDispatch}=useContext(NotesContext)
    const [title,setTitle]=useState('')
    const [body,setBody]=useState('')

    useEffect(()=>{
        if(notes.editId){
            const note=notes.data.find(ele=>ele._id===notes.editId)
            setTitle(note.title)
            setBody(note.body)
            
        }
    },[notes.editId])
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const formData={
            title,
            body,
        }
        if(notes.editId){
            try{
                const response=await axios.put(`/api/notes/${notes.editId}`,formData,{headers:{'Authorization':localStorage.getItem('token')}})
                console.log(response.data)
                notesDispatch({type:'UPDATE_NOTE',payload:response.data})
                setTitle('')
                setBody('')
            }catch(err){
                console.log(err.message)
            }
        }else{
        try{
            const response=await axios.post('/api/notes',formData,{headers:{'Authorization':localStorage.getItem('token')}})
            console.log(response.data)
            notesDispatch({type:'ADD_NOTE',payload:response.data})
            setTitle('')
            setBody('')
        }catch(err){
            alert(err.message)
        }
    }
}


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}></input><br />
                <label>Body</label>
                <input type="text" value={body} onChange={(e)=>{setBody(e.target.value)}}></input><br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}