<template>
	<view class="goods-detail" v-if="goodsDetail">
		<!-- 轮播图部分 -->
		<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500">
			<swiper-item v-for="item,index in goodsDetail.pics" :key="item.pics_id">
				<image :src="item.pics_big" mode="widthFix" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price" v-if="goodsDetail.goods_price">
				￥{{goodsDetail.goods_price}}
			</view>
			<!-- 信息主题区域 -->
			<view class="goods-info-body" v-if="goodsDetail.goods_name">
				<!-- 商品名称 -->
				<view class="goods-name">
					{{goodsDetail.goods_name}}
				</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">
				快递：免运费
			</view>
		</view>
		<!-- 商品详情信息 -->
		<rich-text :nodes="goodsDetail.goods_introduce"></rich-text>
		<!-- 返回顶部按钮 -->
		<my-backTop :isShow='isShowBackTop' @backTopBtnClick='backTopHandler'></my-backTop>
		<!-- 底部导航栏 -->
		<my-bottomNav :options='options' :buttonGroup='buttonGroup' @buttonClick='btnClickHandler' @click='iconClickHandler'></my-bottomNav>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				// 是否显示返回顶部按钮
				isShowBackTop: false,
				// 底部导航栏配置项
				options: [
					{
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				// 底部导航栏配置项
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		computed: {
			...mapState({
				goodsDetail: (state) => state.goodsDetail
			}),
			...mapGetters('cart',[
			      'totalCart',
			    ])
		},
		watch:{
			totalCart:{
				handler(newVal){
					const findResult = this.options.find(item => item.text === '购物车')
					findResult.info = newVal	
				},
				immediate:true
			}
		},
		methods: {
			...mapMutations('cart',['changeCartData']),
			preview(i) {
				uni.previewImage({
					current: i,
					urls: this.goodsDetail.pics.map(x => x.pics_big)
				})
			},
			// 返回顶部
			backTopHandler() {
				uni.pageScrollTo({
					scrollTop: 0, // 滚动到页面的目标位置  这个是滚动到顶部, 0 
					duration: 300 // 滚动动画的时长
				})
			},
			// 底部导航栏按钮点击
			btnClickHandler(e) {
				// console.log(e);
				if(e.content.text === '加入购物车'){
					const goods = {
						goods_id : this.goodsDetail.goods_id,
						goods_name : this.goodsDetail.goods_name,
						goods_price : this.goodsDetail.goods_price,
						goods_count : 1,
						goods_small_logo : this.goodsDetail.goods_small_logo,
						goods_state :true,
					}
					uni.showToast({
						title: '加入购物车成功',
						duration: 2000,
						success:true
					});
					this.changeCartData(goods)
				}
			},
			// 底部导航栏左侧图标点击
			iconClickHandler(e) {
				if(e.content.text === '购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			}
		},
		onLoad(options) {
			this.$store.dispatch('getGoodsDetail', {
				goods_id: options.goods_id
			})
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
	}
</script>

<style lang="less">
	.swiper {
		height: 750rpx;

		image {
			height: 100%;
			width: 100%;
		}
	}

	.goods-info-box {
		padding: 20rpx;

		.price {
			font-size: 40rpx;
			color: #c00000;

		}

		.goods-info-body {
			display: flex;
			align-items: center;

			.goods-name {
				font-size: 26rpx;
				margin-right: 20rpx;
				text-align: justify;
			}

			.favi {
				width: 240rpx;
				font-size: 24rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 2px solid #e6e6e6;
				color: gray;

			}
		}

		.yf {
			font-size: 24rpx;
			color: gray;
			margin: 10px 0;
		}
	}
</style>
