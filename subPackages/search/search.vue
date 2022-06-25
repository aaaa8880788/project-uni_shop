<template>
	<view>
		<!-- 搜索区域部分 -->
		<view class="search">
			<uni-search-bar class="uni-mt-10" radius="100" placeholder="请输入搜索内容" cancelButton="none" focus
				v-model="inputValue" @confirm='searchHandler' @clear="clear" />
		</view>
		<!-- 内容主题区域 -->
		<template v-if='searchData.goods'>
			<view class="goods-list" v-for="item in searchData.goods" :key="item.goods_id">
				<my-goods :goodsData="item" @goodsClickHandler='goodsClickHandler'></my-goods>
			</view>
		</template>	
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<view class="history-title">
				<view class="title-left">
					搜索历史
				</view>
				<view class="title-right" @click="clearHistory">
					<uni-icons type="trash-filled" size="20"></uni-icons>
				</view>
			</view>
			<view class="history-content">
				<view class="content-item" v-for="item in historyInfo" @click="historyClickHandler(item)">
					<span>{{item}}</span>
				</view>
			</view>
		</view>
		<!-- 返回顶部按钮 -->
		<my-backTop :isShow='isShowBackTop' @backTopBtnClick='backTopHandler'></my-backTop>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import Throttle from '../../utils/hook-throttle.js'
	export default {
		name: 'search',
		data() {
			return {
				inputValue: '',
				// 搜索信息
				queryInfo: {
					query: '',
					pagesize: 20,
				},
				// 历史记录信息
				historyInfo: [],
				// 是否显示返回顶部按钮
				isShowBackTop: false
			};
		},
		methods: {
			// 搜索触发
			async searchHandler(e) {
				this.queryInfo.query = e.value
				await this.$store.dispatch('getSearchData', this.queryInfo)
				// 保存搜索关键词
				if (e.value) {
					const set = new Set(this.historyInfo)
					set.delete(e.value)
					set.add(e.value)
					this.historyInfo = Array.from(set)
				}
				uni.setStorageSync('historyInfo', this.historyInfo)
			},
			// 清空商品数据，和输入框文字
			clear() {
				this.$store.commit('changeSearchData', [])
			},
			// 点击单个商品触发
			goodsClickHandler(item) {
				uni.navigateTo({
					url: `/subPackages/goods-detail/goods-detail?goods_id=${item.goods_id}`
				})
			},
			// 清空历史记录
			clearHistory() {
				this.historyInfo = []
				uni.removeStorageSync('historyInfo')
			},
			// 历史记录单个记录点击触发
			historyClickHandler(item) {
				this.queryInfo.query = item
				this.queryInfo = {...this.queryInfo,pagesize:20}
				this.inputValue = item
				this.$store.dispatch('getSearchData', this.queryInfo)
			},
			// 点击商品跳转详情
			goodsClickHandler(item){
				uni.navigateTo({
					url:`/subPackages/goods-detail/goods-detail?goods_id=${item.goods_id}`
				})
			},
			// 返回顶部
			backTopHandler() {
				uni.pageScrollTo({
					scrollTop: 0, // 滚动到页面的目标位置  这个是滚动到顶部, 0 
					duration: 300 // 滚动动画的时长
				})
			},
		},
		computed: {
			...mapState({
				searchData: state => state.searchData,
			})
		},
		// 触底触发
		onReachBottom: Throttle(function() {
			this.queryInfo.pagesize += 10
			this.$store.dispatch('getSearchData', this.queryInfo)
		}, 1500),
		// 生命周期加载成功触发
		onLoad() {
			const value = uni.getStorageSync('historyInfo')
			// console.log(value);
			if (value) {
				this.historyInfo = value
			}
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
		// 下拉刷新
		async onPullDownRefresh() {
			this.queryInfo = {
					query: '',
					pagesize: 20,
			},
			this.inputValue = ''
			await this.$store.dispatch('getSearchData', this.queryInfo)
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	}
</script>

<style lang="less">
	.search {
		background-color: #c00000;
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.goods-list {
		padding: 10rpx 20rpx;

	}

	.history-box {
		padding: 0 15rpx;

		.history-title {
			font-size: 26rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
			border-bottom: 1px solid #ccc;
		}

		.history-content {
			display: flex;
			flex-wrap: wrap;

			.content-item {
				box-sizing: border-box;
				margin-top: 10rpx;
				padding: 10rpx 30rpx;
				background-color: #f5f7f6;
				margin-right: 10rpx;
			}
		}
	}

	.nothing {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: center;
		align-items: center;

		.center {
			display: flex;
			flex-direction: column;
			align-items: center;

			.icon span {
				font-size: 200rpx
			}

			.title {
				margin-top: 20rpx;
			}
		}

	}
</style>
