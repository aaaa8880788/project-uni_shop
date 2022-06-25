<template>
		<view>
			<view class="goods-item" @click="goodsClickHandler(goodsData)">
				<!-- 商品左侧图片区域 -->
				<view class="goods-item-left">
					<radio :checked="goodsData.goods_state" color='#c00000' v-if="showRadio" @click="goodsSelectedHandler(goodsData)" /></label>
					<image :src="goodsData.goods_small_logo || defaultImage" mode="widthFix"></image>
				</view>
				<!-- 商品右侧信息区域 -->
				<view class="goods-item-right">
					<!-- 商品标题 -->
					<view class="goods-name">
						{{goodsData.goods_name}}
					</view>
					<view class="goods-info-box">
						<!-- 商品价格 -->
						<view class="goods-price">
							￥{{goodsData.goods_price.toFixed(2)}}
						</view>
						<uni-number-box 
						:min="1" 
						:max="99" 
						:value="goodsData.goods_count" 
						v-if="showCount"
						@change="countChange"
						 />
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			goodsData:{
				type:Object,
				default:()=> {}
			},
			showRadio:{
				type:Boolean,
				default:false
			},
			showCount:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				// 默认图片地址
				defaultImage: 'https://fastly.jsdelivr.net/gh/aaaa8880788/duck-img/blog/202205091959256.jpg',
			};
		},
		methods:{
			goodsClickHandler(item){
				this.$emit('goodsClickHandler',item)
			},
			// 商品单选按钮触发
			goodsSelectedHandler(goods){
				this.$emit('goodsSelected',{
					goods_state:!goods.goods_state,
					goods_id:goods.goods_id
				})
			},
			// 商品数量改变
			countChange(val){
				this.goodsData.goods_count = val
				this.$emit('countChange',this.goodsData)
			}
		}
	}
</script>

<style lang="less">
.goods-item {
			display: flex;
			padding: 20rpx 10rpx;
			border-bottom: 1px solid #f0f0f0;

			.goods-item-left {
				display: flex;
				align-items: center;
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
				}
			}

			.goods-item-right {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.goods-name {
					font-size: 26rpx
				}

				.goods-info-box {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.goods-price {
						color: #c00000;
						font-size: 36rpx;
					}
				}
			}
		}
	
</style>