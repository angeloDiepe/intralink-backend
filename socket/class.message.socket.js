module.exports=(server)=>{
	onlinesUsers = [];
	Messages=[];
	var io = require('socket.io')(server);

	io.sockets.on('connection', function(socket){
		// console.log('connected')
	socket.on("new user", function(data, callback){
		console.log("data",data)
	if(onlinesUsers.indexOf(data) != -1){
	callback(false);
	} else{
		
	socket.nickname = data;
	onlinesUsers.push(socket.nickname);
	io.sockets.emit('usernames', onlinesUsers);
	callback(true);
	updateOnlinesUsers();
	}
	});
	 
	function updateOnlinesUsers(){
	io.sockets.emit('usernames', onlinesUsers);
	}
	 
	socket.on('send message', function(data){
	Messages.push({msg:data,nick:socket.nickname})
	io.sockets.emit('new message', {msg: data, nick: socket.nickname});
	});
	socket.on('disconnect', function(data){
	if(!socket.nickname) return;
	onlinesUsers.splice(onlinesUsers.indexOf(socket.nickname), 1);
	updateOnlinesUsers();
	});
	});
		 // console.log(Messages)

	return io;

}