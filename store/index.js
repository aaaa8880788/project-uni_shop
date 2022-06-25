import Vue from 'vue'
import Vuex from 'vuex'
import home from './home/home'
import cate from './cate/cate'
import cart from './cart/cart'
// 导入网络请求
import http from './../request/request.js'

Vue.use(Vuex);


const store = new Vuex.Store({
	state() {
		return {
			searchData: [],
			goodsList: [],
			goodsDetail: []
		}
	},
	mutations: {
		changeSearchData(state, payload) {
			state.searchData = payload
		},
		changeGoodsList(state, payload) {
			state.goodsList = payload
		},
		changeGoodsDetail(state, payload) {
			state.goodsDetail = payload
		},
	},
	actions: {
		// 商品搜索列表数据
		async getSearchData({
			commit
		}, payload) {
			const {
				data: res
			} = await http.get('/api/public/v1/goods/search', payload)
			if (res.meta.status !== 200) return uni.$showToast('数据加载失败！', 'error')
			uni.$showToast()
			const searchData = res.message
			commit('changeSearchData', searchData)
		},
		// 商品列表数据
		async getGoodsList({
			commit
		}, payload) {
			const {
				data: res
			} = await http.get('/api/public/v1/goods/search', payload)
			if (res.meta.status !== 200) return uni.$showToast('数据加载失败！', 'error')
			uni.$showToast()
			const goodsList = res.message
			// console.log(res.message);
			commit('changeGoodsList', goodsList)
		},
		// 商品详情数据
		async getGoodsDetail({
			commit
		}, payload) {
			const {
				data: res
			} = await http.get('/api/public/v1/goods/detail', payload)
			if (res.meta.status !== 200) return uni.$showToast('数据加载失败！', 'error')
			uni.$showToast()
			const goodsDetail = res.message
			// 对goods_introduce数据处理
			res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
				'<img style="display:block;"').replace(/webp/g,'jpg')
			console.log(res.message);
			commit('changeGoodsDetail', goodsDetail)
		}
	},
	getters: {},
	modules: {
		home,
		cate,
		cart
	}
})

export default store
