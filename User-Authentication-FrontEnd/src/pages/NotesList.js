import NotesContext from "../context/NotesContext";
import { useContext } from "react";
import axios from "../config/axios"



export default function NotesList(){
    const {notes,notesDispatch}=useContext(NotesContext)

const handleRemoveNote= async(id)=>{
    const userInput=window.confirm("are you sure?")
    if(userInput){
    try{
    const response= await axios.delete(`/api/notes/${id}`,{headers:{'Authorization':localStorage.getItem('token')}})
    console.log(response.data)
    notesDispatch({type:"REMOVE_NOTE",payload:response.data._id})
    }catch(err){
        alert(err.message)
     }
    }
}
    const handleEdit=(id)=>{
        notesDispatch({ type:'SET_EDIT_ID',payload:id})
    }

    return(

        <ul>
         {notes.data.map((ele)=>{
                return <li key={ele._id}><b>{ele.title}</b> <i>{ele.body}</i>
                <button onClick={()=>{handleEdit(ele._id)}}>Edit</button>
                <button onClick={()=>{handleRemoveNote(ele._id)}}>remove</button></li>
            })} 
        </ul>
    )
}