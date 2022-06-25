<template>
	<view class="my-address">
		<!-- 选择收获地址的盒子 -->
		<view class="address-choose-box" v-if="!Object.keys(address).length">
			<button type="warn" size="mini" @click="chooseAddress">添加收获地址+</button>
		</view>
		<!-- 渲染收货信息的盒子 -->
		<view class="address-info-box" v-else>
			<view class="row1">
				<view class="row1-left" >
					<view class="username textLineOne">
						收货人:<text>呆头鸭</text>
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话：<text>13631213333</text>
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2 textLineOne">
				收获地址:<text>仲恺</text>
			</view>
		</view>
		<!-- 底部的边框线 -->
		<image class="bottom-image" src="/static/cart_border@2x.png" ></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-address",
		data() {
			return {
				// 收获地址
				address:{}
			};
		},
		methods:{
			 async chooseAddress(){
				const [err,succ] = await uni.chooseAddress().catch(err=>err)
				if(err === null && succ.errMsg === 'chooseAddress:ok'){
					this.address = succ
				}
			}
		}
	}
</script>

<style lang="less">
	// 选择收获地址的盒子
.address-choose-box{
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
}
// 渲染收货信息的盒子
.address-info-box{
	box-sizing: border-box;
	padding: 20rpx;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	font-size: 24rpx;
	.row1{
		display: flex;
		.row1-left{
			width: 60%;
		}
		.row1-right{
			flex: 1;
			display: flex;
		}
	}
}
// 底部的边框线
.bottom-image{
	display: block;
	width: 100%;
	height: 5px;
}

</style>