import {
	mapGetters
} from 'vuex'

export default {
	methods: {
		setBadge() {
			uni.setTabBarBadge({
				index: 2,
				text: this.totalCart + ''
			})
		}
	},
	computed: {
		...mapGetters('cart', [
			'totalCart',
		])
	},
	onShow() {
		this.setBadge()
	}
}
