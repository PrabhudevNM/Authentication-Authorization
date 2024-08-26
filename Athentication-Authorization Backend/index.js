import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import express from "express"
import configureDB from "./config/db.js"
import { checkSchema } from "express-validator"
import usersCltr from "./app/controller/user-cltr.js"
import notesCltr from "./app/controller/notes-cltr.js"
import { userRegisterSchema,userLoginSchema } from "./app/validator/user-validator.js"
import authenticateUser from "./app/middlewares/authentication.js"
import authorizeUser from "./app/middlewares/authorizeUser.js"
const app=express()
const port=process.env.PORT || 9000


app.use(cors())

app.use(express.json())
configureDB()

// app.get('/home',(req,res)=>{
//     res.json({
//         message:"Home page"
//     })
// })

app.post('/api/users/register',checkSchema(userRegisterSchema),usersCltr.register) //writing api's first afetr writing validation and controller updating in index.js
app.post('/api/users/login',checkSchema(userLoginSchema),usersCltr.login)
// app.get('/profile',authenticateUser,usersCltr.profile)
app.get('/api/users/account', authenticateUser, usersCltr.account)
app.get('/api/users/list', authenticateUser,authorizeUser(['admin','moderator']), usersCltr.listUsers)
app.delete('/api/users/:id', authenticateUser,authorizeUser(['admin']), usersCltr.destroy)
app.put('/api/users/change-role/:id', authenticateUser,authorizeUser(['admin']), usersCltr.changeRole)

app.get('/api/notes',authenticateUser,notesCltr.list)
app.post('/api/notes',authenticateUser,notesCltr.create)
app.get('/api/notes/:id',authenticateUser,notesCltr.show)
app.put('/api/notes/:id',authenticateUser,notesCltr.update)
app.delete('/api/notes/:id',authenticateUser,notesCltr.delete)



app.listen(port,()=>{
    console.log('server running on port',port)
})