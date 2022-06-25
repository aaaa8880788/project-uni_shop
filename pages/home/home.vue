<template>
	<view class="warpper">
		<!-- 顶部搜索区域 -->
		<my-search class='my-search' @searchClick='searchClickHandler' ></my-search>
		<!-- 轮播图部分 -->
		<my-swiper :swiperData='swiperData'></my-swiper>
		<!-- navbar部分 -->
		<view class="navbar">
			<view class="navbar-item" v-for="item in navbarData" :key="item.name" @click="navClickHandler(item)">
				<image :src="item.image_src" mode="widthFix">
			</view>
		</view>
		<!-- 主体部分 -->
		<view class="main">
			<view class="main-list" v-for="item,index in mainData" :key="index">
				<view class="title">
					<image :src="item.floor_title.image_src" mode="widthFix"></image>
				</view>
				<view class="content">
					<navigator class="content-left" :url='item.product_list[0].url'>
						<image 
						:src="item.product_list[0].image_src" 
						mode="widthFix" 
						:style="{width:`${item.product_list[0].image_width}rpx`}"></image>
					</navigator>
					<view class="content-right">
						<navigator 
						class="content-right-item" 
						v-for="item1,index1 in item.product_list" 
						:key="item1.name"
						:url='item1.url'
						>
							<image 
							v-if="index1 !== 0"
							:src="item1.image_src"
							mode="widthFix"
							:style="{width:`${item1.image_width}rpx`}"
							></image>
						</navigator>
					</view>
				</view>
			</view>
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
				scrollTop:0		//距离顶部高度
			};
		},
		methods: {
			// 请求主页公共数据
			getPubilcData() {
				// 获取轮播图数据
				this.$store.dispatch('home/getSwiperData')
				// 获取导航栏数据
				this.$store.dispatch('home/getNavbarData')
				// 获取主体部分数据
				this.$store.dispatch('home/getMainData')
			},
			// 导航栏点击触发函数
			navClickHandler(item){
				if(item.name === '分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			searchClickHandler(){
				uni.navigateTo({
					url:'/subPackages/search/search'
				})
			}
		},
		computed: {
			...mapState({
				swiperData: state => state.home.swiperData,
				navbarData: state => state.home.navbarData,
				mainData: state => state.home.mainData
			})
		},
		onLoad() {
			// 请求主页公共数据
			this.getPubilcData()
		},
	}
</script>

<style lang="less">
// 顶部搜索栏样式
.my-search{
	position: sticky;
	top: 0;
	z-index: 999;
}
// 导航栏样式
.navbar{
	display: flex;
	.navbar-item{
		width: 25%;
		padding: 20rpx;
		image{
			width: 100%;
		}
	}
}
// 主体部分样式
	.main-list{
		margin:20rpx 10rpx;
		.title{
			image{
				width: 100%;
			}
		}
		.content{
			display: flex;
			.content-right{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				.content-right-item{
					image{
						width: 100%	;
					}
				}
				
			}
		}
	}
</style>
