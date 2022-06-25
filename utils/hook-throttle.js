export default function Throttle(fn,delay){
	let lastTime = 0
	return function(){
		const nowTime = new Date().getTime()
		// console.log(nowTime);
		if(nowTime - lastTime > delay){
			fn.call(this,...arguments)
			lastTime = nowTime
		}
	}
}