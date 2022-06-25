<template>
	<view class='cart'>
		<!-- 收获地址区域 -->
		<my-address></my-address>
		<!-- 商品列表标题区域 -->
		<view class="cart-title">
			<!-- 左侧的图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧文本 -->
			<text class="cart-title-text">购物车</text>
		</view>
		<!-- 商品列表区域 -->
		<uni-swipe-action ref="swipeAction" v-if="cartData">
			<view class="goods-list" v-for="item in cartData" :key="item.goods_id">
				<uni-swipe-action-item :right-options="options" @click='deleteClickHandler(item)'>
					<my-goods :goodsData='item' :showCount='true' :showRadio='true' @goodsSelected='radioHandler'
						@countChange='countChangeHandler'></my-goods>
				</uni-swipe-action-item>
			</view>
		</uni-swipe-action>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import Throttle from '@/utils/hook-throttle.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				// 左滑出现的删除按钮配置
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#F56C6C'
					}
				}],
			}
		},
		methods: {
			...mapMutations('cart', ['updateCartDataSelectedOne', 'updateCartGoodsCount', 'deleteCartGoodsOne']),
			radioHandler(item) {
				console.log(item);
				this.updateCartDataSelectedOne(item)
			},
			countChangeHandler(item) {
				this.updateCartGoodsCount(item)
			},
		 deleteClickHandler: Throttle(function(goods) {
				uni.showModal({
					title: '提示',
					content: '是否删除',
					success: res => {
						if (res.confirm) {
							console.log('用户点击了删除');
							this.deleteCartGoodsOne(goods)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}, 500)
		},
		computed: {
			...mapState('cart', ['cartData'])
		},
	}
</script>

<style lang="less" scoped>
	.cart-title {
		height: 80rpx;
		display: flex;
		align-items: center;
		padding-left: 10rpx;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			font-size: 28rpx;
			margin-left: 20rpx;
		}
	}
</style>
