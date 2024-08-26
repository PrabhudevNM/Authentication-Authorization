import axios from "../config/axios";
import {useState, useEffect, useContext} from 'react'
import AuthContext from "../context/AuthContext";
// import { set } from "mongoose";
 
export default function ListUsers(){
    const {state}=useContext(AuthContext)
    const [users, setUsers]=useState([])

    useEffect(()=>{
        (async()=>{
            try {
                const response=await axios.get('/api/users/list',{headers:{
                    Authorization:localStorage.getItem('token')
                }})
                setUsers(response.data)
            } catch (error) {
                console.log(error)
            }
        })()
    },[])

    const handleRoleChange=async(userId, role)=>{
        try {
            const response=await axios.put(`/api/users/change-role/${userId}`, 
                {role:role},{headers:{Authorization:localStorage.getItem('token')}})
                const newArr=users.map((ele)=>{
                    if(ele._id=== response.data._id){
                        return response.data
                    }else{
                        return ele
                    }
                })
                setUsers(newArr)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h2>List Users-{users.length}</h2>
            <ul className="list">
                {users.map((ele)=>{
                    return <li key={ele._id}>{ele.email}-{ele.role}
                    {state.user.role==='admin' && state.user._id !==ele._id && 
                    <>
                    <select value={ele.role} onChange={(e)=>{
                        handleRoleChange(ele._id, e.target.value)
                    }}>
                        
                        {['admin','moderator','user'].map((role,i)=>{
                            return <option value={role} key={i}>{role}</option>
                        })}
                    </select>
                    <button>remove</button>
                    </>
                    }
                    </li>
                })}
            </ul>
        </div>
    )
}
