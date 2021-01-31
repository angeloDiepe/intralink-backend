module.exports=(server)=>{
	onlinesUsers = [];
	Messages=[];
	const io=require('socket.io')(server,{
	 cors: {
    origin: '*',
    methods: 'GET,PUT,POST,DELETE,OPTIONS'.split(','),
    credentials: true
     }
	})
	io.on('connection',(socket)=>{
		console.log('connected')
		socket.emit('init-group',Messages);
		socket.on('message-group',(message)=>{
			console.log(message)
			Messages.push(message)
			socket.broadcast.emit('push-group',message)
		})
	})

	return io;

}