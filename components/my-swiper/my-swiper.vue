<template>
	<view >
		<swiper class="swiper" circular indicatorDots autoplay :interval='2000' :duration='500' indicatorActiveColor='#ffffff'>
			<swiper-item v-for="item in swiperData" :key='item.goods_id'>
				<navigator class="swiper-item uni-bg-red" :url='`/subPackages/goods-detail/goods-detail?goods_id=${item.goods_id}`'>
					<image :src="item.image_src" mode="widthFix">
				</navigator>
			</swiper-item>
		</swiper>
	</view>

</template>

<script>
	export default {
		name: "swiper",
		props: ['swiperData'],
		data() {
			return {
			};
		}
	}
</script>

<style lang="less">
	.swiper {
		height: 300rpx;
		image {
			width: 100%;
		}
	}
</style>
