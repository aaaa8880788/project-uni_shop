export default function Debounce(fn,delay){
	let timer = null
	return function(){
		timer && clearTimeout(timer)
		timer = setTimeout(()=>{
			fn.call(this,...arguments)
		},delay)
	}
}