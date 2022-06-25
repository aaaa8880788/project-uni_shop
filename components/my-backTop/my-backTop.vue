<template>
	<view class="backTop" @click="backClickHandle" v-if="isShow">
		<uni-icons  type="navigate" size="40"></uni-icons>
	</view>
</template>

<script>
	export default {
		name:"my-backTop",
		data() {
			return {
				
			};
		},
		props:{
			isShow:{
				type:Boolean,
				default:true
			}
		},
		methods:{
			backClickHandle(){
				this.$emit('backTopBtnClick')
			}
		}
	}
</script>

<style lang="less">
.backTop{
	position: fixed;
	top: 80%;
	right: 3%;
}
</style>