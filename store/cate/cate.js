// 导入网络请求
import http from '../../request/request.js'

const cateModule = {
	namespaced: true,
	state() {
		return {
			cateData: [],
		}
	},
	mutations: {
		changeCateData(state, payload) {
			state.cateData = payload
		},
	},
	actions: {
		// 轮播图数据
		async getCateData({
			commit
		}) {
			const {
				data: res
			} = await http.get('/api/public/v1/categories')
			if (res.meta.status !== 200) return uni.$showToast('数据加载失败！', 'error')
			uni.$showToast()
			const cateData = res.message
			commit('changeCateData', cateData)
		},
	}
}
export default cateModule
