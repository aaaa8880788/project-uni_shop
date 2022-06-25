<template>
	<view class="bottom-nav">
		<view class="nav-left">
			<view class="item" v-for="item,index in options" :key='index' @click="onClick(index,item)">
				<view>
					<uni-icons class="item-icon" color="#8f8f8f" :type="item.icon" size="30"></uni-icons>
				</view>
				<view>{{item.text}}</view>
				<view class="dot-box" v-if="item.info">
					<text class="dot"
						:style="{'backgroundColor':item.infoBackgroundColor?item.infoBackgroundColor:'#ff0000',color:item.infoColor?item.infoColor:'#fff'}">{{item.info}}</text>
				</view>
			</view>
		</view>
		<view class="nav-right">
			<view class="item" v-for="item,index in buttonGroup" :key="index" :style="{
				'backgroundColor':item.backgroundColor,
				'color':item.color
			}" @click="buttonClick(index,item)">
				<text>{{item.text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-bottomNav",
		props: {
			options: {
				type: Array,
				default () {
					return [{
						icon: 'shop',
						text: '店铺'
					}, {
						icon: 'cart',
						text: '购物车',
					}]
				}
			},
			buttonGroup: {
				type: Array,
				default () {
					return [{
							text: '加入购物车',
							backgroundColor: "#ff0000",
							color: '#fff'
						},
						{
							text: '立即购买',
							backgroundColor: "#ffa200",
							color: '#fff'
						}
					]
				}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			buttonClick(index, item) {
				this.$emit('buttonClick', {
					index,
					content: item
				})
			},
			onClick(index, item) {
				this.$emit('click', {
					index,
					content: item,
				})
			},
		}
	}
</script>

<style lang="less">
	.bottom-nav {
		box-sizing: border-box;
		height: 120rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #ccc;
		border-top: 1px solid #ccc;
		background-color: #fff;

		.nav-left {
			display: flex;
			align-items: center;

			.item {
				position: relative;
				width: 120rpx;
				text-align: center;
				font-size: 26rpx;
				color: #8f8f8f;

				.dot-box {
					position: absolute;
					top: 0;
					right: 0;
					display: flex;
					justify-content: center;
					align-items: center;

					.dot {
						padding: 0 8rpx;
						// color: #fff;
						// font-size: 24rpx;
						// background-color: #ff0000;
						border-radius: 30rpx;
					}
				}
			}
		}

		.nav-right {
			height: 70%;
			margin: 10rpx;
			display: flex;
			flex: 1;

			.item {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #eeeeee;
				font-size: 28rpx
			}

			.item:nth-child(1) {
				// background-color: #ff0000;
				border-radius: 60rpx 0 0 60rpx;
			}

			.item:nth-child(2) {
				// background-color: #ffa200;
				border-radius: 0 60rpx 60rpx 0;
			}
		}
	}
</style>
