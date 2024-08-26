const authorizeUser=(permittedRoles)=>{
    return(req,res,next)=>{
        if(permittedRoles.includes(req.role)){
            next()
        }else{
            return res.status(403).json({errors:"You don't have accsess to this page "})
        }
    }
}

export default authorizeUser