<template>
	<view>
		<view class="goods-list" v-if='goodsList.goods'>
			<my-goods 
			:goodsData="item" 
			@goodsClickHandler='goodsClickHandler'
			v-for="item in goodsList.goods"
			:key="item.goods_id"
			></my-goods>
		</view>
		<!-- 返回顶部按钮 -->
		<my-backTop :isShow='isShowBackTop' @backTopBtnClick='backTopHandler'></my-backTop>
	</view>
</template>

<script>
		import Throttle from '../../utils/hook-throttle.js'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				// 搜索信息
				queryInfo: {
					query: '',
					cid:'',
					pagesize: 20,
				},
				// 是否显示返回顶部按钮
				isShowBackTop: false
			};
		},
		computed: {
			...mapState({
				goodsList: state => state.goodsList,
			})
		},
		methods:{
			// 返回顶部
			backTopHandler() {
				uni.pageScrollTo({
					scrollTop: 0, // 滚动到页面的目标位置  这个是滚动到顶部, 0 
					duration: 300 // 滚动动画的时长
				})
			},
			// 点击单个商品触发
			goodsClickHandler(item) {
				uni.navigateTo({
					url: `/subPackages/goods-detail/goods-detail?goods_id=${item.goods_id}`
				})
			},
		},
		onLoad(options) {
			this.queryInfo.query = options.query || ''
			this.queryInfo.cid = options.cid || ''
			this.$store.dispatch('getGoodsList', this.queryInfo)
		},
		// 滚动监听
		onPageScroll(e) {
			// console.log('e:',e)
			if (e.scrollTop >= 250) {
				// 显示
				this.isShowBackTop = true
			} else {
				// 隐藏
				this.isShowBackTop = false
			}
		},
		// 触底触发
		onReachBottom: Throttle(function() {
			this.queryInfo.pagesize += 10
			this.$store.dispatch('getGoodsList', this.queryInfo)
		}, 1500),
	}
</script>

<style lang="less">

</style>
