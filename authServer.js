require('dotenv').config() 
const express = require('express')
const app = express()
const jwt = require("jsonwebtoken")
let refreshtoken = []
app.use(express.json())

app.post("/login",(req,res)=>{
const username = req.body.username
const user = {name:username}
const accessToken = generateAccessToken(user)
console.log("the user is",user)
const refreshToken = jwt.sign(user,process.env.ACCESS_REFRESH_TOKEN)
refreshtoken.push(refreshToken)
console.log("the refreshtoken in login is",refreshtoken)
res.json({accessToken:accessToken,refreshToken})
})
app.post('/token',(req,res)=>{
  console.log("the refresh token arr is",req.body.token)
  console.log(refreshtoken)
    console.log("too")
    const refreshToken = req.body.token;
    
    console.log("the refreshtoken is",refreshToken)
    if(refreshtoken === null) return express.res.sendStatus(401)
    if(!(refreshtoken.includes(refreshToken))) return res.sendStatus(403)
    jwt.verify(refreshToken,process.env.ACCESS_REFRESH_TOKEN,(err,user)=>{
      console.log("the user in refreshToken is",user)
      user = {name:user.name}
      const accessToken = generateAccessToken(user)
      res.json({accessToken})
    })

})
app.delete('/logout',(req,res)=>{
  refreshtoken = []
})

function generateAccessToken(user)
{
  console.log(process.env.ACCESS_SECRET_TOKEN)
return jwt.sign(user,process.env.ACCESS_SECRET_TOKEN,{expiresIn:'30s'} )
}



app.listen(4000)
