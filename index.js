const express= require('express');
const app=express()
const http=require('http').createServer(app)
const io=require('socket.io')(http)
const path=require('path')
const publicpath=path.join(__dirname,'/public')
const moment=require('moment')
const PORT=process.env.PORT||3000
app.use(express.static(publicpath))
app.get('/',(req,res)=>{

    res.render('index.html')
})
io.on('connection',(socket)=>{
    const date=new Date().getTime()
    const time=moment(date).format("h:mm a")
 
    socket.broadcast.emit('smsg',`[${time}] -  User has been connected`)
    socket.emit('smsg','Welcome!')

socket.on('disconnect',()=>{
    socket.broadcast.emit('smsg',`[${time}] -   user has been disconnected`)
})

socket.on('chatmessage',(msg,callback)=>{

socket.broadcast.emit('smsg',`[${time}]-  ${msg}`)
callback()

})


})

http.listen(PORT,()=>{

  
})