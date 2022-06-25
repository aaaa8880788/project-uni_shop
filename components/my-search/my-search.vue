<template>
	<view class="my-search" :style="{backgroundColor:outBgcColor}" @click="searchClickHandler">
		<view class="search" :style="{backgroundColor:inBgcColor}">
			<view class="search-content">
				<view class="left-icon">
					<uni-icons type="search" size="30"></uni-icons>
				</view>
				<view class="right-title">
					搜索
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props:{
			outBgcColor:{
				type:String,
				default:'#c00000'
			},
			inBgcColor:{
				type:String,
				default:'#fff'
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			searchClickHandler(){
				this.$emit('searchClick')
			}
		}
	}
</script>

<style lang="less">
.my-search{
	box-sizing: border-box;
	height: 120rpx;
	padding: 20rpx;
	.search{
		height: 100%;
		border-radius: 50rpx;
		.search-content{
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>