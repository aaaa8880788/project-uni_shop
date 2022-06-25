
const cartModule = {
	namespaced: true,
	state() {
		return {
			cartData: uni.getStorageSync('cartData') || [],
		}
	},
	mutations: {
		// 加入购物车操作
		changeCartData(state, payload) {
			// console.log(payload);
			const goodsInfo = payload
			const findResult = state.cartData.find(item=>item.goods_id === goodsInfo.goods_id)
			if(!findResult){
				state.cartData.push(goodsInfo)
			}else{
				findResult.goods_count += 1
			}
			uni.setStorageSync("cartData",state.cartData)
		},
		// 购物车商品更新单选状态操作
		updateCartDataSelectedOne(state,payload){
			const goodsInfo = payload
			let findResult = state.cartData.find(item=>item.goods_id === goodsInfo.goods_id)
			if(findResult){
				findResult.goods_state = goodsInfo.goods_state
				uni.setStorageSync("cartData",state.cartData)
			}
		},
		// 购物车单个商品更新商品数量操作
		updateCartGoodsCount(state,payload){
			const goodsInfo = payload
			let findResult = state.cartData.find(item=>item.goods_id === goodsInfo.goods_id)
			if(findResult){
				findResult.goods_count = goodsInfo.goods_count
				uni.setStorageSync("cartData",state.cartData)
			}
		},
		// 购物车删除单个商品操作
		deleteCartGoodsOne(state,payload){
			const goodsInfo = payload
			state.cartData = state.cartData.filter(item => item.goods_id !== goodsInfo.goods_id)
			uni.setStorageSync("cartData",state.cartData)
		}
	},
	getters:{
		totalCart(state){
			return state.cartData.length
		}
	}
}
export default cartModule
