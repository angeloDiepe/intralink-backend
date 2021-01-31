module.exports=(server)=>{
	onlinesUsers = [];
	Messages=[];
	Messages_GI=[];
	Messages_GRT=[];
	const io=require('socket.io')(server,{
	 cors: {
    origin: '*',
    methods: 'GET,PUT,POST,DELETE,OPTIONS'.split(','),
    credentials: true
     }
	})
	io.on('connection',(socket)=>{
		socket.emit('init',Messages);
		socket.on('message',(message)=>{
			console.log(message)
			Messages.push(message)
			socket.broadcast.emit('push',message)
		})
		//group socket
		socket.on('name-group',data=>{
			console.log(data)
			switch(data.Name){
				case "GI Official":
				socket.emit('init-group',Messages_GI);
				console.log(Messages_GI)
				break;
				case "GRT Official":
				socket.emit('init-group',Messages_GRT);
					console.log(Messages_GRT)
				break;
			}	
		})
		// socket.emit('init-group',Messages);
		socket.on('message-group',(message)=>{
			console.log(message.Group.Name)
			switch(message.Group.Name){
				case "GI Official":
				Messages_GI.push(message)
				break;
				case "GRT Official":
				Messages_GRT.push(message)
				break;
			}
			// Messages.push(message)
			socket.broadcast.emit('push-group',message)
		})
	})

	return io;

}