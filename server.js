require('dotenv').config() 
const express = require('express')
const app = express()
const jwt = require("jsonwebtoken")
app.use(express.json())
const sec_key =  'cd90a416c3766bd8e2bd0724f7eaab4afc3b7522b4c4ae60bb75d077553d863e2ed2e42b4e755636ce030a09eb87b0924222963c2caa819566674cbb6aa07221'

const posts = [
    {
        username:'suba',
        title:'Post 1'
    },
    {
        username:'lp',
        title:'Post 1'
    }
]


// app.post("/login",(req,res)=>{
// const username = req.body.username
// const user = {name:username}
// const accessToken = jwt.sign(user,sec_key )
// res.json({accessToken:accessToken})
// })
app.get('/posts',authenticateToken,(req,res)=>{
    console.log("the user in posts is",req.user)
    res.json(posts.filter(post => post.username === req.user.name))
    })
function authenticateToken(req,res,next)
{
    console.log("entering...")
    
    const authHeader =req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);
  
if(!token) return res.sendStatus(401)
console.log("uibk")
 jwt.verify(token,process.env.ACCESS_SECRET_TOKEN, (err,user) => {
if(err) return res.sendStatus(401)
console.log("the user",user)
req.user = user
next()
   
});

next();
}

app.listen(3000)