<template>
	<view class="cate">
		<!-- 顶部搜索区域 -->
		<my-search @searchClick='searchClickHandler'></my-search>
		<view class="main">
			<!-- 左侧导航区域 -->
			<scroll-view class="cate-nav" scroll-y="true" :style="{height:wh + 'px'}"
				v-if="cateData.length">
				<view :class="['cate-nav-item',index===currentIndex?'cate-nav-active':'']" v-for="item,index in cateData"
					:key="item.cat_id" @click="navClickHandler(index)">
					<view class="nav-text">{{item.cat_name}}</view>
				</view>
			</scroll-view>
			<!-- 右侧主体区域 -->
			<scroll-view class="cate-content" scroll-y="true" :style="{height:wh + 'px'}"
				v-if="cateData.length" :scroll-top='scrollTop'>
				<view class="cate-content-item" v-for="item,index in cateData[currentIndex].children" :key="item.cat_id">
					<block v-if="item.children">
						<view class="title">
							<view>{{item.cat_name}}</view>
						</view>
						<view class="goods-list">
							<navigator 
							class="goods-item" 
							v-for="item1,index1 in item.children" 
							:key="item1.cat_id" 
							:url='`/subPackages/goods-list/goods-list?query=${item1.cat_name}`'
							>
								<view class="goods-image">
									<image :src="item1.cat_icon.replace('api-ugo-dev','api-ugo-web')" mode="widthFix">
									</image>
								</view>
								<view class="goods-title">
									<view>
										{{item1.cat_name}}
									</view>
								</view>
							</navigator>
						</view>
					</block>
				</view>
			</scroll-view>
				
		</view>
	</view>
</template>

<script>
		import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState
	} from 'vuex'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				// 可用窗口高度
				wh: '',
				// 当前获得索引
				currentIndex: 0,
				// 设置竖向滚动条位置
				scrollTop: 0
			};
		},
		methods: {
			// 请求主页公共数据
			getPubilcData() {
				// 获取分类数据
				this.$store.dispatch('cate/getCateData');

			},
			navClickHandler(index) {
				this.currentIndex = index
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			searchClickHandler(){
				uni.navigateTo({
					url:'/subPackages/search/search'
				})
			}

		},
		computed: {
			...mapState({
				cateData: state => state.cate.cateData,
			})
		},
		onLoad() {
			this.getPubilcData()
			const sysInfo = uni.getSystemInfoSync()
			// 获取可用视口高度（要减去顶部搜索栏的高度）
			this.wh = sysInfo.windowHeight-60
		}
	};
</script>

<style lang="less">
	.main {
		display: flex;

		// 左侧导航栏
		.cate-nav {
			width: 25%;
			background-color: #f3f3f3;

			.cate-nav-item {
				padding: 20rpx 0;
				text-align: center;
				height: 60rpx;
				line-height: 60rpx;
				position: relative;
			}
		}

		// 右侧主体部分样式
		.cate-content {
			box-sizing: border-box;
			width: 75%;
			padding: 20rpx;
			background-color: #fafafa;

			.cate-content-item {
				background-color: #fff;
				margin-bottom: 20rpx;
				border-radius: 20rpx;
				.title {
					// padding-left: 20rpx;
					// padding-top: 20rpx;
					font-weight: 700;
					// margin: 10rpx 0;
					padding: 20rpx 40rpx;
				}

				.goods-list {
					display: flex;
					flex-wrap: wrap;
					// justify-content: space-around;
					text-align: center;
					.goods-item {
						box-sizing: border-box;
						width: 33%;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						padding: 10px;
						.goods-image {
							image {
								width: 80%;
							}
						}

						.goods-title {
							font-size: 24rpx
						}
					}
				}
			}
		}
	}

	// 左侧导航栏选中样式
	.cate-nav-active {
		position: relative;
		background-color: #fff;

		.nav-text::before {
			display: block;
			content: '';
			width: 3px;
			height: 70%;
			background-color: #c00000;
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			border-radius: 20rpx;
		}
	}
</style>
