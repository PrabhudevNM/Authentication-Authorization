import jwt from 'jsonwebtoken'

export default function authenticateUser(req,res,next){
    const token=req.headers['authorization']                        //Sending request from headers

    if(!token){
        return res.status(401).json({errors:'token is required'})
    }
    try{
        const tokenData=jwt.verify(token,process.env.JWT_SECRET)
        console.log('TD',tokenData)
        req.userId=tokenData.userId
        req.role=tokenData.role
        next()
    } catch(err){
        return res.status(401).json({errors:err.message})
    }
}




// /*
//     import jwt from 'jsonwebtoken'
// const authenticateUser = (req, res, next) => {
//     const token = req.headers['authorization']
//     if(!token) {
//         return res.status(401).json({ error: 'token is required'})
//     }
//     try {
//         const tokenData = jwt.verify(token, process.env.JWT_SECRET) 
//         console.log('td', tokenData)
//         req.name = 'dct'
//         req.userId = tokenData.userId 
//         next()
//     } catch(err) {
//         return res.status(401).json({ error: err.message })
//     }
// }

// export default authenticateUser
// */



