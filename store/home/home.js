// 导入网络请求
import http from '../../request/request.js'

const homeModule = {
	namespaced: true,
	state() {
		return {
			swiperData: [],
			navbarData: [],
			mainData: []
		}
	},
	mutations: {
		changeSwiperData(state, payload) {
			state.swiperData = payload
		},
		changeNavbarData(state, payload) {
			state.navbarData = payload
		},
		changeMainData(state, payload) {
			state.mainData = payload
		},
	},
	actions: {
		// 轮播图数据
		async getSwiperData({
			commit
		}) {
			const {
				data: res
			} = await http.get('/api/public/v1/home/swiperdata')
			if (res.meta.status !== 200) return uni.$showToast('数据加载失败！', 'error')
			uni.$showToast()
			const swiperData = res.message
			commit('changeSwiperData', swiperData)
		},
		// 导航栏数据
		async getNavbarData({
			commit
		}) {
			const {
				data: res
			} = await http.get('/api/public/v1/home/catitems')
			if (res.meta.status !== 200) return uni.$showToast('数据加载失败！', 'error')
			uni.$showToast()
			const navbarData = res.message
			commit('changeNavbarData', navbarData)
		},
		// 主体区域数据
		async getMainData({
			commit
		}) {
			const {
				data: res
			} = await http.get('/api/public/v1/home/floordata')
			if (res.meta.status !== 200) return uni.$showToast('数据加载失败！', 'error')
			uni.$showToast()
			
			// 给每个数据赋予一个url便于跳转
			res.message.forEach(item=>{
				item.product_list.forEach(item1=>{
					item1.url = `/subPackages/goods-list/goods-list?${item1.navigator_url.split('?')[1]}`
				})
			})
			
			const mainData = res.message
			commit('changeMainData', mainData)
		}
	},
}

export default homeModule
