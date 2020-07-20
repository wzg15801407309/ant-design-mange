<template>
	<a-carousel
		:afterChange="onChange"
		:dots="false"
		:fade="true"
		:autoplay="true"
	>
		<div><img src="@/assets/img.png" alt="" /></div>
		<div><img src="@/assets/逍遥诀_icon_1024x1024_02_圆角.png" alt="" /></div>
		<div><img src="@/assets/img.png" alt="" /></div>
		<div><img src="@/assets/othermain/高手论坛入口图.jpg" alt="" /></div>
		<div><img src="@/assets/img.png" alt="" /></div>
		<div><img src="@/assets/othermain/三国入口图.jpg" alt="" /></div>
		<div><img src="@/assets/img.png" alt="" /></div>
	</a-carousel>
</template>
<script>
export default {
	methods: {
		onChange(e) {
			this.$emit('handleChange', e) 
		}
	}
}
</script>
<style lang="less" scoped>
/* For demo */
.ant-carousel /deep/ .slick-slide {
	text-align: center;
	height: 390px;
	background: #232021;
	overflow: hidden;
}

.ant-carousel /deep/.slick-slide img {
	height: 100%;
	width: 100%;
	object-fit: cover;
}
</style>
