const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const server=require('http').Server(app);
const io=require('socket.io').listen(server)
require('dotenv').config();
const dbConnect = require('./db.connect');
const User=require('./routes/User.route.js')
const Class=require('./routes/Class.route.js')
const Article=require('./routes/Article.route.js')
// const client_socket=require('./socket/inbox.message.socket.js')(server)
// const class_socket=require('./socket/class.message.socket.js')(server)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(cors());
app.use(bodyParser.json({linmit:"50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}))

app.use('/',User);
app.use('/Class',Class);
app.use('/Articles',Article);
app.get('/',(req,res)=>{
  console.log('hello guys');
  res.json({message:'hello guys'})
})
const port =process.env.PORT;

io.sockets.on('connection',(socket)=>{
	// console.log('connected')
	socket.on("message",(data)=>console.log(data))
})

server.listen(port,console.log(`server is running on port ${port}`))

