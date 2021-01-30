reverse=(string)=>{
	let str=''
 	for (var i = 0; i < string.length; i++) {
 		str=str+string[string.length-1-i]
 	}
 	console.log(str)
}
const srting="salut les bezzoss"
reverse(srting)
mergeSortedArrays=(array1,array2)=>{
	const length=array1.length+array2.length
	let array=[]
	for (var i = 0; i <length; i++) {
		if(array1.length<array2.length)
		{
			array.push(array1[i])
			
		}else{
			array.push(array2[i])
		}
	}
	console.log(array)
}
mergeSortedArrays([1,12,5,4,6],[5,4,6,8,7,9])