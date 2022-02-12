const ROLES = {
    admin: "admin",
    member: "member"
}

function authRole(role){
    return (req, res, next) => {
        if (
            req.user.role === role || 
            req.user.role === "admin"
            ) 
            {
                next()
            } else {
                res.status(401).json({
                    message: "You are not authorized"
                })
            }
    }
}
module.exports = {
    ROLES,
    authRole
}